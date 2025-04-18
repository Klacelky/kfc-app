import { RouteParams as ParentRouteParams } from '../page';

import PlayerEditForm from './PlayerEditForm';

import Alert from '@/components/Alert';
import { getPlayer } from '@/services/players';
import { PageProps } from '@/utils/common';
import { handleError } from '@/utils/server/common';

export type RouteParams = ParentRouteParams & {
    playerId: string;
};

export default async function PlayerPage({ params }: PageProps<RouteParams>) {
    const { playerId } = await params;
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
