import { Group, GroupTeam, Player, Team } from '@prisma/client';

import { GroupCreateDto, GroupDetailedGetDto, GroupGetDto, GroupResultsSetDto, GroupUpdateDto } from '@/dtos/group';
import prisma from '@/utils/server/db';

type GroupTeamWithTeamAndPlayers = GroupTeam & { team: Team & { players: Player[] } };

const includeDetails = { teams: { include: { team: { include: { players: true } } } } };

function mapGroupTeams({ teams, ...groupRest }: Group & { teams: GroupTeamWithTeamAndPlayers[] }): GroupDetailedGetDto {
    return {
        ...groupRest,
        teams: teams.map(({ team, standing }) => ({
            ...team,
            points: 0, // TODO: calculate points for matches
            standing,
        })),
    };
}

export async function listGroups(tournamentId: string): Promise<GroupDetailedGetDto[]> {
    return (
        await prisma.group.findMany({
            where: { tournamentId },
            include: includeDetails,
            orderBy: { name: 'asc' },
        })
    ).map(mapGroupTeams);
}

export async function getGroup(tournamentId: string, idOrSlug: string): Promise<GroupDetailedGetDto> {
    return mapGroupTeams(
        await prisma.group.findFirstOrThrow({
            where: { OR: [{ id: idOrSlug }, { slug: idOrSlug, tournamentId }] },
            include: includeDetails,
        }),
    );
}

export async function createGroup(tournamentId: string, data: GroupCreateDto): Promise<GroupGetDto> {
    return await prisma.group.create({ data: { ...data, tournamentId } });
}

export async function updateGroup(id: string, data: GroupUpdateDto): Promise<GroupGetDto> {
    return await prisma.group.update({ where: { id }, data });
}

export async function groupAddTeam(id: string, teamId: string): Promise<GroupDetailedGetDto> {
    return mapGroupTeams(
        await prisma.group.update({
            where: { id },
            data: { teams: { create: { teamId } } },
            include: includeDetails,
        }),
    );
}

export async function groupRemoveTeam(id: string, teamId: string): Promise<GroupDetailedGetDto> {
    return mapGroupTeams(
        await prisma.group.update({
            where: { id },
            data: { teams: { delete: { teamId } } },
            include: includeDetails,
        }),
    );
}

export async function groupSetResults(
    id: string,
    { updateSuccessiveMatches, results }: GroupResultsSetDto,
): Promise<GroupDetailedGetDto> {
    return prisma.$transaction(async (tx) => {
        const groupDetails = await tx.group.update({
            where: { id },
            data: {
                teams: {
                    updateMany: results.map(({ teamId, standing }) => ({ where: { teamId }, data: { standing } })),
                },
            },
            include: { ...includeDetails /* TODO: Include successive matches */ },
        });
        if (updateSuccessiveMatches) {
            // TODO: update successive matches
        }
        return mapGroupTeams(groupDetails);
    });
}

export async function deleteGroup(id: string): Promise<void> {
    await prisma.group.delete({ where: { id } });
}
