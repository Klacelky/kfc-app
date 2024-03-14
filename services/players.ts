import { PlayerCreateDto, PlayerGetDto, PlayerUpdateDto } from '@/dtos/player';
import prisma from '@/utils/db';

export async function listPlayers(): Promise<PlayerGetDto[]> {
    return await prisma.player.findMany({ orderBy: { createdAt: 'asc' } });
}

export async function getPlayer(id: string): Promise<PlayerGetDto> {
    return await prisma.player.findUniqueOrThrow({ where: { id } });
}

export async function createPlayer(data: PlayerCreateDto): Promise<PlayerGetDto> {
    return await prisma.player.create({ data });
}

export async function updatePlayer(id: string, data: PlayerUpdateDto): Promise<PlayerGetDto> {
    return await prisma.player.update({ where: { id }, data });
}

export async function deletePlayer(id: string): Promise<void> {
    await prisma.player.delete({ where: { id } });
}
