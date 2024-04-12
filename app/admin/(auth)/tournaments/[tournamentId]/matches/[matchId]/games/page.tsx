'use client';

import { PageParams } from '@/utils/server/pages';
import { RouteParams as ParentRouteParams } from '../page';
import { MatchDetailedGetDtoSchema, MatchGameCreateDto, MatchItemCreatedDto } from '@/dtos/match';
import Table from '@/components/admin/Table';
import Alert from '@/components/admin/Alert';
import { api, getErrorMessage, loadingButton, useSWRSchema } from '@/utils/client/api';
import Link from 'next/link';
import { ClipboardDocumentListIcon, PencilSquareIcon } from '@heroicons/react/16/solid';
import Loading from '@/components/Loading';
import Button from '@/components/admin/Button';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export const dynamic = 'force-dynamic';

export interface RouteParams extends ParentRouteParams {}

export default function MatchGamesPage({ params: { matchId, tournamentId } }: PageParams<RouteParams>) {
    const { push } = useRouter();
    const { data, error, isLoading, mutate } = useSWRSchema(
        `/api/tournament/${tournamentId}/match/${matchId}`,
        MatchDetailedGetDtoSchema,
    );
    const [newLoading, setNewLoading] = useState(false);

    if (error) {
        return <Alert>{getErrorMessage(error)}</Alert>;
    }

    if (isLoading) {
        return <Loading />;
    }

    return (
        <>
            <h1>
                {data?.homeTeam?.abbrev} - {data?.visitingTeam?.abbrev}
            </h1>
            {data?.winner && <div>Winner: {data.winner.abbrev}</div>}
            <Table
                data={data?.games}
                columnNames={['Started At', 'Finished At', 'Home Team Color', 'Score']}
                getCols={({ startedAt, finishedAt, homeTeamColor, score }) => [
                    startedAt.toLocaleString(),
                    finishedAt?.toLocaleString(),
                    homeTeamColor,
                    score.map(([goals, outGoals]) => `${goals}(${outGoals})`).join(':'),
                ]}
                actions={({ id }) => (
                    <>
                        <Link href={`games/${id}`}>
                            <PencilSquareIcon className="w-6" />
                        </Link>
                        <Link href={`games/${id}/ref`}>
                            <ClipboardDocumentListIcon className="w-6" />
                        </Link>
                    </>
                )}
            />
            <Button
                color="primary"
                onClick={loadingButton(setNewLoading, async () => {
                    try {
                        await api.post<MatchItemCreatedDto>(`/api/tournament/${tournamentId}/match/${matchId}/game`, {
                            homeTeamColor: 'BLUE',
                        } as MatchGameCreateDto);
                        mutate();
                    } catch (error) {
                        alert(getErrorMessage(error));
                    }
                })}
                disabled={newLoading}
            >
                New Game
            </Button>
        </>
    );
}
