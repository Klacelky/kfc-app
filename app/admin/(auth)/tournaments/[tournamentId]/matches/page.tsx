import { ClipboardDocumentListIcon, PencilSquareIcon } from '@heroicons/react/16/solid';
import Link from 'next/link';

import { RouteParams as ParentRouteParams } from '../page';

import Alert from '@/components/Alert';
import Button from '@/components/admin/Button';
import Table from '@/components/admin/Table';
import { TeamSourceGetDto } from '@/dtos/match';
import { listMatches } from '@/services/matches';
import { handleError } from '@/utils/server/common';
import { PageParams } from '@/utils/server/pages';

export const dynamic = 'force-dynamic';

export type RouteParams = ParentRouteParams;

function formatTeamSource(source: TeamSourceGetDto | null): string | null {
    if (!source) {
        return null;
    }
    switch (source.type) {
        case 'group':
        return `=> ${source.sourceGroup.name}@${source.standing}`;
        case 'match':
        return `=> ${source.sourceMatch.name}@${source.winner ? 'W' : 'L'}`;
    }
}

export default async function MatchesPage({ params: { tournamentId } }: PageParams<RouteParams>) {
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
                    expectedStart?.toLocaleString(),
                    playoffLayer,
                    home.team?.abbrev || formatTeamSource(home.source),
                    visiting.team?.abbrev || formatTeamSource(visiting.source),
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
