import { Goal, MatchGame, Player, PlayerPosition, PlayerPositionType, PlayerPositions, Team } from '@prisma/client';

import { listMatches } from './matches';

import { GoalkeeperStats, MatchLengthStats, PlayerGoalStats, PlayerPhotosStats, TournamentStats } from '@/dtos/stats';
import prisma from '@/utils/server/db';

export async function playerGoalStats(tournamentId: string): Promise<PlayerGoalStats[]> {
    const playersWithGoals = await prisma.player.findMany({
        where: {
            goals: {
                some: {
                    game: {
                        match: {
                            tournamentId,
                        },
                    },
                },
            },
        },
        include: {
            goals: {
                where: {
                    game: {
                        match: {
                            tournamentId,
                        },
                    },
                    own: false,
                },
                include: {
                    game: true,
                },
            },
            teams: {
                where: {
                    tournamentId,
                },
                include: {
                    matches: {
                        include: {
                            match: {
                                include: {
                                    games: true,
                                },
                            },
                        },
                    },
                },
            },
        },
    });
    return playersWithGoals
        .map(({ goals, teams, ...player }) => {
            const games = teams
                .flatMap(({ matches }) => matches.flatMap(({ match: { games } }) => games.map(({ id }) => id)))
                .filter((item, index, array) => array.indexOf(item) === index);
            return {
                id: player.id,
                player,
                goals: goals.length,
                games: games.length,
                goalsPerGame: goals.length / games.length,
            };
        })
        .sort(({ goalsPerGame: ga }, { goalsPerGame: gb }) => gb - ga);
}

export async function playerPhotoStats(tournamentId: string): Promise<PlayerPhotosStats[]> {
    const playersWithPhotos = await prisma.player.findMany({
        where: {
            goals: {
                some: {
                    game: {
                        match: {
                            tournamentId,
                        },
                    },
                    photo: true,
                },
            },
        },
        include: {
            goals: {
                where: {
                    photo: true,
                    game: {
                        match: {
                            tournamentId,
                        },
                    },
                },
            },
        },
    });
    return playersWithPhotos
        .map(({ goals, ...player }) => ({ id: player.id, player, photos: goals.length }))
        .sort(({ photos: pa }, { photos: pb }) => pb - pa);
}

type DetailedPlayerPositions = PlayerPositions & {
    players: (PlayerPosition & {
        player: Player & {
            teams: Team[];
        };
    })[];
};

function findGoalkeeper(goal: Goal, playerPositions: DetailedPlayerPositions[]): Player | undefined {
    const sortedPlayerPositions = playerPositions.sort(
        ({ timestamp: ta }, { timestamp: tb }) => ta.getTime() - tb.getTime(),
    );
    return sortedPlayerPositions
        .findLast(
            ({ timestamp, players }) =>
                goal.timestamp.getTime() > timestamp.getTime() &&
                players.find(({ playerId }) => playerId === goal.playerId) === undefined,
        )
        ?.players.find(({ type }) => type === PlayerPositionType.DEFENDER)?.player;
}

type PlayerTimestampAcc = { [playerId: string]: { timestamp: Date; type: PlayerPositionType } };

export async function goalkeeperStats(tournamentId: string): Promise<GoalkeeperStats[]> {
    const games: (MatchGame & {
        playerPositions: DetailedPlayerPositions[];
        goals: Goal[];
    })[] = await prisma.matchGame.findMany({
        where: {
            match: { playoffLayer: { not: null }, tournamentId },
        },
        include: {
            goals: true,
            playerPositions: {
                include: {
                    players: {
                        include: {
                            player: {
                                include: {
                                    teams: true,
                                },
                            },
                        },
                    },
                },
            },
        },
    });
    const goalkeepers: { [playerId: string]: Player } = {};
    const goalkeeperGoals: { [playerId: string]: number } = {};
    const goalkeeperTime: { [playerId: string]: number } = {};
    const goalkeeperGames: { [playerId: string]: number } = {};
    for (let i = 0; i < games.length; i++) {
        const { goals, playerPositions, finishedAt } = games[i];
        const gamePlayers: string[] = [];
        for (let j = 0; j < goals.length; j++) {
            const goal = goals[j];
            const goalkeeper = findGoalkeeper(goal, playerPositions);
            if (!goalkeeper) {
                console.error('Cannot attribute goal to goalkeeper', goal.id);
                continue;
            }
            goalkeeperGoals[goalkeeper.id] = (goalkeeperGoals[goalkeeper.id] || 0) + 1;
        }
        const acc = playerPositions.reduce(
            (acc: PlayerTimestampAcc, { timestamp, players }: DetailedPlayerPositions) => {
                for (let k = 0; k < players.length; k++) {
                    const { type, playerId, player } = players[k];
                    gamePlayers.push(playerId);
                    if (acc[playerId]) {
                        const { timestamp: prevTimestamp, type: prevType } = acc[playerId];
                        if (prevType === PlayerPositionType.DEFENDER) {
                            goalkeeperTime[playerId] =
                                (goalkeeperTime[playerId] || 0) +
                                (timestamp.getTime() / 1000 - prevTimestamp.getTime() / 1000);
                        }
                    }
                    acc[playerId] = { timestamp, type };
                    if (type === PlayerPositionType.DEFENDER) {
                        goalkeepers[playerId] = player;
                    }
                }
                return acc;
            },
            {},
        );
        if (!finishedAt) {
            console.error('Unfinished game', games[i].id);
            continue;
        }
        Object.entries(acc).map(([playerId, { timestamp, type }]) => {
            if (type === PlayerPositionType.DEFENDER) {
                goalkeeperTime[playerId] =
                    (goalkeeperTime[playerId] || 0) + (finishedAt.getTime() / 1000 - timestamp.getTime() / 1000);
            }
        });
        gamePlayers
            .filter((item, index, array) => array.indexOf(item) === index)
            .forEach((playerId) => {
                goalkeeperGames[playerId] = (goalkeeperGames[playerId] || 0) + 1;
            });
    }
    return Object.values(goalkeepers)
        .map((goalkeeper) => ({
            id: goalkeeper.id,
            goalkeeper,
            games: goalkeeperGames[goalkeeper.id],
            timeInGoal: goalkeeperTime[goalkeeper.id],
            receivedGoals: goalkeeperGoals[goalkeeper.id] || 0,
            receivedGoalsPerGame: (goalkeeperGoals[goalkeeper.id] || 0) / goalkeeperGames[goalkeeper.id],
            receivedGoalsPerSecond: (goalkeeperGoals[goalkeeper.id] || 0) / goalkeeperTime[goalkeeper.id],
        }))
        .sort(({ receivedGoals: ra }, { receivedGoals: rb }) => ra - rb);
}

async function matchLengthStats(tournamentId: string): Promise<MatchLengthStats[]> {
    return (await listMatches(tournamentId, {})).map((match) => ({
        ...match,
        matchLength: match.games
            .filter(({ finishedAt }) => finishedAt !== null)
            .map(({ createdAt, finishedAt }) => (finishedAt!.getTime() - createdAt.getTime()) / 1_000)
            .reduce((a, b) => a + b, 0),
    }));
}

export async function tournamentStats(tournamentId: string): Promise<TournamentStats> {
    return {
        playerGoals: await playerGoalStats(tournamentId),
        playerPhotos: await playerPhotoStats(tournamentId),
        goalkeeper: await goalkeeperStats(tournamentId),
        matchLength: await matchLengthStats(tournamentId),
    };
}
