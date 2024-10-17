import Groups from '@/components/groups/Groups';
import { GroupsMatches } from '@/components/groups/GroupsMatches';
import { listGroups } from '@/services/groups';
import { listMatches } from '@/services/matches';
import { getTournament } from '@/services/tournaments';
import T from '@/utils/client/i18n/t';
import { RESERVATION } from '@/utils/links';
import { handleError, handleErrorChain } from '@/utils/server/common';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

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
                {matchesByGroup ? (
                    <GroupsMatches matchesByGroup={matchesByGroup} />
                ) : (
                    <div className="bg-kfc-red text-kfc-beige">{matchesError?.message}</div>
                )}
            </section>
        </>
    );
}
