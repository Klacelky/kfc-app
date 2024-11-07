import {
    Goal,
    Group,
    Match,
    MatchGame,
    MatchTeam,
    MatchTeamType,
    Player,
    PlayerPosition,
    PlayerPositions,
    Team,
    TeamSource,
} from '@prisma/client';

import { nofityHideScore, notifyScore } from './notify';

import {
    MatchQueryDto,
    MatchDetailedGetDto,
    GameScore,
    MatchCreateDto,
    MatchUpdateDto,
    GoalCreateDto,
    MatchGameCreateDto,
    MatchGameUpdateDto,
    PlayerPositionsCreateDto,
    MatchItemCreatedDto,
    TeamSourceGetDto,
    MatchFinishDto,
} from '@/dtos/match';
import { BadRequestError } from '@/utils/server/common';
import prisma from '@/utils/server/db';

type TeamWithPlayers = Team & {
    players: Player[];
};

type MatchTeamWithPlayers = MatchTeam & {
    team: TeamWithPlayers;
};

type GameWithDetails = MatchGame & {
    playerPositions: (PlayerPositions & {
        players: (PlayerPosition & {
            player: Player;
        })[];
    })[];
    goals: (Goal & {
        team: TeamWithPlayers;
        player: Player | null;
    })[];
};

type MatchWithDetails = Match & {
    teams: MatchTeamWithPlayers[];
    games: GameWithDetails[];
    teamSources: (TeamSource & {
        sourceGroup: Group | null;
        sourceMatch: Match | null;
    })[];
};

function countGameScore(homeTeam: Team | null, visitingTeam: Team | null, goals: Goal[]): GameScore {
    return goals
        .sort(({ timestamp: ta }, { timestamp: tb }) => ta.getTime() - tb.getTime())
        .reduce(
            (
                {
                    home: { score: homeScore, out: homeOut },
                    visiting: { score: visitingScore, out: visitingOut },
                }: GameScore,
                { own, out, teamId }: Goal,
            ): GameScore => {
                let homeGoal = teamId === homeTeam?.id ? 1 : 0;
                let visitingGoal = teamId === visitingTeam?.id ? 1 : 0;
                if (own) {
                    [homeGoal, visitingGoal] = [visitingGoal, homeGoal];
                }
                if (out) {
                    return {
                        home: { score: homeScore, out: homeOut + homeGoal },
                        visiting: { score: visitingScore, out: visitingOut + visitingGoal },
                    };
                }
                return {
                    home: { score: homeScore + homeGoal - visitingOut, out: 0 },
                    visiting: { score: visitingScore + visitingGoal - homeOut, out: 0 },
                };
            },
            { home: { score: 0, out: 0 }, visiting: { score: 0, out: 0 } },
        );
}

function findTeamType<T extends { type: MatchTeamType }>(teams: T[], targetType: MatchTeamType): T | null {
    return teams.find(({ type }) => type === targetType) || null;
}

function getWinner(
    homeTeam: TeamWithPlayers | null,
    visitingTeam: TeamWithPlayers | null,
    score: [number, number],
    playoffLayer: number | null,
): TeamWithPlayers | null {
    const req = playoffLayer === null ? 2 : 3;
    if (score[0] >= req) {
        return homeTeam;
    }
    if (score[1] >= req) {
        return visitingTeam;
    }
    return null;
}

function expandMatchDetails({
    teams,
    games,
    teamSources,
    playoffLayer,
    ...matchRest
}: MatchWithDetails): MatchDetailedGetDto {
    const homeTeam = findTeamType(teams, MatchTeamType.HOME)?.team || null;
    const visitingTeam = findTeamType(teams, MatchTeamType.VISITING)?.team || null;

    const scoredGames = games.map(({ playerPositions, goals, ...gameRest }) => ({
        ...gameRest,
        playerPositions: playerPositions.map(({ players, ...playerPositionsRest }) => ({
            ...playerPositionsRest,
            players: players.map(({ type, player }) => ({ ...player, type })),
        })),
        goals: goals,
        score: countGameScore(homeTeam, visitingTeam, goals),
    }));

    const mappedTeamSources: { type: MatchTeamType; data: TeamSourceGetDto | null }[] = teamSources.map(
        ({ standing, sourceGroup, winner, sourceMatch, type }) => ({
            type,
            data:
                sourceGroup !== null && standing !== null
                    ? { type: 'group' as 'group', sourceGroup, standing }
                    : sourceMatch !== null && winner !== null
                      ? { type: 'match' as 'match', winner, sourceMatch }
                      : null,
        }),
    );

    const finalScore = scoredGames
        .filter(({ finishedAt }) => finishedAt !== null)
        .reduce(
            (
                [homeScore, visitingScore]: [number, number],
                {
                    score: {
                        home: { score: homeGameScore },
                        visiting: { score: visitingGameScore },
                    },
                },
            ): [number, number] => [
                homeScore + (homeGameScore > visitingGameScore ? 1 : 0),
                visitingScore + (homeGameScore < visitingGameScore ? 1 : 0),
            ],
            [0, 0],
        );

    return {
        ...matchRest,
        playoffLayer,
        home: {
            team: homeTeam,
            source: findTeamType(mappedTeamSources, MatchTeamType.HOME)?.data || null,
        },
        visiting: {
            team: visitingTeam,
            source: findTeamType(mappedTeamSources, MatchTeamType.VISITING)?.data || null,
        },
        games: scoredGames,
        score: finalScore,
        winner: getWinner(homeTeam, visitingTeam, finalScore, playoffLayer),
    };
}

