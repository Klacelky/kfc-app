import { z } from 'zod';
import { BaseDtoSchema } from './base';
import { TeamGetDtoSchema } from './team';
import { PlayerGetDtoSchema } from './player';
import { GroupGetDtoSchema } from './group';

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

export const TeamSourceGetDtoSchema = z.object({
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
});
export type TeamSourceGetDto = z.infer<typeof TeamSourceGetDtoSchema>;

export const MatchGameGetDtoSchema = BaseDtoSchema.extend({
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
});
export type MatchGameGetDto = z.infer<typeof MatchGameGetDtoSchema>;

export const MatchDetailedGetDtoSchema = MatchGetDtoSchema.extend({
    homeTeam: TeamGetDtoSchema.nullable(),
    visitingTeam: TeamGetDtoSchema.nullable(),
    games: z.array(MatchGameGetDtoSchema),
    homeTeamSource: TeamSourceGetDtoSchema.nullable(),
    visitingTeamSource: TeamSourceGetDtoSchema.nullable(),
    score: z.tuple([z.number(), z.number()]),
    winner: TeamGetDtoSchema.nullable(),
});
export type MatchDetailedGetDto = z.infer<typeof MatchDetailedGetDtoSchema>;

export const TeamSourceCreateDtoSchema = z
    .object({
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
    );
export type TeamSourceCreateDto = z.infer<typeof TeamSourceCreateDtoSchema>;

export const MatchCreateDtoSchema = z.object({
    name: z.string().nullable().optional(),
    expectedStart: z.coerce.date().nullable().optional(),
    playoffLayer: z.coerce.number().nullable().optional(),
    homeTeamId: TeamGetDtoSchema.shape.id.nullable().optional(),
    visitingTeamId: TeamGetDtoSchema.shape.id.nullable().optional(),
    homeTeamSource: TeamSourceCreateDtoSchema.nullable().optional(),
    visitingTeamSource: TeamSourceCreateDtoSchema.nullable().optional(),
});
export type MatchCreateDto = z.infer<typeof MatchCreateDtoSchema>;

export const MatchUpdateDtoSchema = z.object({
    name: z.string().nullable().optional(),
    expectedStart: z.coerce.date().nullable().optional(),
    playoffLayer: z.coerce.number().nullable().optional(),
    homeTeamId: TeamGetDtoSchema.shape.id.nullable().optional(),
    visitingTeamId: TeamGetDtoSchema.shape.id.nullable().optional(),
    homeTeamSource: TeamSourceCreateDtoSchema.nullable().optional(),
    visitingTeamSource: TeamSourceCreateDtoSchema.nullable().optional(),
    updateSuccessiveMatches: z.coerce.boolean().optional(),
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
    finishedAt: z.coerce.date().nullable().optional(),
    homeTeamColor: TeamColorSchema.optional(),
});
export type MatchGameUpdateDto = z.infer<typeof MatchGameUpdateDtoSchema>;

export const GoalCreateDtoSchema = z.object({
    timestamp: z.coerce.date().optional(),
    own: z.boolean(),
    photo: z.boolean(),
    out: z.boolean(),
    playerId: PlayerGetDtoSchema.shape.id,
    notifyLive: z.boolean().optional(),
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
    playoff: z.coerce.boolean().optional(),
    teamId: TeamGetDtoSchema.shape.id.optional(),
});
export type MatchQueryDto = z.infer<typeof MatchQueryDtoSchema>;

export const MatchItemCreatedDtoSchema = z.object({
    id: z.string().uuid(),
})
export type MatchItemCreatedDto = z.infer<typeof MatchItemCreatedDtoSchema>;
