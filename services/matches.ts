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
} from '@/dtos/match';
import prisma from '@/utils/server/db';
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

type GameWithDetails = MatchGame & {
    playerPositions: (PlayerPositions & {
        players: (PlayerPosition & {
            player: Player;
        })[];
    })[];
    goals: (Goal & {
        player: Player;
    })[];
};

type TeamWithPlayers = Team & {
    players: Player[];
};

type MatchTeamWithPlayers = MatchTeam & {
    team: TeamWithPlayers;
};

type MatchWithDetails = Match & {
    teams: MatchTeamWithPlayers[];
    games: GameWithDetails[];
    teamSources: (TeamSource & {
        sourceGroup: Group | null;
        sourceMatch: Match | null;
    })[];
};

function countGameScore(
    homeTeam: TeamWithPlayers | null,
    visitingTeam: TeamWithPlayers | null,
    goals: Goal[],
): GameScore {
    const homePlayerIds = homeTeam?.players.map(({ id }) => id) || [];
    const visitingPlayerIds = visitingTeam?.players.map(({ id }) => id) || [];
    return goals
        .sort(({ timestamp: ta }, { timestamp: tb }) => ta.getTime() - tb.getTime())
        .reduce(
            (
                [[homeScore, homeOut], [visitingScore, visitingOut]]: GameScore,
                { own, out, playerId }: Goal,
            ): GameScore => {
                let homeGoal = homePlayerIds.indexOf(playerId) != -1 ? 1 : 0;
                let visitingGoal = visitingPlayerIds.indexOf(playerId) != -1 ? 1 : 0;
                if (own) {
                    [homeGoal, visitingGoal] = [visitingGoal, homeGoal];
                }
                if (out) {
                    return [
                        [homeScore, homeOut + homeGoal],
                        [visitingScore, visitingOut + visitingGoal],
                    ];
                }
                return [
                    [homeScore + homeGoal - visitingOut, 0],
                    [visitingScore + visitingGoal - homeOut, 0],
                ];
            },
            [
                [0, 0],
                [0, 0],
            ],
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

    const scoredGames = games
        .sort(({ startedAt: sa }, { startedAt: sb }) => sa.getTime() - sb.getTime())
        .map(({ playerPositions, goals, ...gameRest }) => ({
            ...gameRest,
            playerPositions: playerPositions.map(({ players, ...playerPositionsRest }) => ({
                ...playerPositionsRest,
                players: players.map(({ type, player }) => ({ ...player, type })),
            })),
            goals: goals,
            score: countGameScore(homeTeam, visitingTeam, goals),
        }));

    const mappedTeamSources = teamSources.map(({ standing, sourceGroup, winner, sourceMatch, ...rest }) => ({
        ...rest,
        group: sourceGroup !== null && standing !== null ? { sourceGroup, standing } : null,
        match: sourceMatch !== null && winner !== null ? { sourceMatch, winner } : null,
    }));

    const finalScore = scoredGames
        .filter(({ finishedAt }) => finishedAt !== null)
        .reduce(
            (
                [homeScore, visitingScore]: [number, number],
                { score: [[homeGameScore, _], [visitingGameScore, __]] },
            ): [number, number] => [
                homeScore + (homeGameScore > visitingGameScore ? 1 : 0),
                visitingScore + (homeGameScore < visitingGameScore ? 1 : 0),
            ],
            [0, 0],
        );

    return {
        ...matchRest,
        playoffLayer,
        homeTeam: homeTeam,
        visitingTeam: visitingTeam,
        games: scoredGames,
        homeTeamSource: findTeamType(mappedTeamSources, MatchTeamType.HOME),
        visitingTeamSource: findTeamType(mappedTeamSources, MatchTeamType.VISITING),
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
            },
            goals: {
                include: {
                    player: true,
                },
            },
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
    { homeTeamId, visitingTeamId, homeTeamSource, visitingTeamSource, ...data }: MatchCreateDto,
): Promise<MatchDetailedGetDto> {
    return expandMatchDetails(
        await prisma.match.create({
            data: {
                ...data,
                tournamentId,
                teams: {
                    create: makeTeamsArray(homeTeamId, visitingTeamId).map(({ type, value: teamId }) => ({
                        type,
                        teamId,
                    })),
                },
                teamSources: {
                    create: makeTeamsArray(homeTeamSource, visitingTeamSource).map(
                        ({ type, value: { match, group } }) => ({
                            type,
                            ...match,
                            ...group,
                        }),
                    ),
                },
            },
            include,
        }),
    );
}

export async function updateMatch(
    id: string,
    { homeTeamId, visitingTeamId, homeTeamSource, visitingTeamSource, ...data }: MatchUpdateDto,
): Promise<MatchDetailedGetDto> {
    return expandMatchDetails(
        await prisma.$transaction(async (tx) => {
            const { teams, teamSources } = await tx.match.findUniqueOrThrow({
                where: { id },
                include: { teamSources: true, teams: true },
            });
            console.log(
                makeNullTeamsArray(
                    homeTeamId,
                    visitingTeamId,
                    teams.map(({ type }) => type),
                ).map((type) => ({
                    type_matchId: { type, matchId: id },
                })),
                makeNullTeamsArray(
                    homeTeamSource,
                    visitingTeamSource,
                    teamSources.map(({ type }) => type),
                ).map((type) => ({
                    matchId_type: { type, matchId: id },
                })),
            );
            return await prisma.match.update({
                where: { id },
                data: {
                    ...data,
                    teams: {
                        upsert: makeTeamsArray(homeTeamId, visitingTeamId).map(({ type, value: teamId }) => ({
                            create: { type, teamId },
                            where: { type_matchId: { type, matchId: id } },
                            update: { teamId },
                        })),
                        delete: makeNullTeamsArray(
                            homeTeamId,
                            visitingTeamId,
                            teams.map(({ type }) => type),
                        ).map((type) => ({
                            type_matchId: { type, matchId: id },
                        })),
                    },
                    teamSources: {
                        upsert: makeTeamsArray(homeTeamSource, visitingTeamSource).map(
                            ({ type, value: { match, group } }) => ({
                                create: { type, ...match, ...group },
                                where: { matchId_type: { type, matchId: id } },
                                update: { ...match, ...group },
                            }),
                        ),
                        delete: makeNullTeamsArray(
                            homeTeamSource,
                            visitingTeamSource,
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

export async function deleteMatch(id: string): Promise<void> {
    await prisma.match.delete({ where: { id } });
}

export async function createGame(matchId: string, data: MatchGameCreateDto): Promise<MatchDetailedGetDto> {
    return expandMatchDetails(
        await prisma.match.update({
            where: { id: matchId },
            data: {
                games: {
                    create: data,
                },
            },
            include,
        }),
    );
}

export async function updateGame(
    matchId: string,
    gameId: string,
    data: MatchGameUpdateDto,
): Promise<MatchDetailedGetDto> {
    return expandMatchDetails(
        await prisma.match.update({
            where: { id: matchId },
            data: {
                games: {
                    update: {
                        where: { id: gameId },
                        data,
                    },
                },
            },
            include,
        }),
    );
}

export async function deleteGame(matchId: string, gameId: string): Promise<MatchDetailedGetDto> {
    return expandMatchDetails(
        await prisma.match.update({
            where: { id: matchId },
            data: {
                games: {
                    delete: { id: gameId },
                },
            },
            include,
        }),
    );
}

export async function createGoal(matchId: string, gameId: string, data: GoalCreateDto): Promise<MatchDetailedGetDto> {
    return expandMatchDetails(
        await prisma.match.update({
            where: { id: matchId },
            data: {
                games: {
                    update: {
                        where: { id: gameId },
                        data: {
                            goals: {
                                create: data,
                            },
                        },
                    },
                },
            },
            include,
        }),
    );
}

export async function deleteGoal(matchId: string, gameId: string, goalId: string): Promise<MatchDetailedGetDto> {
    return expandMatchDetails(
        await prisma.match.update({
            where: { id: matchId },
            data: {
                games: {
                    update: {
                        where: { id: gameId },
                        data: {
                            goals: {
                                delete: { id: goalId },
                            },
                        },
                    },
                },
            },
            include,
        }),
    );
}

export async function createPlayerPositions(
    matchId: string,
    gameId: string,
    { players, ...data }: PlayerPositionsCreateDto,
): Promise<MatchDetailedGetDto> {
    return expandMatchDetails(
        await prisma.match.update({
            where: { id: matchId },
            data: {
                games: {
                    update: {
                        where: { id: gameId },
                        data: {
                            playerPositions: {
                                create: {
                                    ...data,
                                    players: {
                                        create: players,
                                    },
                                },
                            },
                        },
                    },
                },
            },
            include,
        }),
    );
}

export async function deletePlayerPositions(
    matchId: string,
    gameId: string,
    playerPositionsId: string,
): Promise<MatchDetailedGetDto> {
    return expandMatchDetails(
        await prisma.match.update({
            where: { id: matchId },
            data: {
                games: {
                    update: {
                        where: { id: gameId },
                        data: {
                            playerPositions: {
                                delete: { id: playerPositionsId },
                            },
                        },
                    },
                },
            },
            include,
        }),
    );
}
