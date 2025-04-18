'use client';

import { ArrowsRightLeftIcon, ArrowsUpDownIcon } from '@heroicons/react/16/solid';
import { zodResolver } from '@hookform/resolvers/zod';
import classNames from 'classnames';
import { useParams, useRouter } from 'next/navigation';
import { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';

import { RouteParams as ParentRouteParams } from '../page';

import Alert from '@/components/Alert';
import Loading from '@/components/Loading';
import Button from '@/components/admin/Button';
import { Checkbox, Input } from '@/components/admin/Input';
import {
    GoalCreateDto,
    GoalCreateDtoSchema,
    MatchDetailedGetDtoSchema,
    MatchGameGetDto,
    MatchGameUpdateDto,
    MatchItemCreatedDto,
    PlayerPositionsCreateDto,
    TeamColorEnum,
} from '@/dtos/match';
import { PlayerGetDto } from '@/dtos/player';
import { TeamGetDto } from '@/dtos/team';
import { api, getErrorMessage, loadingButton, oppositeColor, useSWRSchema } from '@/utils/client/api';
import { registerOptions } from '@/utils/client/forms';

export type RouteParams = ParentRouteParams;

interface ColoredTeam {
    color: TeamColorEnum;
    team: TeamGetDto;
}

function GameTeams({
    homeTeamId,
    game,
    left,
    right,
    exchangeTeams,
}: {
    homeTeamId: string;
    game: MatchGameGetDto;
    left: ColoredTeam;
    right: ColoredTeam;
    exchangeTeams: () => Promise<void>;
}) {
    const [loading, setLoading] = useState(false);
    const [leftScoreIndex, rightScoreIndex]: ('home' | 'visiting')[] =
        left.team.id === homeTeamId ? ['home', 'visiting'] : ['visiting', 'home'];
    return (
        <Button onClick={loadingButton(setLoading, exchangeTeams)} disabled={loading}>
            <div className="text-3xl font-bold flex flex-row justify-center items-baseline gap-2">
                <span
                    className={classNames('p-2', {
                        'bg-blue-300': left.color === 'BLUE',
                        'bg-gray-300': left.color === 'WHITE',
                    })}
                >
                    {left.team.abbrev}
                </span>
                <span>
                    {game.score[leftScoreIndex].score}({game.score[leftScoreIndex].out})
                </span>
                :
                <span>
                    {game.score[rightScoreIndex].score}({game.score[rightScoreIndex].out})
                </span>
                <span
                    className={classNames('p-2', {
                        'bg-blue-300': right.color === 'BLUE',
                        'bg-gray-300': right.color === 'WHITE',
                    })}
                >
                    {right.team.abbrev}
                </span>
            </div>
        </Button>
    );
}

interface PositionedPlayers {
    defender?: PlayerGetDto;
    striker?: PlayerGetDto;
}

function PlayerPositions({
    game,
    team,
    players: { defender, striker },
    reverse,
    goalTrigger,
    playerSwitchTrigger,
}: {
    game: MatchGameGetDto;
    team: TeamGetDto;
    players: PositionedPlayers;
    reverse?: boolean;
    goalTrigger: (pendingGoal: { team: TeamGetDto; player: PlayerGetDto }) => void;
    playerSwitchTrigger: (players: PositionedPlayers) => Promise<void>;
}) {
    const [switchLoading, setSwitchLoading] = useState(false);
    if ((!defender || !striker) && team.players.length !== 2) {
        return (
            <div>
                <Alert>Not Enough Players</Alert>
            </div>
        );
    }

    if (!defender || !striker) {
        return (
            <div className="flex flex-col items-center justify-around gap-4">
                <Button
                    color="primary"
                    className="font-bold"
                    onClick={loadingButton(setSwitchLoading, async () => {
                        const [defender, striker] = team.players;
                        await playerSwitchTrigger({ defender, striker });
                    })}
                    disabled={switchLoading}
                >
                    Initialize positions
                </Button>
            </div>
        );
    }

    return (
        <div className={classNames('flex flex-col items-center justify-around gap-4', { 'flex-col-reverse': reverse })}>
            Defender
            <div className={classNames('flex flex-row items-center gap-2', { 'flex-row-reverse': reverse })}>
                <Button
                    color="primary"
                    className="w-28 h-28 font-bold"
                    onClick={() => goalTrigger({ team, player: defender })}
                >
                    {defender.name}
                </Button>
                <span className="text-lg">
                    {game.goals.filter(({ player }) => player && player.id === defender.id).length}
                </span>
            </div>
            <Button
                color="primary"
                onClick={loadingButton(
                    setSwitchLoading,
                    async () =>
                        await playerSwitchTrigger({
                            striker: defender,
                            defender: striker,
                        }),
                )}
                disabled={switchLoading}
            >
                <ArrowsUpDownIcon className="w-8" />
            </Button>
            <div className={classNames('flex flex-row items-center gap-2', { 'flex-row-reverse': reverse })}>
                <Button
                    color="primary"
                    className="w-28 h-28 font-bold"
                    onClick={() => goalTrigger({ team, player: striker })}
                >
                    {striker.name}
                </Button>
                <span className="text-lg">
                    {game.goals.filter(({ player }) => player && player.id === striker.id).length}
                </span>
            </div>
            Striker
        </div>
    );
}

function GamePlayers({
    game,
    leftTeam,
    rightTeam,
    switchSides,
    goalTrigger,
    playerSwitchTrigger,
}: {
    game: MatchGameGetDto;
    leftTeam: TeamGetDto;
    rightTeam: TeamGetDto;
    switchSides: () => void;
    goalTrigger: (pendingGoal: { team: TeamGetDto; player: PlayerGetDto }) => void;
    playerSwitchTrigger: (players: PositionedPlayers) => Promise<void>;
}) {
    const [leftPlayers, rightPlayers] = useMemo(() => {
        function getLastPos(team: TeamGetDto): PositionedPlayers {
            const lastPos = game.playerPositions.findLast(
                ({ players }) =>
                    JSON.stringify(players.map(({ id }) => id).sort()) ===
                    JSON.stringify(team?.players.map(({ id }) => id).sort()),
            );
            if (!lastPos || lastPos.players.length !== 2) {
                return {};
            }
            return {
                striker: lastPos.players.find(({ type }) => type === 'STRIKER'),
                defender: lastPos.players.find(({ type }) => type === 'DEFENDER'),
            };
        }
        return [getLastPos(leftTeam), getLastPos(rightTeam)];
    }, [game?.playerPositions, leftTeam, rightTeam]);

    return (
        <div className="flex flex-row grow gap-4">
            <PlayerPositions
                game={game}
                team={leftTeam}
                players={leftPlayers}
                playerSwitchTrigger={playerSwitchTrigger}
                goalTrigger={goalTrigger}
            />
            <div className="flex grow items-center justify-center">
                <Button color="danger" onClick={switchSides}>
                    <ArrowsRightLeftIcon className="w-8" />
                </Button>
            </div>
            <PlayerPositions
                game={game}
                team={rightTeam}
                reverse
                players={rightPlayers}
                playerSwitchTrigger={playerSwitchTrigger}
                goalTrigger={goalTrigger}
            />
        </div>
    );
}

function PendingGoalModal({
    team,
    player,
    submit,
    cancel,
}: {
    team: TeamGetDto;
    player: PlayerGetDto;
    submit: (formData: GoalCreateDto) => Promise<void>;
    cancel: () => void;
}) {
    const {
        register,
        handleSubmit,
        formState: { errors, isValid, isSubmitting },
        reset,
    } = useForm<GoalCreateDto>({
        mode: 'all',
        resolver: zodResolver(GoalCreateDtoSchema),
        defaultValues: {
            teamId: team.id,
            playerId: player.id,
            timestamp: undefined,
        },
    });

    return (
        <form onSubmit={handleSubmit(submit)}>
            <div className="flex flex-col gap-4">
                <div>{player.name}</div>
                {errors.root?.message && <Alert>{errors.root.message}</Alert>}
                <Input
                    register={() => register('timestamp', registerOptions({ empty: 'undefined', date: true }))}
                    type="datetime-local"
                    label="Timestamp"
                    error={errors.timestamp?.message}
                />
                <Checkbox register={() => register('photo')} label="Photo" error={errors.photo?.message} />
                <Checkbox register={() => register('own')} label="Own" error={errors.own?.message} />
                <Checkbox register={() => register('out')} label="Out" error={errors.out?.message} />
                <Button type="submit" color="primary" disabled={!isValid || isSubmitting}>
                    Add Goal
                </Button>
                <Button
                    type="button"
                    color="danger"
                    onClick={() => {
                        reset();
                        cancel();
                    }}
                >
                    Cancel
                </Button>
            </div>
        </form>
    );
}

interface ActionLogItem {
    type: 'playerPositions' | 'goal';
    id: string;
    timestamp: Date;
}

export default function MatchGameRefPage() {
    const { tournamentId, matchId, gameId } = useParams<RouteParams>();
    const prefix = `/api/tournament/${tournamentId}/match/${matchId}`;
    const { data, error, isLoading, mutate } = useSWRSchema(prefix, MatchDetailedGetDtoSchema);
    const game = useMemo(() => data?.games.find(({ id }) => id === gameId), [data, gameId]);
    const { push } = useRouter();

    const [reverse, setReverse] = useState(false);
    const [left, right] = useMemo((): (ColoredTeam | undefined)[] => {
        if (!data?.home.team || !data?.visiting.team || !game) {
            return [undefined, undefined];
        }
        const teams = [
            { team: data.home.team, color: game.homeTeamColor },
            { team: data.visiting.team, color: oppositeColor(game.homeTeamColor) },
        ];
        return reverse ? teams.reverse() : teams;
    }, [data?.home.team, data?.visiting.team, game, reverse]);

    const actionLog = useMemo(() => {
        if (!game) {
            return [];
        }
        return [
            ...game.goals.map(({ id, createdAt }) => ({ type: 'goal', id, timestamp: createdAt }) as ActionLogItem),
            ...game.playerPositions.map(
                ({ id, createdAt }) => ({ type: 'playerPositions', id, timestamp: createdAt }) as ActionLogItem,
            ),
        ].sort(({ timestamp: ta }, { timestamp: tb }) => tb.getTime() - ta.getTime());
    }, [game]);
    const [undoLoading, setUndoLoading] = useState(false);

    const [pendingGoal, setPendingGoal] = useState<{ team: TeamGetDto; player: PlayerGetDto } | undefined>();
    if (error) {
        return <Alert>{getErrorMessage(error)}</Alert>;
    }
    if (isLoading) {
        return <Loading />;
    }
    if (!game) {
        return <Alert>Game not found</Alert>;
    }
    if (!left || !right || !data?.home.team) {
        return <Alert>No Teams</Alert>;
    }

    if (pendingGoal) {
        return (
            <PendingGoalModal
                team={pendingGoal.team}
                player={pendingGoal.player}
                submit={async (data) => {
                    try {
                        await api.post<MatchItemCreatedDto>(`${prefix}/game/${gameId}/goal`, data);
                        mutate();
                        setPendingGoal(undefined);
                    } catch (error) {
                        alert(getErrorMessage(error));
                    }
                }}
                cancel={() => setPendingGoal(undefined)}
            />
        );
    }

    return (
        <div className="flex flex-col h-96 gap-4">
            <GameTeams
                homeTeamId={data.home.team.id}
                game={game}
                left={left}
                right={right}
                exchangeTeams={async () => {
                    try {
                        await api.patch(`${prefix}/game/${gameId}`, {
                            homeTeamColor: oppositeColor(game.homeTeamColor),
                        });
                        mutate();
                    } catch (error) {
                        alert(getErrorMessage(error));
                    }
                }}
            />
            <GamePlayers
                leftTeam={left.team}
                rightTeam={right.team}
                game={game}
                switchSides={() => setReverse(!reverse)}
                playerSwitchTrigger={async ({ striker, defender }) => {
                    try {
                        await api.post<MatchItemCreatedDto>(`${prefix}/game/${gameId}/playerPositions`, {
                            players: [
                                {
                                    type: 'STRIKER',
                                    playerId: striker!.id,
                                },
                                {
                                    type: 'DEFENDER',
                                    playerId: defender!.id,
                                },
                            ],
                        } as PlayerPositionsCreateDto);
                        mutate();
                    } catch (error) {
                        alert(getErrorMessage(error));
                    }
                }}
                goalTrigger={setPendingGoal}
            />
            <div className="flex flex-row gap-4 justify-around">
                <Button
                    color="danger"
                    onClick={loadingButton(setUndoLoading, async () => {
                        try {
                            const [{ type: lastAction, id }, ..._] = actionLog;
                            await api.delete(`${prefix}/game/${gameId}/${lastAction}/${id}`);
                            mutate();
                        } catch (error) {
                            alert(getErrorMessage(error));
                        }
                    })}
                    disabled={actionLog.length === 0 || undoLoading}
                >
                    Undo
                </Button>
                <Button
                    color="primary"
                    onClick={loadingButton(setUndoLoading, async () => {
                        try {
                            await api.patch(`${prefix}/game/${gameId}`, {
                                finishedAt: new Date(),
                            } as MatchGameUpdateDto);
                            push('../');
                        } catch (error) {
                            alert(getErrorMessage(error));
                        }
                    })}
                    disabled={undoLoading}
                >
                    Finish Game
                </Button>
            </div>
        </div>
    );
}
