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
        const tournament = await getTournament('autumn2025');
        const matches = await listMatches(tournament.id, { playoff: true });
        return { tournament, matches };
    });

    if (error) {
        return <Alert>Failed to load tournanment play-off: {error.message}</Alert>;
    }
    const { tournament, matches } = data;
    const finalLayer = Math.max(0, ...matches.map(({ playoffLayer }) => playoffLayer).filter((layer) => layer !== null));

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
                    {new Array(finalLayer - 1).fill(0).map((_, index) => (
                        <section key={`playOffSection${index + 1}`}>
                            <h2>
                                <T sk={`${index + 1}. blok`} en={`Section ${index + 1}`} />
                            </h2>
                            <PlayOffSchedule
                                matches={matches.filter(({ playoffLayer }) => playoffLayer === index + 1)}
                            />
                            <p>
                                <T sk="(10 min. prestávka na dobehnutie)" en="(10 min. catch-up break)" />
                            </p>
                        </section>
                    ))}
                    <section>
                        <h2>
                            <T sk="Finálový blok" en="Finals section" />
                        </h2>
                        <PlayOffSchedule matches={matches.filter(({ playoffLayer }) => playoffLayer === finalLayer)} />
                        <p>
                            <T sk="*Opakovaný zápas, ak WQ vyhral prvý" en="*Rematch if WQ wins first time" />
                        </p>
                    </section>
                    <section>
                        <h2>
                            <T sk="Vyhodnotenie" en="Award Ceremony" />
                        </h2>
                        <p>
                            <TDateTime datetime={new Date(Date.parse("2025-11-08T19:30:00+0100"))} type="time" />
                        </p>
                    </section>
                </>
            )}
        </>
    );
}
