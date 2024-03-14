import { z } from 'zod';
import { BaseDtoSchema } from './base';

export const StatsPublishedSchema = z.enum(['NOW', 'AFTER', 'NEVER']);
export type StatsPublished = z.infer<typeof StatsPublishedSchema>;

const TournamentBaseDtoSchema = z.object({
    name: z.string(),
    slug: z.string().regex(/^[a-z0-9_-]{3,32}/),
    startDate: z.coerce.date(),
    endDate: z.coerce.date(),
    description: z.string(),
    statsPublished: StatsPublishedSchema,
});

export const TournamentGetDtoSchema = BaseDtoSchema.merge(TournamentBaseDtoSchema);
export type TournamentGetDto = z.infer<typeof TournamentGetDtoSchema>;

export const TournamentCreateDtoSchema = z.object({}).merge(TournamentBaseDtoSchema);
export type TournamentCreateDto = z.infer<typeof TournamentCreateDtoSchema>;

export const TournamentUpdateDtoSchema = z.object({}).merge(TournamentBaseDtoSchema);
export type TournamentUpdateDto = z.infer<typeof TournamentUpdateDtoSchema>;
