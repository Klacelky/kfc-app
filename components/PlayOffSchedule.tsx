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
                .map(({ id, name, home, visiting, games, expectedStart }) => (
                    <Fragment key={id}>
                        <div className="sm:col-span-5 flex flex-row gap-x-1 sm:justify-between">
                            <div>{name}</div>
                            {!hideTimes && (
                                <div>{expectedStart && <TDateTime datetime={expectedStart} type="time" />}</div>
                            )}
                        </div>
                        <div className="sm:col-span-2 flex sm:justify-end items-center gap-1">
                            {home.winner && <TrophyIcon className="text-kfc-teal h-6" />}
                            {home.team?.abbrev || (
                                <span className="italic">
                                    {home.source?.type === 'match' &&
                                        `${home.source.winner ? 'W' : 'L'} ${home.source.sourceMatch.name}`}
                                    {home.source?.type === 'group' &&
                                        `${home.source.standing} of ${home.source.sourceGroup.name}`}
                                </span>
                            )}
                        </div>
                        <div className="sm:col-span-3 sm:text-center">
                            {games
                                .map(
                                    ({
                                        score: {
                                            home: { score: homeScore },
                                            visiting: { score: visitingScore },
                                        },
                                    }) => `${homeScore}:${visitingScore}`,
                                )
                                .join(', ')}
                        </div>
                        <div className="sm:col-span-2 flex sm:justify-start items-center gap-1">
                            {visiting.team?.abbrev || (
                                <span className="italic">
                                    {visiting.source?.type === 'match' &&
                                        `${visiting.source.winner ? 'W' : 'L'} ${visiting.source.sourceMatch.name}`}
                                    {visiting.source?.type === 'group' &&
                                        `${visiting.source.standing} of ${visiting.source.sourceGroup.name}`}
                                </span>
                            )}
                            {visiting.winner && <TrophyIcon className="text-kfc-teal h-6" />}
                        </div>
                    </Fragment>
                ))}
        </div>
    );
}
