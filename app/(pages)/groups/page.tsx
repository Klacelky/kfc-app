// import Link from 'next/link';

// import Alert from '@/components/Alert';
// import Groups from '@/components/groups/Groups';
// import { GroupsMatches } from '@/components/groups/GroupsMatches';
// import { listGroups } from '@/services/groups';
// import { listMatches } from '@/services/matches';
// import { getTournament } from '@/services/tournaments';
import T from '@/utils/client/i18n/t';
// import { RESERVATION } from '@/utils/links';
// import { handleError } from '@/utils/server/common';

export const dynamic = 'force-dynamic';

export default async function GroupsPage() {
    // const { data, error } = await handleError(async () => {
    //     const tournament = await getTournament('autumn2024');
    //     const groups = await listGroups(tournament.id);
    //     const matchesByGroup = await Promise.all(
    //         groups!.map(async (group) => ({
    //             group,
    //             matches: await listMatches(tournament!.id, { groupId: group.id }),
    //         })),
    //     );
    //     return { tournament, groups, matchesByGroup };
    // });

    // if (error) {
    //     console.error(error);
    //     return <Alert>Failed to load the tournament goups: {error.message}</Alert>;
    // }

    // const { tournament, groups, matchesByGroup } = data;

    return (
        <>
            <h1>
                <T sk="Skupiny" en="Groups" />
            </h1>
            <p>
                <T
                    sk="V sezóne Podzim 2024 sa pre malú účasť nebudú konať skupinové zápasy. Miesto nich budú hrať všetky tímy priamo v play-off formou double-elimination."
                    en="Due to low number of teams, there will be no group matches in season Autumn 2024. Instead, all registered teams continue to play-off which will have double-elimination form."
                />
            </p>
            {/* <p> */}
            {/*     <T */}
            {/*         sk={ */}
            {/*             <> */}
            {/*                 Viac o formáte skupinových zápasov nájdeš{' '} */}
            {/*                 <Link className="link" href="/format"> */}
            {/*                     tu */}
            {/*                 </Link> */}
            {/*                 . */}
            {/*             </> */}
            {/*         } */}
            {/*         en={ */}
            {/*             <> */}
            {/*                 You can find out more about the group matches{' '} */}
            {/*                 <Link className="link" href="/format"> */}
            {/*                     here */}
            {/*                 </Link> */}
            {/*                 . */}
            {/*             </> */}
            {/*         } */}
            {/*     /> */}
            {/* </p> */}
            {/* {tournament?.publishedAt && tournament.publishedAt > new Date() ? ( */}
            {/*     <p> */}
            {/*         <T sk="Viac o skupinách čoskoro..." en="Groups comming soon..." /> */}
            {/*     </p> */}
            {/* ) : ( */}
            {/*     <> */}
            {/*         <p> */}
            {/*             <T */}
            {/*                 sk={ */}
            {/*                     <> */}
            {/*                         Obsadenosť stola nájdeš{' '} */}
            {/*                         <Link className="link" href={RESERVATION} target="_blank"> */}
            {/*                             tu */}
            {/*                         </Link> */}
            {/*                         . Ak si dohodneš so súpermi zápas, hoď si tam rezervačku. */}
            {/*                     </> */}
            {/*                 } */}
            {/*                 en={ */}
            {/*                     <> */}
            {/*                         You can find the availability of the foosball table{' '} */}
            {/*                         <Link className="link" href={RESERVATION} target="_blank"> */}
            {/*                             here */}
            {/*                         </Link> */}
            {/*                         . Please, make a reservation when you agree on a match. */}
            {/*                     </> */}
            {/*                 } */}
            {/*             /> */}
            {/*         </p> */}
            {/*         <Groups groups={groups} /> */}
            {/*         <section> */}
            {/*             <h2> */}
            {/*                 <T sk="Skupinové zápasy" en="Group matches" /> */}
            {/*             </h2> */}
            {/*             <GroupsMatches matchesByGroup={matchesByGroup} /> */}
            {/*         </section> */}
            {/*     </> */}
            {/* )} */}
        </>
    );
}
