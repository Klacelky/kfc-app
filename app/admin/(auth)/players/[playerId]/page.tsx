import { RouteParams as ParentRouteParams } from '../page';

import PlayerEditForm from './PlayerEditForm';

import Alert from '@/components/Alert';
import { getPlayer } from '@/services/players';
import { handleError } from '@/utils/server/common';
import { PageParams } from '@/utils/server/pages';

export type RouteParams = ParentRouteParams & {
    playerId: string;
};

export default async function PlayerPage({ params: { playerId } }: PageParams<RouteParams>) {
    const { data: player, error } = await handleError(async () =>
        playerId === 'new' ? undefined : await getPlayer(playerId),
    );

    if (error) {
        return <Alert>Failed to initialize form: {error.message}</Alert>;
    }

    return (
        <>
            <h1>{player ? 'Edit Player' : 'New Player'}</h1>
            <PlayerEditForm player={player} />
        </>
    );
}