const include = {
    teams: {
        include: {
            team: {
                include: {
                    players: true,
                },
            },
        },
    },
    games: {
        include: {
            playerPositions: {
                include: {
                    players: {
                        include: {
                            player: true,
                        },
                    },
                },
                orderBy: {
                    timestamp: 'asc' as const,
                },
            },
            goals: {
                include: {
                    team: {
                        include: {
                            players: true,
                        },
                    },
                    player: true,
                },
                orderBy: {
                    timestamp: 'asc' as const,
                },
            },
        },
        orderBy: {
            startedAt: 'asc' as const,
        },
    },
    teamSources: {
        include: {
            sourceGroup: true,
            sourceMatch: true,
        },
    },
};

export async function listMatches(
    tournamentId: string,
    { groupId, teamId, playoff }: MatchQueryDto,
): Promise<MatchDetailedGetDto[]> {
    return (
        await prisma.match.findMany({
            where: {
                AND: [
                    { tournamentId },
                    groupId ? { teams: { every: { team: { group: { groupId } } } }, playoffLayer: null } : {},
                    teamId ? { teams: { some: { teamId } } } : {},
                    playoff === true ? { playoffLayer: { not: null } } : {},
                    playoff === false ? { playoffLayer: null } : {},
                ],
            },
            include,
            orderBy: { createdAt: 'asc' },
        })
    ).map(expandMatchDetails);
}

export async function getMatch(id: string): Promise<MatchDetailedGetDto> {
    return expandMatchDetails(await prisma.match.findUniqueOrThrow({ where: { id }, include }));
}

function makeTeamsArray<T>(
    home: T | null | undefined,
    visiting: T | null | undefined,
): { type: MatchTeamType; value: T }[] {
    return [
        ...(home ? [{ type: MatchTeamType.HOME, value: home }] : []),
        ...(visiting ? [{ type: MatchTeamType.VISITING, value: visiting }] : []),
    ];
}

function makeNullTeamsArray<T>(
    home: T | null | undefined,
    visiting: T | null | undefined,
    existing: MatchTeamType[],
): MatchTeamType[] {
    return [
        ...(home === null ? [MatchTeamType.HOME] : []),
        ...(visiting === null ? [MatchTeamType.VISITING] : []),
    ].filter((type) => existing.indexOf(type) !== -1);
}

export async function createMatch(
    tournamentId: string,
    { home, visiting, ...data }: MatchCreateDto,
): Promise<MatchDetailedGetDto> {
    return expandMatchDetails(
        await prisma.match.create({
            data: {
                ...data,
                tournamentId,
                teams: {
                    create: makeTeamsArray(home?.teamId, visiting?.teamId).map(({ type, value: teamId }) => ({
                        type,
                        teamId,
                    })),
                },
                teamSources: {
                    create: makeTeamsArray(home?.source, visiting?.source)
                        .filter(({ value: { type } }) => type)
                        .map(({ type, value: { type: _, ...source } }) => ({
                            type,
                            ...source,
                        })),
                },
            },
            include,
        }),
    );
}

export async function updateMatch(
    id: string,
    { home, visiting, ...data }: MatchUpdateDto,
): Promise<MatchDetailedGetDto> {
    return expandMatchDetails(
        await prisma.$transaction(async (tx) => {
            const { teams, teamSources } = await tx.match.findUniqueOrThrow({
                where: { id },
                include: { teamSources: true, teams: true },
            });
            return await prisma.match.update({
                where: { id },
                data: {
                    ...data,
                    teams: {
                        upsert: makeTeamsArray(home?.teamId, visiting?.teamId).map(({ type, value: teamId }) => ({
                            create: { type, teamId },
                            where: { type_matchId: { type, matchId: id } },
                            update: { teamId },
                        })),
                        delete: makeNullTeamsArray(
                            home?.teamId,
                            visiting?.teamId,
                            teams.map(({ type }) => type),
                        ).map((type) => ({
                            type_matchId: { type, matchId: id },
                        })),
                    },
                    teamSources: {
                        upsert: makeTeamsArray(home?.source, visiting?.source)
                            .filter(({ value: { type } }) => type)
                            .map(({ type, value: { type: _, ...source } }) => ({
                                create: { type, ...source },
                                where: { matchId_type: { type, matchId: id } },
                                update: { ...source },
                            })),
                        delete: makeNullTeamsArray(
                            home?.source?.type,
                            visiting?.source?.type,
                            teamSources.map(({ type }) => type),
                        ).map((type) => ({
                            matchId_type: { type, matchId: id },
                        })),
                    },
                },
                include,
            });
        }),
    );
}

