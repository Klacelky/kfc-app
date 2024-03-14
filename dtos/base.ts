import { z } from 'zod';

export const BaseDtoSchema = z.object({
    id: z.string().uuid(),
    createdAt: z.coerce.date(),
    updatedAt: z.coerce.date(),
});
export type BaseGetDto = z.infer<typeof BaseDtoSchema>;
