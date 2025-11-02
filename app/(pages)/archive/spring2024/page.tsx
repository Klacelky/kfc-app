import Alert from '@/components/Alert';
import PlayOffSchedule from '@/components/PlayOffSchedule';
import Groups from '@/components/groups/Groups';
import { GroupsMatches } from '@/components/groups/GroupsMatches';
import { listGroups } from '@/services/groups';
import { listMatches } from '@/services/matches';
import { getTournament } from '@/services/tournaments';
import T from '@/utils/client/i18n/t';
import { PageProps } from '@/utils/common';
import { handleError } from '@/utils/server/common';

export type RouteParams = {
};

export default async function TournamentArchiveSpring2024Page({ params }: PageProps<RouteParams>) {
    const { data, error } = await handleError(async () => {
        const tournament = await getTournament('spring2024');
        const groups = await listGroups(tournament.id);
        const matchesByGroup = await Promise.all(
            groups!.map(async (group) => ({
                group,
                matches: await listMatches(tournament!.id, { groupId: group.id }),
            })),
        );
        const playoffMatches = await listMatches(tournament!.id, { playoff: true });
        return { tournament, groups, matchesByGroup, playoffMatches };
    });

    if (error) {
        return <Alert>Failed to load the tournament: {error.message}</Alert>;
    }
    const { tournament, groups, matchesByGroup, playoffMatches } = data;

    return (
        <>
            <h1>
                <T>{tournament.name}</T>
            </h1>
            <section>
                <h2>
                    <T sk="Skupiny" en="Groups" />
                </h2>
                <Groups groups={groups} />
            </section>
            <section>
                <h3>
                    <T sk="Skupinové zápasy" en="Group matches" />
                </h3>
                <GroupsMatches matchesByGroup={matchesByGroup} />
            </section>
            <section>
                <h2>Play-off</h2>
                <section>
                    <h3>
                        <T sk="Cena Bc. Petra Burdu" en="Bc. Peter Burda Award" />
                    </h3>
                    <PlayOffSchedule matches={playoffMatches.filter(({ playoffLayer }) => playoffLayer === 5)} />
                </section>
                <section>
                    <h3>
                        <T sk="Baráž" en="Promotion and relegation" />
                    </h3>
                    <PlayOffSchedule matches={playoffMatches.filter(({ playoffLayer }) => playoffLayer === 4)} />
                </section>
                <section>
                    <h3>
                        <T sk="Štrťfinále" en="Quarter-finals" />
                    </h3>
                    <PlayOffSchedule matches={playoffMatches.filter(({ playoffLayer }) => playoffLayer === 3)} />
                </section>
                <section>
                    <h3>
                        <T sk="Seminfinále" en="Semi-finals" />
                    </h3>
                    <PlayOffSchedule matches={playoffMatches.filter(({ playoffLayer }) => playoffLayer === 2)} />
                </section>
                <section>
                    <h3>
                        <T sk="Finále" en="Finals" />
                    </h3>
                    <PlayOffSchedule matches={playoffMatches.filter(({ playoffLayer }) => playoffLayer === 1)} />
                </section>
            </section>
        </>
    );
}
