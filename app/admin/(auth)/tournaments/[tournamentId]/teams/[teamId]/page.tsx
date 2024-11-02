import { RouteParams as ParentRouteParams } from '../page';

import TeamEditForm from './TeamEditForm';
import { createTeamAction, deleteTeamAction, updateTeamAction } from './actions';

import Alert from '@/components/Alert';
import { listPlayers } from '@/services/players';
import { getTeam } from '@/services/teams';
import { handleError } from '@/utils/server/common';
import { PageParams } from '@/utils/server/pages';

export type RouteParams = ParentRouteParams & {
    teamId: string;
};

export default async function TeamPage({ params: { tournamentId, teamId } }: PageParams<RouteParams>) {
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

    return team ? (
        <>
            <h1>Edit Team</h1>
            <TeamEditForm
                tournamentId={tournamentId}
                players={players}
                type="update"
                team={team}
                updateAction={updateTeamAction}
                deleteAction={deleteTeamAction}
            />
        </>
    ) : (
        <>
            <h1>New Team</h1>
            <TeamEditForm tournamentId={tournamentId} players={players} type="create" createAction={createTeamAction} />
        </>
    );
}
