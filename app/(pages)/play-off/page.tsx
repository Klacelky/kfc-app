import Alert from '@/components/admin/Alert';
import { MatchDetailedGetDto } from '@/dtos/match';
import { listMatches } from '@/services/matches';
import { getTournament } from '@/services/tournaments';
import T from '@/utils/client/i18n/t';
import { handleError, handleErrorChain } from '@/utils/server/common';
import classNames from 'classnames';
import Link from 'next/link';
import { Fragment } from 'react';

export const dynamic = 'force-dynamic';

interface ScheduleData {
    matches: MatchDetailedGetDto[];
}

function Schedule({ matches }: ScheduleData) {
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
                            <div className="sm:col-span-6 flex flex-row gap-x-1 sm:justify-between">
                                <div>{name}</div>
                                <div>
                                    {expectedStart?.toLocaleTimeString('sk', {
                                        timeZone: 'Europe/Prague',
                                    })}
                                </div>
                            </div>
                            <div
                                className={classNames('col-span-1 sm:text-right', {
                                    'bg-kfc-teal text-kfc-blue font-bold': homeTeam && homeTeam.id === winner?.id,
                                })}
                            >
                                {homeTeam?.abbrev || (
                                    <span className="italic">
                                        {homeTeamSource?.match?.sourceMatch?.name}
                                        {homeTeamSource?.match?.winner || ' L'}
                                    </span>
                                )}
                            </div>
                            <div className="sm:col-span-4 sm:text-center">
                                {games
                                    .map(
                                        ({ score: [[homeScore, _], [visitingScore, __]] }) =>
                                            `${homeScore}:${visitingScore}`,
                                    )
                                    .join(', ')}
                            </div>
                            <div
                                className={classNames('sm:col-span-1', {
                                    'bg-kfc-teal text-kfc-blue font-bold':
                                        visitingTeam && visitingTeam.id === winner?.id,
                                })}
                            >
                                {visitingTeam?.abbrev || (
                                    <span className="italic">
                                        {visitingTeamSource?.match?.sourceMatch?.name}{' '}
                                        {visitingTeamSource?.match?.winner || ' L'}
                                    </span>
                                )}
                            </div>
                        </Fragment>
                    ),
                )}
        </div>
    );
}

export default async function PlayOffPage() {
    const { data: tournament, error: tournamentError } = await handleError(() => getTournament('spring2024'));
    const { data: matches, error: matchesError } = await handleErrorChain(tournamentError, () =>
        listMatches(tournament!.id, { playoff: true }),
    );

    if (matchesError) {
        return <Alert>{matchesError.message}</Alert>;
    }

    return (
        <>
            <h1>Play-off</h1>
            <p>
                <T sk="Sobota 13.4." en="Saturday Apr. 13" />
                <Link href="https://twitch.tv/kolejeklacelky">https://twitch.tv/kolejeklacelky</Link>
            </p>
            <section>
                <h2>
                    <T sk="Cena Bc. Petra Burdu" en="Bc. Peter Burda Award" />
                </h2>
                <Schedule matches={matches!.filter(({ playoffLayer }) => playoffLayer === 5)} />
            </section>
            <section>
                <h2>
                    <T sk="Baráž" en="Promotion and relegation" />
                </h2>
                <Schedule matches={matches!.filter(({ playoffLayer }) => playoffLayer === 4)} />
                <p>
                    <T sk="(30 min. prestávka na dobehnutie)" en="(30 min. catch-up break)" />
                </p>
            </section>
            <section>
                <h2>
                    <T sk="Štrťfinále" en="Quarter-finals" />
                </h2>
                <Schedule matches={matches!.filter(({ playoffLayer }) => playoffLayer === 3)} />
                <p>
                    <T sk="(30 min. prestávka na dobehnutie)" en="(30 min. catch-up break)" />
                </p>
            </section>
            <section>
                <h2>
                    <T sk="Seminfinále" en="Semi-finals" />
                </h2>
                <Schedule matches={matches!.filter(({ playoffLayer }) => playoffLayer === 2)} />
                <p>
                    <T sk="(30 min. prestávka na dobehnutie)" en="(30 min. catch-up break)" />
                </p>
            </section>
            <section>
                <h2>
                    <T sk="Finále" en="Finals" />
                </h2>
                <Schedule matches={matches!.filter(({ playoffLayer }) => playoffLayer === 1)} />
            </section>
            <section>
                <h2>
                    <T sk="Vyhodnotenie" en="Award Ceremony" />
                </h2>
                <p>
                    {new Date(2024, 4, 13, 18, 0, 0).toLocaleTimeString('sk', {
                        timeZone: 'Europe/Prague',
                    })}
                </p>
            </section>
        </>
    );
}
