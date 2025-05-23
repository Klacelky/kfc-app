import { ClipboardDocumentListIcon, PencilSquareIcon, TrophyIcon } from '@heroicons/react/16/solid';
import Link from 'next/link';
import { ReactNode } from 'react';

import { RouteParams as ParentRouteParams } from '../page';

import Alert from '@/components/Alert';
import DateTime from '@/components/DateTime';
import Button from '@/components/admin/Button';
import Table from '@/components/admin/Table';
import { TeamSourceGetDto } from '@/dtos/match';
import { listMatches } from '@/services/matches';
import { PageProps } from '@/utils/common';
import { handleError } from '@/utils/server/common';

export const dynamic = 'force-dynamic';

export type RouteParams = ParentRouteParams;

function formatTeamSource(source: TeamSourceGetDto | null): ReactNode {
    if (!source) {
        return null;
    }
    switch (source.type) {
        case 'group':
            return (
                <span className="italic">
                    {source.standing} of {source.sourceGroup.name}
                </span>
            );
        case 'match':
            return (
                <span className="italic">
                    {source.winner ? 'W' : 'L'} {source.sourceMatch.name}
                </span>
            );
    }
}

export default async function MatchesPage({ params }: PageProps<RouteParams>) {
    const { tournamentId } = await params;
    const { data: matches, error } = await handleError(() => listMatches(tournamentId, {}));

    if (error) {
        return <Alert>{error.message}</Alert>;
    }

    return (
        <>
            <h1>Matches</h1>
            <Table
                data={matches}
                columnNames={['Name', 'Expected start', 'Playoff Level', 'Home Team', 'Visiting Team', 'Score']}
                getCols={({ name, expectedStart, playoffLayer, home, visiting, games }) => [
                    name,
                    <DateTime key="expectedStart" datetime={expectedStart} />,
                    playoffLayer,
                    <div key="winner" className="flex flex-row items-center">
                        {home.winner && <TrophyIcon className="text-kfc-teal h-6" />}
                        {home.team?.abbrev || formatTeamSource(home.source)}
                    </div>,
                    <div key="looser" className="flex flex-row items-center">
                        {visiting.winner && <TrophyIcon className="text-kfc-teal h-6" />}
                        {visiting.team?.abbrev || formatTeamSource(visiting.source)}
                    </div>,
                    games
                        .map(
                            ({
                                score: {
                                    home: { score: homeScore },
                                    visiting: { score: visiting },
                                },
                            }) => `${homeScore}:${visiting}`,
                        )
                        .join('; '),
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
