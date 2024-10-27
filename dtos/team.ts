import { z } from 'zod';

import { BaseDtoSchema } from './base';
import { PlayerGetDtoSchema } from './player';

const TeamBaseDtoSchema = z.object({
    name: z.string(),
    abbrev: z.string(),
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
    players: z.array(PlayerGetDtoSchema.shape.id),
});
export type TeamCreateDto = z.infer<typeof TeamCreateDtoSchema>;

export const TeamUpdateDtoSchema = TeamBaseDtoSchema.extend({
    description: TeamBaseDtoSchema.shape.description.optional(),
    players: z.array(PlayerGetDtoSchema.shape.id),
});
export type TeamUpdateDto = z.infer<typeof TeamUpdateDtoSchema>;
