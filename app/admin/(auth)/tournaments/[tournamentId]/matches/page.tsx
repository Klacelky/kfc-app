'use client';

import { MatchDetailedGetDtoSchema } from '@/dtos/match';
import { RouteParams as ParentRouteParams } from '../page';
import Table from '@/components/admin/Table';
import { ClipboardDocumentListIcon, PencilSquareIcon } from '@heroicons/react/16/solid';
import Link from 'next/link';
import Alert from '@/components/admin/Alert';
import { PageParams } from '@/utils/server/pages';
import Button from '@/components/admin/Button';
import { getErrorMessage, useSWRSchema } from '@/utils/client/api';
import Loading from '@/components/Loading';
import { z } from 'zod';

export const dynamic = 'force-dynamic';

export interface RouteParams extends ParentRouteParams {}

export default function MatchesPage({ params: { tournamentId } }: PageParams<RouteParams>) {
    const { data, error, isLoading } = useSWRSchema(
        `/api/tournament/${tournamentId}/match`,
        z.array(MatchDetailedGetDtoSchema),
    );

    if (error) {
        return <Alert>{getErrorMessage(error)}</Alert>;
    }

    if (isLoading) {
        return <Loading className="" />;
    }

    return (
        <>
            <h1>Matches</h1>
            <Table
                data={data}
                columnNames={['Name', 'Expected start', 'Playoff Level', 'Home Team', 'Visiting Team', 'Score']}
                getCols={({ name, expectedStart, playoffLayer, homeTeam, visitingTeam, games }) => [
                    name,
                    expectedStart?.toLocaleString(),
                    playoffLayer,
                    homeTeam?.abbrev,
                    visitingTeam?.abbrev,
                    games.map(({ score }) => score.join(':')).join('; '),
                ]}
                actions={({ id }) => (
                    <>
                        <Link href={`matches/${id}`}>
                            <PencilSquareIcon className="w-8" />
                        </Link>
                        <Link href={`matches/${id}/games`}>
                            <ClipboardDocumentListIcon className="w-8" />
                        </Link>
                    </>
                )}
            />
            <Link href="matches/new">
                <Button color="primary">New Match</Button>
            </Link>
        </>
    );
}
