import { z } from 'zod';

import { BaseDtoSchema, slug } from './base';
import { TeamGetDtoSchema } from './team';

const GroupBaseDtoSchema = z.object({
    name: z.string().min(1, {message: 'Required'}),
    slug: slug().min(1, {message: 'Required'}),
    description: z.string(),
});

export const GroupTeamGetDtoSchema = TeamGetDtoSchema.extend({
    points: z.number(),
    standing: z.number().nullable(),
});
export type GroupTeamGetDto = z.infer<typeof GroupTeamGetDtoSchema>;

export const GroupGetDtoSchema = BaseDtoSchema.merge(GroupBaseDtoSchema);
export type GroupGetDto = z.infer<typeof GroupGetDtoSchema>;

export const GroupDetailedGetDtoSchema = BaseDtoSchema.merge(GroupBaseDtoSchema).extend({
    teams: z.array(GroupTeamGetDtoSchema),
});
export type GroupDetailedGetDto = z.infer<typeof GroupDetailedGetDtoSchema>;

export const GroupCreateDtoSchema = GroupBaseDtoSchema.extend({
    description: z.string().optional(),
});
export type GroupCreateDto = z.infer<typeof GroupCreateDtoSchema>;

export const GroupUpdateDtoSchema = GroupBaseDtoSchema.extend({
    description: z.string().optional(),
});
export type GroupUpdateDto = z.infer<typeof GroupUpdateDtoSchema>;

export const GroupAddTeamDtoSchema = z.object({
    teamId: TeamGetDtoSchema.shape.id,
});
export type GroupAddTeamDto = z.infer<typeof GroupAddTeamDtoSchema>;

export const GroupResultsSetDtoSchema = z.object({
    results: z.array(
        z.object({
            teamId: TeamGetDtoSchema.shape.id,
            standing: z.number(),
        }),
    ),
    updateSuccessiveMatches: z.boolean(),
});
export type GroupResultsSetDto = z.infer<typeof GroupResultsSetDtoSchema>;
