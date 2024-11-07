import { MatchCreateDto, MatchUpdateDto } from '@/dtos/match';

export type CreateMatchActionProps = {
    tournamentId: string;
    match: MatchCreateDto;
};

export type UpdateMatchActionProps = {
    matchId: string;
    match: MatchUpdateDto;
};

export type DeleteMatchActionProps = {
    matchId: string;
};
