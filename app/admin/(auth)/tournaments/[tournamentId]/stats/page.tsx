import { RouteParams as ParentRouteParams } from '../page';

import { GoalkeeperStatsSection, MatchLengthStatsSection, PlayerGoalStatsSection, PlayerPhotoStatsSection } from './sections';

import Alert from '@/components/Alert';
import { tournamentStats } from '@/services/stats';
import { PageProps } from '@/utils/common';
import { handleError } from '@/utils/server/common';

export type RouteParams = ParentRouteParams;

export default async function StatsPage({ params }: PageProps<RouteParams>) {
    const { tournamentId } = await params;
    const { error, data } = await handleError(() => tournamentStats(tournamentId));

    if (error) {
        return <Alert>{error.message}</Alert>;
    }

    return (
        <>
            <PlayerGoalStatsSection stats={data.playerGoals} />
            <PlayerPhotoStatsSection stats={data.playerPhotos} />
            <GoalkeeperStatsSection stats={data.goalkeeper} />
            <MatchLengthStatsSection stats={data.matchLength} />
        </>
    );
}
