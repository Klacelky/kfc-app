'use client';

import { PageParams } from '@/utils/server/pages';
import { RouteParams as ParentRouteParams } from '../page';
import { getErrorMessage, useSWRSchema } from '@/utils/client/api';
import { GoalkeeperStats, PlayerGoalStats, PlayerPhotosStats, TournamentStatsSchema } from '@/dtos/stats';
import Alert from '@/components/admin/Alert';
import Loading from '@/components/Loading';
import { useState } from 'react';
import Table from '@/components/admin/Table';
import { Select } from '@/components/admin/Input';

export interface RouteParams extends ParentRouteParams {}

function PlayerGoalStatsSection({ stats }: { stats: PlayerGoalStats[] }) {
    const [sort, setSort] = useState('goalsPerGame');

    return (
        <section>
            <h2>Player Goals</h2>
            <Select label="Sort by (descending)" onChange={(event) => setSort(event.target.value)} value={sort}>
                <option value="goals">Goals</option>
                <option value="goals">Games</option>
                <option value="goalsPerGame">Goals per game</option>
            </Select>
            <Table
                columnNames={['Player name', 'Goals', 'Games', 'Goals per game']}
                data={stats.sort((sa, sb) => {
                    if (sort === 'goals') {
                        return sb.goals - sa.goals;
                    }
                    if (sort === 'games') {
                        return sb.games - sb.games;
                    }
                    return sb.goalsPerGame - sa.goalsPerGame;
                })}
                getCols={({ player, goals, games, goalsPerGame }) => [player.name, goals, games, goalsPerGame]}
            />
        </section>
    );
}

function PlayerPhotoStatsSection({ stats }: { stats: PlayerPhotosStats[] }) {
    return (
        <section>
            <h2>Player Photos</h2>
            <Table
                columnNames={['Player name', 'Photos']}
                data={stats.sort((sa, sb) => {
                    return sb.photos - sa.photos;
                })}
                getCols={({ player, photos }) => [player.name, photos]}
            />
        </section>
    );
}

function GoalkeeperStatsSection({ stats }: { stats: GoalkeeperStats[] }) {
    const [sort, setSort] = useState('receivedGoalsPerGame');

    return (
        <section>
            <h2>Goalkeeper received goals</h2>
            <Select label="Sort by (ascending)" onChange={(event) => setSort(event.target.value)} value={sort}>
                <option value="games">Games</option>
                <option value="timeInGoal">Time in goal</option>
                <option value="receivedGoals">Received goals</option>
                <option value="receivedGoalsPerGame">Received goals per game</option>
                <option value="receivedGoalsPerSecond">Received goals per second in goal</option>
            </Select>
            <Table
                columnNames={[
                    'Goalkeeper name',
                    'Games',
                    'Time in goal [seconds]',
                    'Received goals',
                    'Received goals per game',
                    'Received goals per second in goal',
                ]}
                data={stats.sort((sa, sb) => {
                    if (sort === 'games') {
                        return sa.games - sb.games;
                    }
                    if (sort === 'timeInGoal') {
                        return sa.timeInGoal - sb.timeInGoal;
                    }
                    if (sort === 'receivedGoals') {
                        return sa.receivedGoals - sb.receivedGoals;
                    }
                    if (sort === 'receivedGoalsPerSecond') {
                        return sa.receivedGoalsPerSecond - sb.receivedGoalsPerSecond;
                    }
                    return sa.receivedGoalsPerGame - sb.receivedGoalsPerGame;
                })}
                getCols={({
                    goalkeeper,
                    games,
                    timeInGoal,
                    receivedGoals,
                    receivedGoalsPerGame,
                    receivedGoalsPerSecond,
                }) => [goalkeeper.name, games, timeInGoal, receivedGoals, receivedGoalsPerGame, receivedGoalsPerSecond]}
            />
        </section>
    );
}

export default function StatsPage({ params: { tournamentId } }: PageParams<RouteParams>) {
    const { data, error, isLoading } = useSWRSchema(`/api/tournament/${tournamentId}/stats`, TournamentStatsSchema);

    if (error) {
        return <Alert>{getErrorMessage(error)}</Alert>;
    }
    if (isLoading) {
        return <Loading />;
    }
    if (!data) {
        return <Alert>No data</Alert>;
    }

    return (
        <>
            <PlayerGoalStatsSection stats={data.playerGoals} />
            <PlayerPhotoStatsSection stats={data.playerPhotos} />
            <GoalkeeperStatsSection stats={data.goalkeeper} />
        </>
    );
}
