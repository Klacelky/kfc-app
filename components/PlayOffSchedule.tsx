import { TrophyIcon } from '@heroicons/react/16/solid';
import { Fragment } from 'react';

import { MatchDetailedGetDto } from '@/dtos/match';
import TDateTime from '@/utils/client/i18n/TDateTime';

export type ScheduleProps = {
    matches: MatchDetailedGetDto[];
    hideTimes?: boolean;
};

export default function PlayOffSchedule({ matches, hideTimes }: ScheduleProps) {
    return (
        <div className="grid gap-x-4 gap-y-2 grid-cols-1 sm:grid-cols-12 max-w-5xl">
            {matches
                .sort(({ expectedStart: ta, name: na }, { expectedStart: tb, name: nb }) =>
                    ta && tb ? ta?.getTime() - tb?.getTime() : (na || '') > (nb || '') ? 1 : -1,
                )
                .map(
                    ({
                        id,
                        name,
                        homeTeam,
                        homeTeamSource,
                        visitingTeam,
                        visitingTeamSource,
                        games,
                        winner,
                        expectedStart,
                    }) => (
                        <Fragment key={id}>
                            <div className="sm:col-span-5 flex flex-row gap-x-1 sm:justify-between">
                                <div>{name}</div>
                                {!hideTimes && (
                                    <div>{expectedStart && <TDateTime datetime={expectedStart} type="time" />}</div>
                                )}
                            </div>
                            <div className="sm:col-span-2 flex sm:justify-end items-center gap-1">
                                {homeTeam?.id && homeTeam.id === winner?.id && (
                                    <TrophyIcon className="text-kfc-teal h-6" />
                                )}
                                {homeTeam?.abbrev || (
                                    <span className="italic">
                                        {homeTeamSource?.match?.sourceMatch?.name}
                                        {homeTeamSource?.match?.winner || ' L'}
                                    </span>
                                )}
                            </div>
                            <div className="sm:col-span-3 sm:text-center">
                                {games
                                    .map(
                                        ({ score: [[homeScore, _], [visitingScore, __]] }) =>
                                            `${homeScore}:${visitingScore}`,
                                    )
                                    .join(', ')}
                            </div>
                            <div className="sm:col-span-2 flex sm:justify-start items-center gap-1">
                                {visitingTeam?.abbrev || (
                                    <span className="italic">
                                        {visitingTeamSource?.match?.sourceMatch?.name}{' '}
                                        {visitingTeamSource?.match?.winner || ' L'}
                                    </span>
                                )}
                                {visitingTeam?.id && visitingTeam.id === winner?.id && (
                                    <TrophyIcon className="text-kfc-teal h-6" />
                                )}
                            </div>
                        </Fragment>
                    ),
                )}
        </div>
    );
}
