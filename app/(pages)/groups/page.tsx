import Groups from '@/components/groups/Groups';
import { listGroups } from '@/services/groups';
import { getTournament } from '@/services/tournaments';
import T from '@/utils/client/i18n/t';
import { RESERVATION } from '@/utils/links';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function GroupsPage() {
    try {
        const { id: tournamentId } = await getTournament('spring2024');
        const groups = await listGroups(tournamentId);
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
                <Groups groups={groups} />
                <section>
                    <h2>
                        <T sk="Skupinové zápasy" en="Group matches" />
                    </h2>
                </section>
            </>
        );
    } catch (error) {
        console.error(error);

        return <div className="bg-red text-beige">Failed to load groups</div>;
    }
}
