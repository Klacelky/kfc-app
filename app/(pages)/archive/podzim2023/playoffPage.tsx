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
                        <div>{time.toLocaleTimeString('sk', { timeZone: 'Europe/Prague' })}</div>
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
                <T sk="Sobota 18.11." en="Saturday 18.11" />
            </p>
            <section>
                <h2>
                    <T sk="Baráž" en="Promotion and relegation" />
                </h2>
                <Schedule
                    matches={[
                        {
                            name: 'Br I',
                            time: new Date(2023, 11, 18, 12, 0, 0),
                            home: 'NPV',
                            visiting: 'OCO',
                            results: [
                                [10, 0],
                                [10, 0],
                                [10, 9],
                            ],
                        },
                        {
                            name: 'Br II',
                            time: new Date(2023, 11, 18, 12, 30, 0),
                            home: 'KKT',
                            visiting: 'DIF',
                            results: [
                                [10, 3],
                                [10, 5],
                                [10, 3],
                            ],
                        },
                        {
                            name: 'Br III',
                            time: new Date(2023, 11, 18, 13, 0, 0),
                            home: 'MID',
                            visiting: 'ZMK',
                            results: [
                                [10, 6],
                                [10, 6],
                                [10, 3],
                            ],
                        },
                        {
                            name: 'Br IV',
                            time: new Date(2023, 11, 18, 13, 30, 0),
                            home: 'MSB',
                            visiting: 'TAP',
                            results: [
                                [5, 10],
                                [8, 10],
                                [1, 10],
                            ],
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
                            time: new Date(2023, 11, 18, 14, 30, 0),
                            home: 'BBH',
                            visiting: 'KKT',
                            results: [
                                [10, 2],
                                [10, 2],
                                [10, 7],
                            ],
                        },
                        {
                            name: 'Qf II',
                            time: new Date(2023, 11, 18, 15, 0, 0),
                            home: 'ORG',
                            visiting: 'NPV',
                            results: [
                                [10, 3],
                                [9, 10],
                                [2, 10],
                                [9, 10],
                            ],
                        },
                        {
                            name: 'Qf III',
                            time: new Date(2023, 11, 18, 15, 30, 0),
                            home: 'KYM',
                            visiting: 'TAP',
                            results: [
                                [10, 1],
                                [10, 5],
                                [10, 2],
                            ],
                        },
                        {
                            name: 'Qf IV',
                            time: new Date(2023, 11, 18, 16, 0, 0),
                            home: 'PAC',
                            visiting: 'MID',
                            results: [
                                [10, 5],
                                [10, 5],
                                [10, 9],
                            ],
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
                            time: new Date(2023, 11, 18, 17, 0, 0),
                            home: 'BBH',
                            visiting: 'PAC',
                            results: [
                                [9, 10],
                                [7, 10],
                                [10, 7],
                                [9, 10],
                            ],
                        },
                        {
                            name: 'Sf II',
                            time: new Date(2023, 11, 18, 17, 30, 0),
                            home: 'NPV',
                            visiting: 'KYM',
                            results: [
                                [6, 10],
                                [5, 10],
                                [9, 10],
                            ],
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
                            time: new Date(2023, 11, 18, 18, 30, 0),
                            home: 'PIN',
                            visiting: 'VID',
                            results: [
                                [10, 7],
                                [3, 10],
                                [8, 10],
                            ],
                            win: 2,
                        },
                        {
                            name: <T sk="3. miesto" en="3rd place" />,
                            time: new Date(2023, 11, 18, 19, 0, 0),
                            home: 'BBH',
                            visiting: 'NPV',
                            results: [
                                [6, 10],
                                [10, 4],
                                [10, 2],
                                [10, 3],
                            ],
                        },
                        {
                            name: <T sk="Finále" en="Finals" />,
                            time: new Date(2023, 11, 18, 19, 30, 0),
                            home: 'PAC',
                            visiting: 'KYM',
                            results: [
                                [9, 10],
                                [3, 10],
                                [6, 10],
                            ],
                        },
                    ]}
                />
            </section>
            <section>
                <h2>
                    <T sk="Vyhodnotenie" en="Award Ceremony" />
                </h2>
                <p>{new Date(2023, 11, 18, 20, 0, 0).toLocaleTimeString('sk', { timeZone: 'Europe/Prague' })}</p>
            </section>
        </>
    );
}
