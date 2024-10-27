import argon2 from 'argon2';
import { SignJWT, jwtVerify } from 'jose';

import { AuthAdmin, AuthLoginDto } from '@/dtos/auth';
import prisma from '@/utils/server/db';

const JWT_KEY = new TextEncoder().encode(process.env.JWT_KEY);
const JWT_EXP = process.env.JWT_EXP || '1 day';

export async function loginAdmin({ username, password }: AuthLoginDto): Promise<string | null> {
    const admin = await prisma.adminUser.findUnique({ where: { username } });
    if (!admin || !(await argon2.verify(admin.password, password))) {
        return null;
    }
    return await new SignJWT({ sub: admin.username, su: admin.su })
        .setProtectedHeader({ alg: 'HS256' })
        .setExpirationTime(JWT_EXP)
        .sign(JWT_KEY);
}

export async function verifyAdmin(jwt: string): Promise<AuthAdmin> {
    const result = await jwtVerify(jwt, JWT_KEY, { requiredClaims: ['sub'] });
    return {
        username: result.payload.sub!,
        su: result.payload.su === true,
    };
}
