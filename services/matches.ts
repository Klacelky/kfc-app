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

type MatchWithDetails = Match & {
    teams: (MatchTeam & {
        team: TeamWithPlayers;
    })[];
    games: GameWithDetails[];
    teamSources: (TeamSource & {
        sourceGroup: Group | null;
        sourceMatch: Match | null;
    })[];
};

function countGameScore(
    homeTeam: TeamWithPlayers | undefined,
    visitingTeam: TeamWithPlayers | undefined,
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

function expandMatchDetails({ teams, games, teamSources, ...matchRest }: MatchWithDetails): MatchDetailedGetDto {
    const homeTeam = teams.find(({ type }) => type === MatchTeamType.HOME)?.team;
    const visitingTeam = teams.find(({ type }) => type === MatchTeamType.VISITING)?.team;

    const scoredGames = games.map(({ playerPositions, goals, ...gameRest }) => ({
        ...gameRest,
        playerPositions: playerPositions.map(({ players, ...playerPositionsRest }) => ({
            ...playerPositionsRest,
            players: players.map(({ type, player }) => ({ ...player, type })),
        })),
        goals: goals,
        score: countGameScore(homeTeam, visitingTeam, goals),
    }));

    return {
        ...matchRest,
        teams: teams.map(({ team, type }) => ({ ...team, type })),
        games: scoredGames,
        teamSources: teamSources.map(({ standing, sourceGroup, winner, sourceMatch, ...rest }) => ({
            ...rest,
            group: sourceGroup !== null && standing !== null ? { sourceGroup, standing } : null,
            match: sourceMatch !== null && winner !== null ? { sourceMatch, winner } : null,
        })),
        score: scoredGames
            .filter(({ finishedAt }) => finishedAt !== null)
            .reduce(
                (
                    [homeScore, visitingScore]: [number, number],
                    { score: [[homeGameScore, _], [visitingGameScore, __]] },
                ): [number, number] => [
                    homeScore + homeGameScore > visitingGameScore ? 1 : 0,
                    visitingScore + homeGameScore < visitingGameScore ? 1 : 0,
                ],
                [0, 0],
            ),
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
    { groupId, teamId, playoff, teamType }: MatchQueryDto,
): Promise<MatchDetailedGetDto[]> {
    return (
        await prisma.match.findMany({
            where: {
                AND: [
                    { teams: { every: { team: { tournamentId } } } },
                    groupId ? { teams: { every: { team: { group: { groupId } } } }, playoffLayer: null } : {},
                    teamId ? { teams: { some: { teamId, type: teamType } } } : {},
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

export async function createMatch({ teams, teamSources, ...data }: MatchCreateDto): Promise<MatchDetailedGetDto> {
    return expandMatchDetails(
        await prisma.match.create({
            data: {
                ...data,
                teams: {
                    create: teams.map(({ type, teamId }) => ({ type: type, teamId })),
                },
                teamSources: {
                    create: teamSources.map(({ type, match, group }) => ({
                        type: type,
                        standing: group?.standing,
                        winner: match?.winner,
                        sourceGroupId: group?.sourceGroupId,
                        sourceMatchId: match?.sourceMatchId,
                    })),
                },
            },
            include,
        }),
    );
}

export async function updateMatch(
    id: string,
    { teams, teamSources, ...data }: MatchUpdateDto,
): Promise<MatchDetailedGetDto> {
    return expandMatchDetails(
        await prisma.match.update({
            where: { id },
            data: {
                ...data,
                teams:
                    teams !== undefined
                        ? {
                              upsert: teams.map(({ type, teamId }) => ({
                                  create: { type, teamId },
                                  where: { teamId_matchId: { matchId: id, teamId } },
                                  update: { type: type },
                              })),
                              deleteMany: {
                                  matchId: id,
                                  NOT: teams.map(({ teamId }) => ({ teamId })),
                              },
                          }
                        : undefined,
                teamSources:
                    teamSources !== undefined
                        ? {
                              upsert: teamSources.map(({ type, match, group }) => ({
                                  create: {
                                      type: type,
                                      standing: group?.standing,
                                      winner: match?.winner,
                                      sourceGroupId: group?.sourceGroupId,
                                      sourceMatchId: match?.sourceMatchId,
                                  },
                                  where: { matchId_type: { matchId: id, type } },
                                  update: {
                                      standing: group?.standing,
                                      winner: match?.winner,
                                      sourceGroupId: group?.sourceGroupId,
                                      sourceMatchId: match?.sourceMatchId,
                                  },
                              })),
                              deleteMany: {
                                  matchId: id,
                                  NOT: teamSources.map(({ type }) => ({ type })),
                              },
                          }
                        : undefined,
            },
            include,
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
