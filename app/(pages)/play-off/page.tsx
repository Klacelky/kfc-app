import T from '@/utils/i18n/t';
import { Fragment, ReactNode } from 'react';

interface ScheduleData {
    matches: {
        name: ReactNode;
        time: Date;
        home: string;
        visiting: string;
    }[];
}

function Schedule({ matches }: ScheduleData) {
    return (
        <div className="grid gap-x-4 gap-y-2 grid-cols-1 sm:grid-cols-12 max-w-5xl">
            {matches.map(({ name, time, home, visiting }) => (
                <Fragment key={name?.toString()}>
                    <div className="sm:col-span-6 flex flex-row gap-x-1 sm:justify-between">
                        <div>{name}</div>
                        <div>{time.toLocaleTimeString()}</div>
                    </div>
                    <div className="sm:col-span-3">{home}</div>
                    <div className="sm:col-span-3">{visiting}</div>
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
                        { name: 'Br I', time: new Date(2023, 11, 18, 12, 0, 0), home: 'NPV', visiting: 'OCO' },
                        { name: 'Br II', time: new Date(2023, 11, 18, 12, 30, 0), home: 'KKT', visiting: 'DIF' },
                        { name: 'Br III', time: new Date(2023, 11, 18, 13, 0, 0), home: 'MID', visiting: 'ZMK' },
                        { name: 'Br IV', time: new Date(2023, 11, 18, 13, 30, 0), home: 'MSB', visiting: 'TAP' },
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
                        { name: 'Qf I', time: new Date(2023, 11, 18, 14, 30, 0), home: 'BBH', visiting: 'Br II' },
                        { name: 'Qf II', time: new Date(2023, 11, 18, 15, 0, 0), home: 'ORG', visiting: 'Br I' },
                        { name: 'Qf III', time: new Date(2023, 11, 18, 15, 30, 0), home: 'KYM', visiting: 'Br IV' },
                        { name: 'Qf IV', time: new Date(2023, 11, 18, 16, 0, 0), home: 'PAC', visiting: 'Br III' },
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
                        { name: 'Sf I', time: new Date(2023, 11, 18, 17, 0, 0), home: 'Qf I', visiting: 'Qf IV' },
                        { name: 'Sf II', time: new Date(2023, 11, 18, 17, 30, 0), home: 'Qf II', visiting: 'Qf III' },
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
                        },
                        {
                            name: <T sk="3. miesto" en="3rd place" />,
                            time: new Date(2023, 11, 18, 19, 0, 0),
                            home: 'Sf I L',
                            visiting: 'Sf II L',
                        },
                        {
                            name: <T sk="Finále" en="Finals" />,
                            time: new Date(2023, 11, 18, 19, 30, 0),
                            home: 'Sf I W',
                            visiting: 'Sf II W',
                        },
                    ]}
                />
            </section>
            <section>
                <h2>
                    <T sk="Vyhodnotenie" en="Award Ceremony" />
                </h2>
                <p>{new Date(2023, 11, 18, 20, 0, 0).toLocaleTimeString()}</p>
            </section>
        </>
    );
}
