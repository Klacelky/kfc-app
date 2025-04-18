import { TournamentCreateDto, TournamentGetDto, TournamentUpdateDto } from '@/dtos/tournament';
import prisma from '@/utils/server/db';

export async function listTournaments(): Promise<TournamentGetDto[]> {
    return await prisma.tournament.findMany({ orderBy: { startDate: 'desc' } });
}

export async function getTournament(idOrSlug: string): Promise<TournamentGetDto> {
    return await prisma.tournament.findFirstOrThrow({
        where: { OR: [{ id: idOrSlug }, { slug: idOrSlug }] },
        orderBy: { startDate: 'desc' },
    });
}

export async function getLatestTournament(): Promise<TournamentGetDto> {
    return await prisma.tournament.findFirstOrThrow({
        where: { OR: [{ publishedAt: null }, { publishedAt: { lte: new Date() } }] },
        orderBy: { startDate: 'desc' },
    });
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
