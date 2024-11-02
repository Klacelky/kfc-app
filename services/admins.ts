import argon2 from 'argon2';

import { AdminCreateDto, AdminGetDto, AdminGetDtoSchema, AdminUpdateDto } from '@/dtos/admin';
import prisma from '@/utils/server/db';

export async function listAdmins(): Promise<AdminGetDto[]> {
    return await prisma.adminUser.findMany({ orderBy: { username: 'asc' } });
}

export async function getAdmin(id: string): Promise<AdminGetDto> {
    return await prisma.adminUser.findUniqueOrThrow({ where: { id } });
}

export async function createAdmin({ password, username }: AdminCreateDto): Promise<AdminGetDto> {
    return await AdminGetDtoSchema.parseAsync(
        await prisma.adminUser.create({
            data: {
                username,
                password: await argon2.hash(password),
                su: false,
            },
        }),
    );
}

export async function updateAdmin(id: string, { username, password }: AdminUpdateDto): Promise<AdminGetDto> {
    return await AdminGetDtoSchema.parseAsync(
        await prisma.adminUser.update({
            where: { id },
            data: {
                username,
                password: await argon2.hash(password),
            },
        }),
    );
}

export async function deleteAdmin(id: string): Promise<void> {
    await prisma.adminUser.delete({ where: { id, su: false } });
}
