import { z } from 'zod';

import { BaseDtoSchema } from './base';
import { PlayerGetDtoSchema } from './player';

const TeamBaseDtoSchema = z.object({
    name: z.string().min(1, { message: 'Required' }),
    abbrev: z
        .string()
        .length(3)
        .refine((abbrev) => abbrev === abbrev.toUpperCase(), {
            message: 'Abbreviation must use upper case letters only',
        }),
    description: z.string(),
});

export const TeamQueryDtoSchema = z.object({
    search: z.string().optional(),
});
export type TeamQueryDto = z.infer<typeof TeamQueryDtoSchema>;

export const TeamGetDtoSchema = BaseDtoSchema.merge(TeamBaseDtoSchema).extend({
    players: z.array(PlayerGetDtoSchema),
});
export type TeamGetDto = z.infer<typeof TeamGetDtoSchema>;

export const TeamCreateDtoSchema = TeamBaseDtoSchema.extend({
    description: TeamBaseDtoSchema.shape.description.optional(),
    players: z
        .array(PlayerGetDtoSchema.shape.id)
        .length(2)
        .refine((items) => new Set(items).size === items.length, { message: 'Players must be unique' }),
});
export type TeamCreateDto = z.infer<typeof TeamCreateDtoSchema>;

export const TeamUpdateDtoSchema = TeamBaseDtoSchema.extend({
    description: TeamBaseDtoSchema.shape.description.optional(),
    players: z
        .array(PlayerGetDtoSchema.shape.id)
        .length(2)
        .refine((items) => new Set(items).size === items.length, { message: 'Players must be unique' }),
});
export type TeamUpdateDto = z.infer<typeof TeamUpdateDtoSchema>;
