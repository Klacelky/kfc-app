import { z } from 'zod';
import { BaseDtoSchema } from './base';

const PlayerBaseDtoSchema = z.object({
    name: z.string(),
    description: z.string(),
});

export const PlayerGetDtoSchema = BaseDtoSchema.merge(PlayerBaseDtoSchema).extend({
    photo: z.string().nullable(),
});
export type PlayerGetDto = z.infer<typeof PlayerGetDtoSchema>;

export const PlayerCreateDtoSchema = z
    .object({})
    .merge(PlayerBaseDtoSchema)
    .extend({ description: PlayerBaseDtoSchema.shape.description.optional() });
export type PlayerCreateDto = z.infer<typeof PlayerCreateDtoSchema>;

export const PlayerUpdateDtoSchema = z
    .object({})
    .merge(PlayerBaseDtoSchema)
    .extend({ description: PlayerBaseDtoSchema.shape.description.optional() });
export type PlayerUpdateDto = z.infer<typeof PlayerUpdateDtoSchema>;
