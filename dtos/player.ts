import { z } from 'zod';
import { BaseDtoSchema } from './base';

const PlayerBaseDtoSchema = z.object({
    name: z.string(),
    description: z.string(),
    photo: z.string().nullable(),
});

export const PlayerGetDtoSchema = BaseDtoSchema.merge(PlayerBaseDtoSchema);
export type PlayerGetDto = z.infer<typeof PlayerGetDtoSchema>;

export const PlayerCreateDtoSchema = z
    .object({})
    .merge(PlayerBaseDtoSchema)
    .extend({ description: PlayerBaseDtoSchema.shape.description.optional() })
    .omit({ photo: true });
export type PlayerCreateDto = z.infer<typeof PlayerCreateDtoSchema>;

export const PlayerUpdateDtoSchema = z
    .object({})
    .merge(PlayerBaseDtoSchema)
    .extend({ description: PlayerBaseDtoSchema.shape.description.optional() })
    .omit({ photo: true });
export type PlayerUpdateDto = z.infer<typeof PlayerUpdateDtoSchema>;
