import { PencilSquareIcon } from '@heroicons/react/16/solid';
import Link from 'next/link';

import { RouteParams as ParentRouteParams } from '../page';

import Alert from '@/components/Alert';
import Button from '@/components/admin/Button';
import Table from '@/components/admin/Table';
import { listPlayers } from '@/services/players';
import { handleError } from '@/utils/server/common';

export const dynamic = 'force-dynamic';

export type RouteParams = ParentRouteParams;

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
                actions={({ id }) => (
                    <>
                        <Link href={`players/${id}`}>
                            <PencilSquareIcon className="w-8" />
                        </Link>
                    </>
                )}
            />
            <Link href="players/new">
                <Button type="button" color='primary'>New Player</Button>
            </Link>
        </>
    );
}
