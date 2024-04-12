'use client';

import { PageParams } from '@/utils/server/pages';
import { RouteParams as ParentRouteParams } from '../page';
import { MatchDetailedGetDto } from '@/dtos/match';
import MatchEditForm from '@/components/admin/forms/MatchEditForm';
import Alert from '@/components/admin/Alert';
import useSWR from 'swr';
import { AxiosError } from 'axios';
import { apiFetch, getErrorMessage } from '@/utils/client/api';

export const dynamic = 'force-dynamic';

export interface RouteParams extends ParentRouteParams {
    matchId: string;
}

function NewMatch({ tournamentId }: RouteParams) {
    return (
        <>
            <h1>New Match</h1>
            <MatchEditForm values={undefined} tournamentId={tournamentId} />
        </>
    );
}

function EditMatch({ tournamentId, matchId }: RouteParams) {
    const { data, error } = useSWR<MatchDetailedGetDto, AxiosError>(
        `/api/tournament/${tournamentId}/match/${matchId}`,
        apiFetch,
    );

    if (error) {
        return <Alert>{getErrorMessage(error)}</Alert>;
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
