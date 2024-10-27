import { z } from 'zod';

import { PlayerGetDtoSchema } from './player';

export const PlayerGoalStatsSchema = z.object({
    id: z.string(),
    player: PlayerGetDtoSchema,
    goals: z.number(),
    games: z.number(),
    goalsPerGame: z.number(),
});
export type PlayerGoalStats = z.infer<typeof PlayerGoalStatsSchema>;

export const PlayerPhotosStatsSchema = z.object({
    id: z.string(),
    player: PlayerGetDtoSchema,
    photos: z.number(),
});
export type PlayerPhotosStats = z.infer<typeof PlayerPhotosStatsSchema>;

export const GoalkeeperStatsSchema = z.object({
    id: z.string(),
    goalkeeper: PlayerGetDtoSchema,
    games: z.number(),
    timeInGoal: z.number(),
    receivedGoals: z.number(),
    receivedGoalsPerGame: z.number(),
    receivedGoalsPerSecond: z.number(),
});
export type GoalkeeperStats = z.infer<typeof GoalkeeperStatsSchema>;

export const TournamentStatsSchema = z.object({
    playerGoals: z.array(PlayerGoalStatsSchema),
    playerPhotos: z.array(PlayerPhotosStatsSchema),
    goalkeeper: z.array(GoalkeeperStatsSchema),
});
export type TournamentStats = z.infer<typeof TournamentStatsSchema>;
