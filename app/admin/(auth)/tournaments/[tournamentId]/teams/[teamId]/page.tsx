import { RouteParams as ParentRouteParams } from '../page';

import TeamEditForm from './TeamEditForm';
import { createTeamAction, deleteTeamAction, updateTeamAction } from './actions';

import Alert from '@/components/Alert';
import { listPlayers } from '@/services/players';
import { getTeam } from '@/services/teams';
import { PageProps } from '@/utils/common';
import { handleError } from '@/utils/server/common';

export type RouteParams = ParentRouteParams & {
    teamId: string;
};

export default async function TeamPage({ params }: PageProps<RouteParams>) {
    const { tournamentId, teamId } = await params;
    const { data: data, error } = await handleError(async () => {
        return {
            players: await listPlayers(),
            team: teamId === 'new' ? undefined : await getTeam(tournamentId, teamId),
        };
    });

    if (error) {
        return <Alert>Failed to initialize form: {error.message}</Alert>;
    }

    const { players, team } = data;

    return (
        <>
            <h1>{team ? 'Edit Team' : 'New Team'}</h1>
            <TeamEditForm tournamentId={tournamentId} players={players} team={team} />
        </>
    );
}
