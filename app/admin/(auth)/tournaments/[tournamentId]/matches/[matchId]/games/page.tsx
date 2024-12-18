'use client';

import { ClipboardDocumentListIcon, PencilSquareIcon } from '@heroicons/react/16/solid';
import Link from 'next/link';
import { useState } from 'react';

import { RouteParams as ParentRouteParams } from '../page';

import Alert from '@/components/Alert';
import DateTime from '@/components/DateTime';
import Loading from '@/components/Loading';
import Button from '@/components/admin/Button';
import Table from '@/components/admin/Table';
import { MatchDetailedGetDtoSchema, MatchGameCreateDto, MatchItemCreatedDto, MatchUpdateDto } from '@/dtos/match';
import { api, getErrorMessage, loadingButton, useSWRSchema } from '@/utils/client/api';
import { PageParams } from '@/utils/server/pages';

export const dynamic = 'force-dynamic';

export type RouteParams = ParentRouteParams;

export default function MatchGamesPage({ params: { matchId, tournamentId } }: PageParams<RouteParams>) {
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
                {data?.home.team?.abbrev} - {data?.visiting.team?.abbrev}
            </h1>
            {data?.home.winner && <div>Winner: {data.home.team?.abbrev}</div>}
            {data?.visiting.winner && <div>Winner: {data.visiting.team?.abbrev}</div>}
            <Table
                data={data?.games}
                columnNames={['Started At', 'Finished At', 'Home Team Color', 'Score']}
                getCols={({
                    startedAt,
                    finishedAt,
                    homeTeamColor,
                    score: {
                        home: { score: homeScore, out: homeOut },
                        visiting: { score: visitingScore, out: visitingOut },
                    },
                }) => [
                    <DateTime key="startedAt" datetime={startedAt} />,
                    <DateTime key="finishedAt" datetime={finishedAt} />,
                    homeTeamColor,
                    `${homeScore}(${homeOut}):${visitingScore}(${visitingOut})`,
                ]}
                actions={({ id }) => (
                    <>
                        <Link href={`games/${id}`}>
                            <PencilSquareIcon className="w-8" />
                        </Link>
                        <Link href={`games/${id}/ref`}>
                            <ClipboardDocumentListIcon className="w-8" />
                        </Link>
                    </>
                )}
            />
            <div className="flex flex-row justify-between">
                <Button
                    color="primary"
                    onClick={loadingButton(setNewLoading, async () => {
                        try {
                            await api.post<MatchItemCreatedDto>(
                                `/api/tournament/${tournamentId}/match/${matchId}/game`,
                                {
                                    homeTeamColor: 'BLUE',
                                } as MatchGameCreateDto,
                            );
                            mutate();
                        } catch (error) {
                            alert(getErrorMessage(error));
                        }
                    })}
                    disabled={newLoading}
                >
                    New Game
                </Button>
                <Button
                    color="danger"
                    onClick={loadingButton(setNewLoading, async () => {
                        try {
                            await api.post<MatchUpdateDto>(`/api/tournament/${tournamentId}/match/${matchId}/finish`, {
                                updateSuccessiveMatches: true,
                            } as MatchUpdateDto);
                            mutate();
                        } catch (error) {
                            alert(getErrorMessage(error));
                        }
                    })}
                    disabled={newLoading}
                >
                    Finish Match
                </Button>
            </div>
        </>
    );
}
