import { PencilSquareIcon } from '@heroicons/react/16/solid';
import Link from 'next/link';

import { RouteParams as ParentRouteParams } from '../page';

import Alert from '@/components/Alert';
import Button from '@/components/admin/Button';
import Table from '@/components/admin/Table';
import { TeamQueryDtoSchema } from '@/dtos/team';
import { listTeams } from '@/services/teams';
import { handleError } from '@/utils/server/common';
import { PageParams } from '@/utils/server/pages';

export const dynamic = 'force-dynamic';

export type RouteParams = ParentRouteParams;

export default async function TeamsPage({ params: { tournamentId }, searchParams }: PageParams<RouteParams>) {
    const query = await TeamQueryDtoSchema.safeParseAsync(searchParams);
    const { error, data } = await handleError(() => listTeams(tournamentId, query.success ? query.data : {}));

    if (error) {
        return <Alert>{error.message}</Alert>;
    }

    return (
        <>
            <h1>Teams</h1>
            <Table
                data={data!}
                columnNames={['Name', 'Abbrev', 'Players']}
                getCols={({ name, abbrev, players }) => [name, abbrev, players.map(({ name }) => name).join(', ')]}
                actions={({ id }) => (
                    <>
                        <Link href={`teams/${id}`}>
                            <PencilSquareIcon className="w-8" />
                        </Link>
                    </>
                )}
            />
            <Link href="teams/new">
                <Button color="primary">New Team</Button>
            </Link>
        </>
    );
}
