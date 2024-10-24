import { z } from 'zod';
import { BaseDtoSchema, slug } from './base';

export const StatsPublishedSchema = z.enum(['NOW', 'AFTER', 'NEVER']);
export type StatsPublishedEnum = z.infer<typeof StatsPublishedSchema>;

const TournamentBaseDtoSchema = z.object({
    name: z.string(),
    slug: slug(),
    startDate: z.coerce.date(),
    endDate: z.coerce.date(),
    description: z.string(),
    publishedAt: z.coerce.date().nullable(),
    statsPublished: StatsPublishedSchema,
});

export const TournamentGetDtoSchema = BaseDtoSchema.merge(TournamentBaseDtoSchema);
export type TournamentGetDto = z.infer<typeof TournamentGetDtoSchema>;

export const TournamentCreateDtoSchema = z.object({}).merge(TournamentBaseDtoSchema);
export type TournamentCreateDto = z.infer<typeof TournamentCreateDtoSchema>;

export const TournamentUpdateDtoSchema = z.object({}).merge(TournamentBaseDtoSchema);
export type TournamentUpdateDto = z.infer<typeof TournamentUpdateDtoSchema>;
