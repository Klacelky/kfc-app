import { MatchGameUpdateDto } from '@/dtos/match';

export type UpdateGameActionProps = {
    gameId: string;
    game: MatchGameUpdateDto;
};

export type DeleteGameActionProps = {
    gameId: string;
};