export async function finishMatch(
    id: string,
    { updateSuccessiveMatches }: MatchFinishDto,
): Promise<MatchDetailedGetDto> {
    await nofityHideScore();
    return await prisma.$transaction(async (tx) => {
        const match = await tx.match.findUniqueOrThrow({
            where: { id },
            include: { ...include, successiveMatches: updateSuccessiveMatches },
        });
        const matchDetails = expandMatchDetails(match);
        if (!matchDetails.winner || !matchDetails.home.team || !matchDetails.visiting.team) {
            throw new BadRequestError('Cannot declare winner');
        }
        const winnerId: string =
            matchDetails.home.team.id === matchDetails.winner.id
                ? matchDetails.home.team.id
                : matchDetails.visiting.team.id;
        const looserId =
            matchDetails.home.team.id !== matchDetails.winner.id
                ? matchDetails.home.team.id
                : matchDetails.visiting.team.id;
        await Promise.all(
            match.successiveMatches.map(({ matchId: successiveMatchId, type: successiveTeamType, winner }) =>
                tx.match.update({
                    where: { id: successiveMatchId },
                    data: {
                        teams: {
                            upsert: {
                                create: { type: successiveTeamType, teamId: winner ? winnerId : looserId },
                                where: { type_matchId: { type: successiveTeamType, matchId: successiveMatchId } },
                                update: { teamId: winner ? winnerId : looserId },
                            },
                        },
                    },
                }),
            ),
        );
        return matchDetails;
    });
}

async function notify(matchId: string) {
    try {
        const match = await getMatch(matchId);
        if (match.winner) {
            return;
        }
        await notifyScore({
            home_team: match.home.team?.abbrev || '',
            home_team_name: match.home.team?.name || '',
            home_team_player_names: match.home.team?.players.map(({ name }) => name) || [],
            visiting_team: match.visiting.team?.abbrev || '',
            visiting_team_name: match.visiting.team?.name || '',
            visiting_team_player_names: match.visiting.team?.players.map(({ name }) => name) || [],
            home_score: match.games.slice(-1)[0]?.score.home.score,
            visiting_score: match.games.slice(-1)[0]?.score.visiting.score,
            home_games: match.score[0],
            visiting_games: match.score[1],
            home_team_color: match.games.slice(-1)[0]?.homeTeamColor,
            msg_type: 'score',
        });
    } catch (error) {}
}

export async function deleteMatch(id: string): Promise<void> {
    await prisma.match.delete({ where: { id } });
}

export async function createGame(matchId: string, data: MatchGameCreateDto): Promise<MatchItemCreatedDto> {
    const result = await prisma.matchGame.create({
        data: {
            ...data,
            matchId,
        },
    });
    await notify(matchId);
    return result;
}

export async function updateGame(gameId: string, data: MatchGameUpdateDto): Promise<MatchItemCreatedDto> {
    const result = await prisma.matchGame.update({
        where: { id: gameId },
        data,
    });
    await notify(result.matchId);
    return result;
}

export async function deleteGame(matchId: string, gameId: string): Promise<void> {
    await prisma.matchGame.delete({
        where: { id: gameId },
    });
    await notify(matchId);
}

export async function createGoal(matchId: string, gameId: string, data: GoalCreateDto): Promise<MatchItemCreatedDto> {
    const result = await prisma.goal.create({
        data: {
            ...data,
            gameId,
        },
    });
    await notify(matchId);
    return result;
}

export async function deleteGoal(matchId: string, goalId: string): Promise<void> {
    await prisma.goal.delete({
        where: { id: goalId },
    });
    await notify(matchId);
}

export async function createPlayerPositions(
    gameId: string,
    { players, ...data }: PlayerPositionsCreateDto,
): Promise<MatchItemCreatedDto> {
    return prisma.playerPositions.create({
        data: {
            ...data,
            players: {
                create: players,
            },
            gameId,
        },
    });
}

export async function deletePlayerPositions(playerPositionsId: string): Promise<void> {
    await prisma.playerPositions.delete({
        where: { id: playerPositionsId },
    });
}
