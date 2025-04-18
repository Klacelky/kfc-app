import { ClipboardDocumentListIcon, PencilSquareIcon } from '@heroicons/react/16/solid';
import Link from 'next/link';

import { RouteParams as ParentRouteParams } from '../page';

import { MatchGameButtons } from './buttons';

import Alert from '@/components/Alert';
import DateTime from '@/components/DateTime';
import Table from '@/components/admin/Table';
import { getMatch } from '@/services/matches';
import { PageProps } from '@/utils/common';
import { handleError } from '@/utils/server/common';

export const dynamic = 'force-dynamic';

export type RouteParams = ParentRouteParams;

export default async function MatchGamesPage({ params }: PageProps<RouteParams>) {
    const { matchId } = await params;
    const { data, error } = await handleError(() => getMatch(matchId));

    if (error) {
        return <Alert>Failed to load match: {error.message}</Alert>;
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
            <MatchGameButtons matchId={matchId} />
        </>
    );
}
