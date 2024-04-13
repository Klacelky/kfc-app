'use client';

import { PageParams } from '@/utils/server/pages';
import { RouteParams as ParentRouteParams } from '../page';
import { api, getErrorMessage, loadingButton, oppositeColor, useSWRSchema } from '@/utils/client/api';
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
import Alert from '@/components/admin/Alert';
import Loading from '@/components/Loading';
import { useMemo, useState } from 'react';
import classNames from 'classnames';
import { TeamGetDto } from '@/dtos/team';
import Button from '@/components/admin/Button';
import { PlayerGetDto } from '@/dtos/player';
import { ArrowsRightLeftIcon, ArrowsUpDownIcon } from '@heroicons/react/16/solid';
import { useForm } from 'react-hook-form';
import { Checkbox, Input } from '@/components/admin/Input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';

export interface RouteParams extends ParentRouteParams {}

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
        homeTeamId: string,
    game: MatchGameGetDto;
    left: ColoredTeam;
    right: ColoredTeam;
    exchangeTeams: () => Promise<void>;
}) {
    const [loading, setLoading] = useState(false);
    const [leftScoreIndex, rightScoreIndex] = left.team.id === homeTeamId ? [0, 1] : [1, 0];
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
                    {game.score[leftScoreIndex][0]}({game.score[leftScoreIndex][1]})
                </span>
                :
                <span>
                    {game.score[rightScoreIndex][0]}({game.score[rightScoreIndex][1]})
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
    team: { players },
    players: { defender, striker },
    reverse,
    goalTrigger,
    playerSwitchTrigger,
}: {
    game: MatchGameGetDto;
    team: TeamGetDto;
    players: PositionedPlayers;
    reverse?: boolean;
    goalTrigger: (player: PlayerGetDto) => void;
    playerSwitchTrigger: (players: PositionedPlayers) => Promise<void>;
}) {
    const [switchLoading, setSwitchLoading] = useState(false);
    if ((!defender || !striker) && players.length !== 2) {
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
                        const [defender, striker] = players;
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
                <Button color="primary" className="w-28 h-28 font-bold" onClick={() => goalTrigger(defender)}>
                    {defender.name}
                </Button>
                <span className="text-lg">{game.goals.filter(({ player: { id } }) => id === defender.id).length}</span>
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
                <Button color="primary" className="w-28 h-28 font-bold" onClick={() => goalTrigger(striker)}>
                    {striker.name}
                </Button>
                <span className="text-lg">{game.goals.filter(({ player: { id } }) => id === striker.id).length}</span>
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
    goalTrigger: (player: PlayerGetDto) => void;
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
        <div className="flex flex-row flex-grow gap-4">
            <PlayerPositions
                game={game}
                team={leftTeam}
                players={leftPlayers}
                playerSwitchTrigger={playerSwitchTrigger}
                goalTrigger={goalTrigger}
            />
            <div className="flex flex-grow items-center justify-center">
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
    player,
    submit,
    cancel,
}: {
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
            playerId: player.id,
            timestamp: undefined,
        },
    });
    console.log(isSubmitting);

    return (
        <form onSubmit={handleSubmit(submit)}>
            <div className="flex flex-col gap-4">
                <div>{player.name}</div>
                {errors.root?.message && <Alert>{errors.root.message}</Alert>}
                <Input
                    {...register('timestamp', { setValueAs: (v) => v || undefined })}
                    type="datetime-local"
                    label="Timestamp"
                    error={errors.timestamp?.message}
                />
                <Checkbox {...register('photo')} label="Photo" error={errors.photo?.message} />
                <Checkbox {...register('own')} label="Own" error={errors.own?.message} />
                <Checkbox {...register('out')} label="Out" error={errors.out?.message} />
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
}

export default function MatchGameRefPage({ params: { tournamentId, matchId, gameId } }: PageParams<RouteParams>) {
    const prefix = `/api/tournament/${tournamentId}/match/${matchId}`;
    const { data, error, isLoading, mutate } = useSWRSchema(prefix, MatchDetailedGetDtoSchema);
    const game = useMemo(() => data?.games.find(({ id }) => id === gameId), [data, gameId]);
    const { push } = useRouter();

    const [reverse, setReverse] = useState(false);
    const [left, right] = useMemo((): (ColoredTeam | undefined)[] => {
        if (!data?.homeTeam || !data?.visitingTeam || !game) {
            return [undefined, undefined];
        }
        const teams = [
            { team: data.homeTeam, color: game.homeTeamColor },
            { team: data.visitingTeam, color: oppositeColor(game.homeTeamColor) },
        ];
        return reverse ? teams.reverse() : teams;
    }, [data?.homeTeam, data?.visitingTeam, game, reverse]);

    const [actionLog, setActionLog] = useState<ActionLogItem[]>([]);
    const [undoLoading, setUndoLoading] = useState(false);

    const [pendingGoal, setPendingGoal] = useState<PlayerGetDto | undefined>();
    if (error) {
        return <Alert>{getErrorMessage(error)}</Alert>;
    }
    if (isLoading) {
        return <Loading />;
    }
    if (!game) {
        return <Alert>Game not found</Alert>;
    }
    if (!left || !right || !data?.homeTeam) {
        return <Alert>No Teams</Alert>;
    }

    if (pendingGoal) {
        return (
            <PendingGoalModal
                player={pendingGoal}
                submit={async (data) => {
                    try {
                        const response = await api.post<MatchItemCreatedDto>(`${prefix}/game/${gameId}/goal`, data);
                        mutate();
                        setActionLog([{ type: 'goal', id: response.data.id }, ...actionLog]);
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
                homeTeamId={data.homeTeam.id}
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
                        const response = await api.post<MatchItemCreatedDto>(
                            `${prefix}/game/${gameId}/playerPositions`,
                            {
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
                            } as PlayerPositionsCreateDto,
                        );
                        mutate();
                        setActionLog([{ type: 'playerPositions', id: response.data.id }, ...actionLog]);
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
                            const [{ type: lastAction, id }, ...actions] = actionLog;
                            await api.delete(`${prefix}/game/${gameId}/${lastAction}/${id}`);
                            setActionLog(actions);
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
