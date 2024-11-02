'use client';

import { RouteParams as ParentRouteParams } from '../page';

import Alert from '@/components/Alert';
import Loading from '@/components/Loading';
import MatchEditForm from '@/components/admin/forms/MatchEditForm';
import { MatchDetailedGetDtoSchema } from '@/dtos/match';
import { getErrorMessage, useSWRSchema } from '@/utils/client/api';
import { PageParams } from '@/utils/server/pages';

export const dynamic = 'force-dynamic';

export type RouteParams = ParentRouteParams & {
    matchId: string;
};

function NewMatch({ tournamentId }: RouteParams) {
    return (
        <>
            <h1>New Match</h1>
            <MatchEditForm values={undefined} tournamentId={tournamentId} />
        </>
    );
}

function EditMatch({ tournamentId, matchId }: RouteParams) {
    const { data, error, isLoading } = useSWRSchema(
        `/api/tournament/${tournamentId}/match/${matchId}`,
        MatchDetailedGetDtoSchema,
    );

    if (error) {
        return <Alert>{getErrorMessage(error)}</Alert>;
    }

    if (isLoading) {
        return <Loading />;
    }

    return (
        <>
            <h1>Edit Match</h1>
            <MatchEditForm values={data} tournamentId={tournamentId} matchId={matchId} />
        </>
    );
}

export default function MatchEditPage({ params }: PageParams<RouteParams>) {
    const { matchId } = params;

    if (matchId === 'new') {
        return <NewMatch {...params} />;
    }
    return <EditMatch {...params} />;
}
