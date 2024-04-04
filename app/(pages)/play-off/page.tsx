import T from '@/utils/client/i18n/t';
import classNames from 'classnames';
import { Fragment, ReactNode } from 'react';

interface ScheduleData {
    matches: {
        name: ReactNode;
        time: Date;
        home: string;
        visiting: string;
        results?: [number, number][];
        win?: number;
    }[];
}

function Schedule({ matches }: ScheduleData) {
    return (
        <div className="grid gap-x-4 gap-y-2 grid-cols-1 sm:grid-cols-12 max-w-5xl">
            {matches.map(({ name, time, home, visiting, results, win }) => (
                <Fragment key={name?.toString()}>
                    <div className="sm:col-span-6 flex flex-row gap-x-1 sm:justify-between">
                        <div>{name}</div>
                        <div>{time.toLocaleTimeString()}</div>
                    </div>
                    <div
                        className={classNames('col-span-1 sm:text-right', {
                            'font-bold':
                                (results?.filter(([homeScore, _]) => homeScore == 10).length || 0) >= (win || 3),
                        })}
                    >
                        {home}
                    </div>
                    <div className="sm:col-span-4 sm:text-center">
                        {results?.map(([homeScore, visitingScore]) => `${homeScore}:${visitingScore}`).join(', ')}
                    </div>
                    <div
                        className={classNames('sm:col-span-1', {
                            'font-bold':
                                (results?.filter(([_, visitingScore]) => visitingScore == 10).length || 0) >=
                                (win || 3),
                        })}
                    >
                        {visiting}
                    </div>
                </Fragment>
            ))}
        </div>
    );
}

export default function PlayOffPage() {
    return (
        <>
            <h1>Play-off</h1>
            <p>
                <T sk="Sobota 13.4." en="Saturday Apr. 13" />
            </p>
            <section>
                <h2>
                    <T sk="Baráž" en="Promotion and relegation" />
                </h2>
                <Schedule
                    matches={[
                        {
                            name: 'Br I',
                            time: new Date(2024, 4, 13, 12, 0, 0),
                            home: 'A2',
                            visiting: 'D3',
                            results: [],
                        },
                        {
                            name: 'Br II',
                            time: new Date(2024, 4, 13, 12, 30, 0),
                            home: 'B2',
                            visiting: 'C3',
                            results: [],
                        },
                        {
                            name: 'Br III',
                            time: new Date(2024, 4, 13, 13, 0, 0),
                            home: 'C2',
                            visiting: 'B3',
                            results: [],
                        },
                        {
                            name: 'Br IV',
                            time: new Date(2024, 4, 13, 13, 30, 0),
                            home: 'D2',
                            visiting: 'A3',
                            results: [],
                        },
                    ]}
                />
                <p>
                    <T sk="(30 min. prestávka na dobehnutie)" en="(30 min. catch-up break)" />
                </p>
            </section>
            <section>
                <h2>
                    <T sk="Štrťfinále" en="Quarter-finals" />
                </h2>
                <Schedule
                    matches={[
                        {
                            name: 'Qf I',
                            time: new Date(2024, 4, 13, 14, 30, 0),
                            home: 'A1',
                            visiting: 'Br II',
                            results: [],
                        },
                        {
                            name: 'Qf II',
                            time: new Date(2024, 4, 13, 15, 0, 0),
                            home: 'B1',
                            visiting: 'Br I',
                            results: [],
                        },
                        {
                            name: 'Qf III',
                            time: new Date(2024, 4, 13, 15, 30, 0),
                            home: 'C1',
                            visiting: 'Br IV',
                            results: [],
                        },
                        {
                            name: 'Qf IV',
                            time: new Date(2024, 4, 13, 16, 0, 0),
                            home: 'D1',
                            visiting: 'Br III',
                            results: [],
                        },
                    ]}
                />
                <p>
                    <T sk="(30 min. prestávka na dobehnutie)" en="(30 min. catch-up break)" />
                </p>
            </section>
            <section>
                <h2>
                    <T sk="Seminfinále" en="Semi-finals" />
                </h2>
                <Schedule
                    matches={[
                        {
                            name: 'Sf I',
                            time: new Date(2024, 4, 13, 17, 0, 0),
                            home: 'Qf I',
                            visiting: 'Qf IV',
                            results: [],
                        },
                        {
                            name: 'Sf II',
                            time: new Date(2024, 4, 13, 17, 30, 0),
                            home: 'Qf II',
                            visiting: 'Qf III',
                            results: [],
                        },
                    ]}
                />
                <p>
                    <T sk="(30 min. prestávka na dobehnutie)" en="(30 min. catch-up break)" />
                </p>
            </section>
            <section>
                <h2>
                    <T sk="Finále" en="Finals" />
                </h2>
                <Schedule
                    matches={[
                        {
                            name: <T sk="Cena Bc. Petra Burdu" en="Bc. Peter Burda award" />,
                            time: new Date(2024, 4, 13, 18, 30, 0),
                            home: '???',
                            visiting: '???',
                            results: [],
                            win: 2,
                        },
                        {
                            name: <T sk="3. miesto" en="3rd place" />,
                            time: new Date(2024, 4, 13, 19, 0, 0),
                            home: 'Sf I L',
                            visiting: 'Sf II L',
                            results: [],
                        },
                        {
                            name: <T sk="Finále" en="Finals" />,
                            time: new Date(2024, 4, 13, 19, 30, 0),
                            home: 'Sf I W',
                            visiting: 'Sf II W',
                            results: [],
                        },
                    ]}
                />
            </section>
            <section>
                <h2>
                    <T sk="Vyhodnotenie" en="Award Ceremony" />
                </h2>
                <p>{new Date(2024, 4, 13, 20, 0, 0).toLocaleTimeString()}</p>
            </section>
        </>
    );
}
