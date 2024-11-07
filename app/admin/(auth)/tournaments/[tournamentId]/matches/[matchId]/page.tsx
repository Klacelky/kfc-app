import { RouteParams as ParentRouteParams } from '../page';

import MatchEditForm from './MatchEditForm';

import Alert from '@/components/Alert';
import { listGroups } from '@/services/groups';
import { getMatch, listMatches } from '@/services/matches';
import { listTeams } from '@/services/teams';
import { handleError } from '@/utils/server/common';
import { PageParams } from '@/utils/server/pages';

export const dynamic = 'force-dynamic';

export type RouteParams = ParentRouteParams & {
    matchId: string;
};

export default async function MatchEditPage({ params: { tournamentId, matchId } }: PageParams<RouteParams>) {
    const { data, error } = await handleError(async () => ({
        teams: await listTeams(tournamentId, {}),
        groups: await listGroups(tournamentId),
        matches: await listMatches(tournamentId, {}),
        match: matchId === 'new' ? undefined : await getMatch(matchId),
    }));

    if (error) {
        return <Alert>Failed to setup the form: {error.message}</Alert>;
    }

    const { teams, groups, matches, match } = data;

    return (
        <>
            <h1>{match ? 'Edit Match' : 'New Match'}</h1>
            <MatchEditForm tournamentId={tournamentId} teams={teams} groups={groups} matches={matches} match={match} />
        </>
    );
}
