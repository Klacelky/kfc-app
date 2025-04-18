import { RouteParams as ParentRouteParams } from '../page';

import { MatchGameEditForm } from './MatchGameEditForm';

import Alert from '@/components/Alert';
import { getMatch } from '@/services/matches';
import { PageProps } from '@/utils/common';
import { handleError } from '@/utils/server/common';

export type RouteParams = ParentRouteParams & {
    gameId: string;
};

export default async function MatchGameEditPage({ params }: PageProps<RouteParams>) {
    const { matchId, gameId } = await params;
    const { data, error } = await handleError(async () => {
        const match = await getMatch(matchId);
        return match.games.find(({ id }) => id == gameId);
    });

    if (error) {
        return <Alert>{error.message}</Alert>;
    }

    if (!data) {
        return <Alert>Game not found</Alert>;
    }

    return (
        <>
            <h1>Edit Game</h1>
            <MatchGameEditForm game={data} />
        </>
    );
}
