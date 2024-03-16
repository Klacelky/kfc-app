import { z } from 'zod';

export const BaseDtoSchema = z.object({
    id: z.string().uuid(),
    createdAt: z.coerce.date(),
    updatedAt: z.coerce.date(),
});
export type BaseGetDto = z.infer<typeof BaseDtoSchema>;

export function slug() {
    return z
        .string()
        .regex(/^[a-z0-9_-]{3,32}/, 'Slug must be 3 to 32 lowercase letters, numbers, underscore or hyphen');
}
