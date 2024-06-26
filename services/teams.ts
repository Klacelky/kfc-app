import { TeamCreateDto, TeamGetDto, TeamQueryDto, TeamUpdateDto } from '@/dtos/team';
import prisma from '@/utils/server/db';

export async function listTeams(tournamentId: string, { search }: TeamQueryDto): Promise<TeamGetDto[]> {
    return await prisma.team.findMany({
        where: {
            AND: [
                { tournamentId },
                {
                    OR: [
                        { name: search ? { contains: search, mode: 'insensitive' } : undefined },
                        { abbrev: search ? { contains: search.toUpperCase() } : undefined },
                    ],
                },
            ],
        },
        include: { players: true },
        orderBy: [{ name: 'asc' }, { abbrev: 'asc' }],
    });
}

export async function getTeam(tournamentId: string, idOrAbbrev: string): Promise<TeamGetDto> {
    return await prisma.team.findFirstOrThrow({
        where: { OR: [{ id: idOrAbbrev }, { abbrev: idOrAbbrev, tournamentId }] },
        include: { players: true },
    });
}

export async function createTeam(tournamentId: string, { players, ...data }: TeamCreateDto): Promise<TeamGetDto> {
    return await prisma.team.create({
        data: {
            ...data,
            tournament: { connect: { id: tournamentId } },
            players: { connect: players.map((id) => ({ id })) },
        },
        include: { players: true },
    });
}

export async function updateTeam(id: string, { players, ...data }: TeamUpdateDto): Promise<TeamGetDto> {
    return await prisma.team.update({
        where: { id },
        data: {
            ...data,
            players: { set: players.map((id) => ({ id })) },
        },
        include: { players: true },
    });
}

export async function deleteTeam(id: string): Promise<void> {
    await prisma.team.delete({ where: { id } });
}
