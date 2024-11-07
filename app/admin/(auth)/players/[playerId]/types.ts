import { PlayerCreateDto, PlayerUpdateDto } from '@/dtos/player';

export type CreatePlayerActionProps = {
    player: PlayerCreateDto;
};

export type UpdatePlayerActionProps = {
    playerId: string;
    player: PlayerUpdateDto;
};

export type DeletePlayerActionProps = {
    playerId: string;
};
