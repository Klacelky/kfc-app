import { z } from 'zod';

export const AuthLoginDtoSchema = z.object({
    username: z.string(),
    password: z.string(),
});
export type AuthLoginDto = z.infer<typeof AuthLoginDtoSchema>;

export const AuthAdminSchema = z.object({
    username: z.string(),
    su: z.boolean(),
});
export type AuthAdmin = z.infer<typeof AuthAdminSchema>;
