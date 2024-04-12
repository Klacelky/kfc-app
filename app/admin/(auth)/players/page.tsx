import Table from '@/components/admin/Table';
import Alert from '@/components/admin/Alert';
import { listPlayers } from '@/services/players';
import { handleError } from '@/utils/server/common';
import { RouteParams as ParentRouteParams } from '../page';

export const dynamic = 'force-dynamic';

export interface RouteParams extends ParentRouteParams {}

export default async function PlayersPage() {
    const { data, error } = await handleError(() => listPlayers());

    if (error) {
        return <Alert>{error.message}</Alert>;
    }

    return (
        <>
            <h1>Players</h1>
            <Table
                data={data!}
                columnNames={['Name', 'Description']}
                getCols={({ name, description }) => [name, description]}
            />
        </>
    );
}
