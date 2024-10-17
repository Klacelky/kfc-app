import Alert from '@/components/admin/Alert';
import Groups from '@/components/groups/Groups';
import { GroupsMatches } from '@/components/groups/GroupsMatches';
import { MatchDetailedGetDto } from '@/dtos/match';
import { listGroups } from '@/services/groups';
import { listMatches } from '@/services/matches';
import { getTournament } from '@/services/tournaments';
import T from '@/utils/client/i18n/t';
import { handleError, handleErrorChain } from '@/utils/server/common';
import classNames from 'classnames';
import { Fragment, ReactNode } from 'react';

export interface RouteParams {
    tournamentBlob: string;
}

interface MatchGroupData {
    name: ReactNode;
    matches: MatchDetailedGetDto[];
}

function MatchGroup({ name, matches }: MatchGroupData) {
    if (matches.length === 0) {
        return null;
    }
    return (
        <section>
            <h3>{name}</h3>
            <div className="grid gap-x-4 gap-y-2 grid-cols-1 sm:grid-cols-12 max-w-5xl">
                {matches
                    .sort(({ expectedStart: ta, name: na }, { expectedStart: tb, name: nb }) =>
                        ta && tb ? ta?.getTime() - tb?.getTime() : (na || '') > (nb || '') ? 1 : -1,
                    )
                    .map(({ id, name, homeTeam, homeTeamSource, visitingTeam, visitingTeamSource, games, winner }) => (
                        <Fragment key={id}>
                            <div className="sm:col-span-6 flex flex-row gap-x-1 sm:justify-between">
                                <div>{name}</div>
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
                    ))}
            </div>
        </section>
    );
}

export default async function TournamentArchivePage({ params: { tournamentBlob } }: { params: RouteParams }) {
    const { data: tournament, error: tournamentError } = await handleError(() => getTournament(tournamentBlob));
    const { data: groups, error: groupsError } = await handleErrorChain(tournamentError, () =>
        listGroups(tournament!.id),
    );
    const { data: matchesByGroup, error: groupMatchesError } = await handleErrorChain(
        groupsError,
        async () =>
            await Promise.all(
                groups!.map(async (group) => ({
                    group,
                    matches: await listMatches(tournament!.id, { groupId: group.id }),
                })),
            ),
    );
    const { data: matches, error: playoffMatchesError } = await handleErrorChain(tournamentError, () =>
        listMatches(tournament!.id, { playoff: true }),
    );

    return (
        <>
            <h1>
                <T>{tournament?.name}</T>
            </h1>
            <section>
                <h2>
                    <T sk="Skupiny" en="Groups" />
                </h2>
                {groups ? (
                    <Groups groups={groups} />
                ) : (
                    <div className="bg-kfc-red text-kfc-beige">{groupsError?.message}</div>
                )}
            </section>
            <section>
                <h3>
                    <T sk="Skupinové zápasy" en="Group matches" />
                </h3>
                {matchesByGroup ? (
                    <GroupsMatches matchesByGroup={matchesByGroup} />
                ) : (
                    <div className="bg-kfc-red text-kfc-beige">{groupMatchesError?.message}</div>
                )}
            </section>
            <section>
                <h2>Play-off</h2>
                {matches ? (
                    <>
                        <MatchGroup
                            name={<T sk="Cena Bc. Petra Burdu" en="Bc. Peter Burda Award" />}
                            matches={matches.filter(({ playoffLayer }) => playoffLayer === 5)}
                        />
                        <MatchGroup
                            name={<T sk="Štrťfinále" en="Quarter-finals" />}
                            matches={matches.filter(({ playoffLayer }) => playoffLayer === 3)}
                        />
                        <MatchGroup
                            name={<T sk="Seminfinále" en="Semi-finals" />}
                            matches={matches.filter(({ playoffLayer }) => playoffLayer === 2)}
                        />
                        <MatchGroup
                            name={<T sk="Finále" en="Finals" />}
                            matches={matches.filter(({ playoffLayer }) => playoffLayer === 1)}
                        />
                    </>
                ) : (
                    <Alert>{playoffMatchesError?.message}</Alert>
                )}
            </section>
        </>
    );
}
