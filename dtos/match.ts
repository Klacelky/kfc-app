import { z } from 'zod';
import { BaseDtoSchema } from './base';
import { TeamGetDtoSchema } from './team';
import { PlayerGetDtoSchema } from './player';
import { GroupGetDtoSchema } from './group';

export const MatchTeamTypeSchema = z.enum(['HOME', 'VISITING']);
export type MatchTeamTypeEnum = z.infer<typeof MatchTeamTypeSchema>;

export const TeamColorSchema = z.enum(['BLUE', 'WHITE']);
export type TeamColorEnum = z.infer<typeof TeamColorSchema>;

export const PlayerPositionTypeSchema = z.enum(['STRIKER', 'DEFENDER']);
export type PlayerPositionTypeEnum = z.infer<typeof PlayerPositionTypeSchema>;

export const MatchGetDtoSchema = BaseDtoSchema.extend({
    name: z.string().nullable(),
    expectedStart: z.coerce.date().nullable(),
    playoffLayer: z.number().nullable(),
});
export type MatchGetDto = z.infer<typeof MatchGetDtoSchema>;

export const GameScoreSchema = z.tuple([z.tuple([z.number(), z.number()]), z.tuple([z.number(), z.number()])]);
export type GameScore = z.infer<typeof GameScoreSchema>;

export const MatchDetailedGetDtoSchema = MatchGetDtoSchema.extend({
    teams: z.array(
        TeamGetDtoSchema.extend({
            type: MatchTeamTypeSchema,
        }),
    ),
    games: z.array(
        BaseDtoSchema.extend({
            startedAt: z.coerce.date(),
            finishedAt: z.coerce.date().nullable(),
            homeTeamColor: TeamColorSchema,
            playerPositions: z.array(
                BaseDtoSchema.extend({
                    timestamp: z.coerce.date(),
                    players: z.array(
                        PlayerGetDtoSchema.extend({
                            type: PlayerPositionTypeSchema,
                        }),
                    ),
                }),
            ),
            goals: z.array(
                BaseDtoSchema.extend({
                    timestamp: z.coerce.date(),
                    own: z.boolean(),
                    photo: z.boolean(),
                    player: PlayerGetDtoSchema,
                }),
            ),
            score: GameScoreSchema,
        }),
    ),
    teamSources: z.array(
        BaseDtoSchema.extend({
            type: MatchTeamTypeSchema,
            group: z
                .object({
                    standing: z.number(),
                    sourceGroup: GroupGetDtoSchema,
                })
                .nullable(),
            match: z
                .object({
                    winner: z.boolean(),
                    sourceMatch: MatchGetDtoSchema,
                })
                .nullable(),
        }),
    ),
    score: z.tuple([z.number(), z.number()]),
    winner: TeamGetDtoSchema.optional(),
});
export type MatchDetailedGetDto = z.infer<typeof MatchDetailedGetDtoSchema>;

export const MatchCreateDtoSchema = z.object({
    name: z.string().nullable().optional(),
    expectedStart: z.coerce.date().nullable().optional(),
    playoffLayer: z.number().nullable().optional(),
    teams: z
        .array(
            z.object({
                type: MatchTeamTypeSchema,
                teamId: TeamGetDtoSchema.shape.id,
            }),
        )
        .max(2),
    teamSources: z.array(
        z
            .object({
                type: MatchTeamTypeSchema,
                group: z
                    .object({
                        standing: z.number(),
                        sourceGroupId: GroupGetDtoSchema.shape.id,
                    })
                    .optional(),
                match: z
                    .object({
                        winner: z.boolean(),
                        sourceMatchId: MatchGetDtoSchema.shape.id,
                    })
                    .optional(),
            })
            .refine(
                ({ group, match }) => (group === undefined) != (match === undefined),
                'One and only one of group or match has to be defined',
            ),
    ),
});
export type MatchCreateDto = z.infer<typeof MatchCreateDtoSchema>;

export const MatchUpdateDtoSchema = z.object({
    name: z.string().nullable().optional(),
    expectedStart: z.coerce.date().nullable().optional(),
    playoffLayer: z.number().nullable().optional(),
    teams: z
        .array(
            z.object({
                type: MatchTeamTypeSchema,
                teamId: TeamGetDtoSchema.shape.id,
            }),
        )
        .max(2)
        .optional(),
    teamSources: z
        .array(
            z
                .object({
                    type: MatchTeamTypeSchema,
                    group: z
                        .object({
                            standing: z.number(),
                            sourceGroupId: GroupGetDtoSchema.shape.id,
                        })
                        .nullable(),
                    match: z
                        .object({
                            winner: z.boolean(),
                            sourceMatchId: MatchGetDtoSchema.shape.id,
                        })
                        .nullable(),
                })
                .refine(
                    ({ group, match }) => (group === undefined) != (match === undefined),
                    'One and only one of group or match has to be defined',
                ),
        )
        .max(2)
        .optional(),
    updateSuccessiveMatches: z.boolean().optional(),
});
export type MatchUpdateDto = z.infer<typeof MatchUpdateDtoSchema>;

export const MatchGameCreateDtoSchema = z.object({
    startedAt: z.coerce.date().optional(),
    finishedAt: z.coerce.date().optional(),
    homeTeamColor: TeamColorSchema,
});
export type MatchGameCreateDto = z.infer<typeof MatchGameCreateDtoSchema>;

export const MatchGameUpdateDtoSchema = z.object({
    startedAt: z.coerce.date().optional(),
    finishedAt: z.coerce.date().optional(),
    homeTeamColor: TeamColorSchema.optional(),
});
export type MatchGameUpdateDto = z.infer<typeof MatchGameUpdateDtoSchema>;

export const GoalCreateDtoSchema = z.object({
    timestmap: z.coerce.date().optional(),
    own: z.boolean(),
    photo: z.boolean(),
    out: z.boolean(),
    playerId: PlayerGetDtoSchema.shape.id,
});
export type GoalCreateDto = z.infer<typeof GoalCreateDtoSchema>;

export const PlayerPositionsCreateDtoSchema = z.object({
    timestmap: z.coerce.date().optional(),
    players: z.array(
        z.object({
            type: PlayerPositionTypeSchema,
            playerId: PlayerGetDtoSchema.shape.id,
        }),
    ),
});
export type PlayerPositionsCreateDto = z.infer<typeof PlayerPositionsCreateDtoSchema>;

export const GameFinishDtoSchema = z.object({});

export const MatchQueryDtoSchema = z.object({
    groupId: GroupGetDtoSchema.shape.id.optional(),
    playoff: z.boolean().optional(),
    teamId: TeamGetDtoSchema.shape.id.optional(),
    teamType: MatchTeamTypeSchema.optional(),
});
export type MatchQueryDto = z.infer<typeof MatchQueryDtoSchema>;
