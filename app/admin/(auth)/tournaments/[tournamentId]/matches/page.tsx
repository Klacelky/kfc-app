import { MatchDetailedGetDto, MatchQueryDtoSchema } from '@/dtos/match';
import { listMatches } from '@/services/matches';
import { RouteParams as ParentRouteParams } from '../page';
import { handleError } from '@/utils/server/common';
import Table from '@/components/admin/Table';
import { teamHomeCmp } from '@/utils/common';
import { ClipboardDocumentListIcon, PencilSquareIcon } from '@heroicons/react/16/solid';
import Button from '@/components/admin/Button';
import Link from 'next/link';
import Alert from '@/components/admin/Alert';
import { PageParams } from '@/utils/server/pages';
import Input from '@/components/admin/Input';
import { listGroups } from '@/services/groups';
import Select from '@/components/admin/Select';
import { listTeams } from '@/services/teams';

export const dynamic = 'force-dynamic';

export interface RouteParams extends ParentRouteParams {}

export default async function MatchesPage({ params: { tournamentId }, searchParams }: PageParams<RouteParams>) {
    const query = await MatchQueryDtoSchema.safeParseAsync(searchParams);
    const { data, error } = await handleError(() => listMatches(tournamentId, query.success ? query.data : {}));

    const { data: groups } = await handleError(() => listGroups(tournamentId));
    const { data: teams } = await handleError(() => listTeams(tournamentId, {}));

    console.log(query, data);

    if (error) {
        return <Alert>{error.message}</Alert>;
    }

    return (
        <>
            <h1>Matches</h1>
            <Table
                data={data as MatchDetailedGetDto[]}
                columnNames={['Name', 'Expected start', 'Playoff Level', 'Teams', 'Score', '', '']}
                getCols={({ id, name, expectedStart, playoffLayer, teams, games }) => [
                    name,
                    expectedStart?.toLocaleString(),
                    playoffLayer,
                    teams
                        .sort(teamHomeCmp)
                        .map(({ abbrev }) => abbrev)
                        .join(' - '),
                    games.map(({ score }) => score.join(':')).join(', '),
                    <Link key="edit" href={`matches/${id}`}>
                        <PencilSquareIcon className="w-6" />
                    </Link>,
                    <Link key="edit" href={`matches/${id}/referee`}>
                        <ClipboardDocumentListIcon className="w-6" />
                    </Link>,
                ]}
            />
        </>
    );
}
