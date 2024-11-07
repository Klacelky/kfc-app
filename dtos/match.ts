import { z } from 'zod';

import { BaseDtoSchema } from './base';
import { GroupGetDtoSchema } from './group';
import { PlayerGetDtoSchema } from './player';
import { TeamGetDtoSchema } from './team';

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

export const TeamGameScoreSchema = z.object({
    score: z.number(),
    out: z.number(),
});
export type TeamGameScore = z.infer<typeof TeamGameScoreSchema>;

export const GameScoreSchema = z.object({
    home: TeamGameScoreSchema,
    visiting: TeamGameScoreSchema,
});
export type GameScore = z.infer<typeof GameScoreSchema>;

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
            team: TeamGetDtoSchema,
            player: PlayerGetDtoSchema.nullable(),
        }),
    ),
    score: GameScoreSchema,
});
export type MatchGameGetDto = z.infer<typeof MatchGameGetDtoSchema>;

export const TeamSourceGetDtoSchema = z
    .object({
        type: z.literal('group'),
        standing: z.number(),
        sourceGroup: GroupGetDtoSchema,
    })
    .or(
        z.object({
            type: z.literal('match'),
            winner: z.boolean(),
            sourceMatch: MatchGetDtoSchema,
        }),
    );
export type TeamSourceGetDto = z.infer<typeof TeamSourceGetDtoSchema>;

export const MatchDetailedGetDtoSchema = MatchGetDtoSchema.extend({
    home: z.object({
        team: TeamGetDtoSchema.nullable(),
        source: TeamSourceGetDtoSchema.nullable(),
    }),
    visiting: z.object({
        team: TeamGetDtoSchema.nullable(),
        source: TeamSourceGetDtoSchema.nullable(),
    }),
    games: z.array(MatchGameGetDtoSchema),
    score: z.tuple([z.number(), z.number()]),
    winner: TeamGetDtoSchema.nullable(),
});
export type MatchDetailedGetDto = z.infer<typeof MatchDetailedGetDtoSchema>;

export const TeamSourceCreateDtoSchema = z
    .object({ type: z.null() })
    .or(
        z.object({
            type: z.literal('group'),
            standing: z.number(),
            sourceGroupId: GroupGetDtoSchema.shape.id,
        }),
    )
    .or(
        z.object({
            type: z.literal('match'),
            winner: z.boolean(),
            sourceMatchId: MatchGetDtoSchema.shape.id,
        }),
    );
export type TeamSourceCreateDto = z.infer<typeof TeamSourceCreateDtoSchema>;

export const MatchCreateDtoSchema = z.object({
    name: z.string().nullable().optional(),
    expectedStart: z.coerce.date().nullable().optional(),
    playoffLayer: z.coerce.number().nullable().optional(),
    home: z
        .object({
            teamId: TeamGetDtoSchema.shape.id.nullable().optional(),
            source: TeamSourceCreateDtoSchema.nullable().optional(),
        })
        .optional(),
    visiting: z
        .object({
            teamId: TeamGetDtoSchema.shape.id.nullable().optional(),
            source: TeamSourceCreateDtoSchema.nullable().optional(),
        })
        .optional(),
});
export type MatchCreateDto = z.infer<typeof MatchCreateDtoSchema>;

export const MatchUpdateDtoSchema = z.object({
    name: z.string().nullable().optional(),
    expectedStart: z.coerce.date().nullable().optional(),
    playoffLayer: z.coerce.number().nullable().optional(),
    home: z
        .object({
            teamId: TeamGetDtoSchema.shape.id.nullable().optional(),
            source: TeamSourceCreateDtoSchema.nullable().optional(),
        })
        .optional(),
    visiting: z
        .object({
            teamId: TeamGetDtoSchema.shape.id.nullable().optional(),
            source: TeamSourceCreateDtoSchema.nullable().optional(),
        })
        .optional(),
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
    teamId: TeamGetDtoSchema.shape.id,
    playerId: PlayerGetDtoSchema.shape.id.optional(),
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

export const MatchFinishDtoSchema = z.object({
    updateSuccessiveMatches: z.coerce.boolean(),
});
export type MatchFinishDto = z.infer<typeof MatchFinishDtoSchema>;

export const MatchQueryDtoSchema = z.object({
    groupId: GroupGetDtoSchema.shape.id.optional(),
    playoff: z.coerce.boolean().optional(),
    teamId: TeamGetDtoSchema.shape.id.optional(),
});
export type MatchQueryDto = z.infer<typeof MatchQueryDtoSchema>;

export const MatchItemCreatedDtoSchema = z.object({
    id: z.string().uuid(),
});
export type MatchItemCreatedDto = z.infer<typeof MatchItemCreatedDtoSchema>;

export const ScoreDataSchema = z.object({
    home_team: z.string(),
    home_team_name: z.string(),
    home_team_player_names: z.array(z.string()),
    visiting_team: z.string(),
    visiting_team_name: z.string(),
    visiting_team_player_names: z.array(z.string()),
    home_score: z.number(),
    home_games: z.number(),
    visiting_score: z.number(),
    visiting_games: z.number(),
    home_team_color: TeamColorSchema,
    msg_type: z.literal('score'),
});
export type ScoreData = z.infer<typeof ScoreDataSchema>;
