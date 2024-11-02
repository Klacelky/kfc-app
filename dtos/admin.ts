import { z } from 'zod';

import { BaseDtoSchema } from './base';

export const AdminGetDtoSchema = BaseDtoSchema.extend({
    username: z.string().min(1, { message: 'Required' }),
    su: z.boolean(),
});
export type AdminGetDto = z.infer<typeof AdminGetDtoSchema>;

export const AdminCreateDtoSchema = z
    .object({
        username: z.string().min(1, { message: 'Required' }),
        password: z.string().min(8),
        passwordRepeat: z.string(),
        su: z.boolean(),
    })
    .refine(
        ({ password, passwordRepeat }) => password === passwordRepeat,
        'Password and Password repeat must be equal!',
    );
export type AdminCreateDto = z.infer<typeof AdminCreateDtoSchema>;

export const AdminUpdateDtoSchema = z
    .object({
        username: z.string().min(1, { message: 'Required' }),
        password: z.string().min(8),
        passwordRepeat: z.string(),
    })
    .refine(
        ({ password, passwordRepeat }) => password === passwordRepeat,
        'Password and Password repeat must be equal!',
    );
export type AdminUpdateDto = z.infer<typeof AdminUpdateDtoSchema>;
