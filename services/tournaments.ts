import { TournamentCreateDto, TournamentGetDto, TournamentUpdateDto } from '@/dtos/tournament';
import prisma from '@/utils/db';

export async function listTournaments(): Promise<TournamentGetDto[]> {
    return await prisma.tournament.findMany({ orderBy: { createdAt: 'asc' } });
}

export async function getTournament(idOrSlug: string): Promise<TournamentGetDto> {
    return await prisma.tournament.findFirstOrThrow({ where: { OR: [{ id: idOrSlug }, { slug: idOrSlug }] } });
}

export async function createTournament(data: TournamentCreateDto): Promise<TournamentGetDto> {
    return await prisma.tournament.create({ data });
}

export async function updateTournament(id: string, data: TournamentUpdateDto): Promise<TournamentGetDto> {
    return await prisma.tournament.update({ where: { id }, data });
}

export async function deleteTournament(id: string): Promise<void> {
    await prisma.tournament.delete({ where: { id: id } });
}
