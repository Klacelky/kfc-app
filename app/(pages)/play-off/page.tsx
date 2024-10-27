import Link from 'next/link';

import Alert from '@/components/Alert';
import PlayOffSchedule from '@/components/PlayOffSchedule';
import { listMatches } from '@/services/matches';
import { getTournament } from '@/services/tournaments';
import TDateTime from '@/utils/client/i18n/TDateTime';
import T from '@/utils/client/i18n/t';
import { handleError } from '@/utils/server/common';

export const dynamic = 'force-dynamic';

export default async function PlayOffPage() {
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
                <Link href="https://twitch.tv/kolejeklacelky">https://twitch.tv/kolejeklacelky</Link>
            </p>
            {tournament.publishedAt && tournament.publishedAt > new Date() ? (
                <p>
                    <T sk="Viac o play-off čoskoro..." en="Play-off comming soon..." />
                </p>
            ) : (
                <>
                    <section>
                        <h2>
                            <T sk="Cena Bc. Petra Burdu" en="Bc. Peter Burda Award" />
                        </h2>
                        <PlayOffSchedule matches={matches.filter(({ playoffLayer }) => playoffLayer === 5)} />
                    </section>
                    <section>
                        <h2>
                            <T sk="Baráž" en="Promotion and relegation" />
                        </h2>
                        <PlayOffSchedule matches={matches.filter(({ playoffLayer }) => playoffLayer === 4)} />
                        <p>
                            <T sk="(30 min. prestávka na dobehnutie)" en="(30 min. catch-up break)" />
                        </p>
                    </section>
                    <section>
                        <h2>
                            <T sk="Štrťfinále" en="Quarter-finals" />
                        </h2>
                        <PlayOffSchedule matches={matches.filter(({ playoffLayer }) => playoffLayer === 3)} />
                        <p>
                            <T sk="(30 min. prestávka na dobehnutie)" en="(30 min. catch-up break)" />
                        </p>
                    </section>
                    <section>
                        <h2>
                            <T sk="Seminfinále" en="Semi-finals" />
                        </h2>
                        <PlayOffSchedule matches={matches.filter(({ playoffLayer }) => playoffLayer === 2)} />
                        <p>
                            <T sk="(30 min. prestávka na dobehnutie)" en="(30 min. catch-up break)" />
                        </p>
                    </section>
                    <section>
                        <h2>
                            <T sk="Finále" en="Finals" />
                        </h2>
                        <PlayOffSchedule matches={matches.filter(({ playoffLayer }) => playoffLayer === 1)} />
                    </section>
                    <section>
                        <h2>
                            <T sk="Vyhodnotenie" en="Award Ceremony" />
                        </h2>
                        <p>
                            <TDateTime datetime={new Date(2024, 11, 9, 18, 0, 0)} type="time" />
                        </p>
                    </section>
                </>
            )}
        </>
    );
}
