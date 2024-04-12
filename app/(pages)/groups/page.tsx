import Groups from '@/components/groups/Groups';
import { GroupDetailedGetDto } from '@/dtos/group';
import { MatchDetailedGetDto } from '@/dtos/match';
import { listGroups } from '@/services/groups';
import { listMatches } from '@/services/matches';
import { getTournament } from '@/services/tournaments';
import T from '@/utils/client/i18n/t';
import { RESERVATION } from '@/utils/links';
import { handleError, handleErrorChain } from '@/utils/server/common';
import classNames from 'classnames';
import Link from 'next/link';

interface GroupMatches {
    group: GroupDetailedGetDto;
    matches: MatchDetailedGetDto[];
}

function GroupMatchesCard({ group: { id: groupId, name }, matches }: GroupMatches) {
    return (
        <div className="" key={groupId}>
            <h2 className="bg-kfc-teal w-10 h-10 rounded-full text-center text-kfc-blue">
                <span className="align-sub">{name}</span>
            </h2>
            <div className="pt-6">
                <table className="table-auto w-full">
                    <tbody>
                        {matches.map(({ id: matchId, homeTeam, visitingTeam, games, winner }) => (
                            <tr key={matchId}>
                                <td className="text-right m-2">
                                    <span
                                        className={classNames({
                                            'bg-kfc-teal text-kfc-blue font-bold p-1':
                                                homeTeam?.id && homeTeam.id === winner?.id,
                                        })}
                                    >
                                        {homeTeam?.abbrev}
                                    </span>
                                </td>
                                <td className="text-center m-2">
                                    {games
                                        .map(
                                            ({ score: [[homeScore, _], [visitingScore, __]] }) =>
                                                `${homeScore}:${visitingScore}`,
                                        )
                                        .join(', ')}
                                </td>
                                <td className="m-2">
                                    <span
                                        className={classNames({
                                            'bg-kfc-teal text-kfc-blue font-bold p-1':
                                                visitingTeam?.id && visitingTeam.id === winner?.id,
                                        })}
                                    >
                                        {visitingTeam?.abbrev}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default async function GroupsPage() {
    const { data: tournament, error: tournamentError } = await handleError(() => getTournament('spring2024'));
    const { data: groups, error: groupsError } = await handleErrorChain(tournamentError, () =>
        listGroups(tournament!.id),
    );
    const { data: matchesByGroup, error: matchesError } = await handleErrorChain(
        groupsError,
        async () =>
            await Promise.all(
                groups!.map(async (group) => ({
                    group,
                    matches: await listMatches(tournament!.id, { groupId: group.id }),
                })),
            ),
    );

    return (
        <>
            <h1>
                <T sk="Skupiny" en="Groups" />
            </h1>
            <p>
                <T
                    sk={
                        <>
                            Viac o formáte skupinových zápasov nájdeš{' '}
                            <Link className="link" href="/format">
                                tu
                            </Link>
                            .
                        </>
                    }
                    en={
                        <>
                            You can find out more about the group matches{' '}
                            <Link className="link" href="/format">
                                here
                            </Link>
                            .
                        </>
                    }
                />
            </p>
            <p>
                <T
                    sk={
                        <>
                            Obsadenosť stola nájdeš{' '}
                            <Link className="link" href={RESERVATION} target="_blank">
                                tu
                            </Link>
                            . Ak si dohodneš so súpermi zápas, hoď si tam rezervačku.
                        </>
                    }
                    en={
                        <>
                            You can find the availability of the foosball table{' '}
                            <Link className="link" href={RESERVATION} target="_blank">
                                here
                            </Link>
                            . Please, make a reservation when you agree on a match.
                        </>
                    }
                />
            </p>
            {groups ? (
                <Groups groups={groups} />
            ) : (
                <div className="bg-kfc-red text-kfc-beige">{groupsError?.message}</div>
            )}
            <section>
                <h2>
                    <T sk="Skupinové zápasy" en="Group matches" />
                </h2>
                <div className="grid gap-10 grid-cols-2 lg:grid-cols-4">
                    {matchesByGroup ? (
                        matchesByGroup?.map(({ group, matches }) => (
                            <GroupMatchesCard key={group.id} group={group} matches={matches} />
                        ))
                    ) : (
                        <div className="bg-kfc-red text-kfc-beige">{matchesError?.message}</div>
                    )}
                </div>
            </section>
        </>
    );
}
