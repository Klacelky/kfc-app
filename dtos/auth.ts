import { z } from 'zod';

export const AuthLoginDtoSchema = z.object({
    username: z.string().min(1, { message: 'Required' }),
    password: z.string().min(1, { message: 'Required' }),
});
export type AuthLoginDto = z.infer<typeof AuthLoginDtoSchema>;

export const AuthAdminSchema = z.object({
    username: z.string().min(1),
    su: z.boolean(),
});
export type AuthAdmin = z.infer<typeof AuthAdminSchema>;
