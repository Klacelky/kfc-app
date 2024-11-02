import { TeamCreateDto, TeamUpdateDto } from '@/dtos/team';

export type CreateTeamActionProps = {
    tournamentId: string;
    team: TeamCreateDto;
};

export type UpdateTeamActionProps = {
    teamId: string;
    team: TeamUpdateDto;
};

export type DeleteTeamActionProps = {
    teamId: string;
};
