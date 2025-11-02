import Link from 'next/link';

import Alert from '@/components/Alert';
import PlayOffSchedule from '@/components/PlayOffSchedule';
import { listMatches } from '@/services/matches';
import { getTournament } from '@/services/tournaments';
import TDateTime from '@/utils/client/i18n/TDateTime';
import T from '@/utils/client/i18n/t';
import { handleError } from '@/utils/server/common';

export const dynamic = 'force-dynamic';

export default async function TournamentArchiveAutumn2024Page() {
    const { data, error } = await handleError(async () => {
        const tournament = await getTournament('autumn2024');
        const matches = await listMatches(tournament.id, { playoff: true });
        return { tournament, matches };
    });

    if (error) {
        return <Alert>Failed to load tournanment play-off: {error.message}</Alert>;
    }
    const { tournament, matches } = data;

    return (
        <>
            <h1>Play-off</h1>
            <p>
                <TDateTime datetime={tournament.endDate} type="date" />{' '}
            </p>
            <section>
                <h2>
                    <T sk="1. blok" en="1st section" />
                </h2>
                <PlayOffSchedule matches={matches.filter(({ playoffLayer }) => playoffLayer === 1)} />
                <p>
                    <T sk="(10 min. prestávka na dobehnutie)" en="(10 min. catch-up break)" />
                </p>
            </section>
            <section>
                <h2>
                    <T sk="2. blok" en="2nd section" />
                </h2>
                <PlayOffSchedule matches={matches.filter(({ playoffLayer }) => playoffLayer === 2)} />
                <p>
                    <T sk="(10 min. prestávka na dobehnutie)" en="(10 min. catch-up break)" />
                </p>
            </section>
            <section>
                <h2>
                    <T sk="3. blok" en="3rd section" />
                </h2>
                <PlayOffSchedule matches={matches.filter(({ playoffLayer }) => playoffLayer === 3)} />
                <p>
                    <T sk="(10 min. prestávka na dobehnutie)" en="(10 min. catch-up break)" />
                </p>
            </section>
            <section>
                <h2>
                    <T sk="4. blok" en="4th section" />
                </h2>
                <PlayOffSchedule matches={matches.filter(({ playoffLayer }) => playoffLayer === 4)} />
                <p>
                    <T sk="(10 min. prestávka na dobehnutie)" en="(10 min. catch-up break)" />
                </p>
            </section>
            <section>
                <h2>
                    <T sk="Finálový blok" en="Finals section" />
                </h2>
                <PlayOffSchedule matches={matches.filter(({ playoffLayer }) => playoffLayer === 5)} />
                <p>
                    <T sk="*Opakovaný zápas, ak WQ vyhral prvý" en="*Rematch if WQ wins first time" />
                </p>
            </section>
            <section>
                <h2>
                    <T sk="Vyhodnotenie" en="Award Ceremony" />
                </h2>
                <p>
                    <TDateTime datetime={new Date(2024, 10, 9, 17, 0, 0)} type="time" />
                </p>
            </section>
        </>
    );
}
