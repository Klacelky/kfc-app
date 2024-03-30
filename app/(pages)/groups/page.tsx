import T from '@/utils/i18n/t';
import { RESERVATION_EN, RESERVATION_SK } from '@/utils/links';
import classNames from 'classnames';
import Link from 'next/link';
import { Fragment } from 'react';

interface TeamData {
    name: string;
    abbrev: string;
    players: { name: string }[];
    points: number;
}

interface GroupData {
    name: string;
    teams: TeamData[];
}

const groups: GroupData[] = [
];

interface MatchData {
    homeTeam: string;
    visitingTeam: string;
    results: [number, number][];
}

interface GroupMatchesData {
    group: string;
    matches: MatchData[];
}

const matches: GroupMatchesData[] = [
];

function GroupCard({ name, teams }: GroupData) {
    return (
        <div className="w-96 max-w-full" key={name}>
            <h2 className="bg-teal w-10 h-10 rounded-full text-center text-blue">
                <span className="align-sub">{name}</span>
            </h2>
            <div className="flex flex-col gap-3">
                {teams
                    .sort((a, b) => b.points - a.points)
                    .map(({ name, abbrev, points, players }, index) => (
                        <div key={name}>
                            <div className="flex flex-row items-center gap-3">
                                <h3
                                    className={classNames(
                                        'translate-y-2 w-6 h-6 text-center rounded-full',
                                        { 'text-beige bg-red': index == 3 },
                                        { 'dark:text-blue text-beige dark:bg-beige bg-blue': index == 1 || index == 2},
                                        { 'text-blue bg-teal': index == 0 },
                                    )}
                                >
                                    {index + 1}
                                </h3>
                                <h3>{abbrev}</h3>
                                <h3>{name}</h3>
                                <h3 className="flex-grow text-right">
                                    {points}
                                    <T sk="b" en="pts" />
                                </h3>
                            </div>
                            <div>
                                {players.map(({ name }) => (
                                    <div key={name}>{name}</div>
                                ))}
                            </div>
                        </div>
                    ))}
            </div>
        </div>
    );
}

function getTeamName(group: string, abbrev: string) {
    return groups.find(({ name }) => name === group)?.teams.find(({ abbrev: a }) => abbrev === a)?.name;
}

function GroupMatchesCard({ group, matches }: GroupMatchesData) {
    return (
        <div className="" key={group}>
            <h2 className="bg-teal w-10 h-10 rounded-full text-center text-blue">
                <span className="align-sub">{group}</span>
            </h2>
            <div className="grid grid-cols-5 items-center mt-10 gap-2">
                {matches.map(({ homeTeam, visitingTeam, results }) => (
                    <Fragment key={`${homeTeam}-${visitingTeam}`}>
                        <div className="text-right font-bold">{homeTeam}</div>
                        <div className="col-span-3 text-center">
                            {results.map((goals) => goals.join(':')).join(', ')}
                        </div>
                        <div>{visitingTeam}</div>
                    </Fragment>
                ))}
            </div>
        </div>
    );
}

export default function GroupsPage() {
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
                            <Link className="link" href={RESERVATION_SK} target="_blank">
                                tu
                            </Link>
                            . Ak si dohodneš so súpermi zápas, hoď si tam rezervačku.
                        </>
                    }
                    en={
                        <>
                            You can find the availability of the foosball table{' '}
                            <Link className="link" href={RESERVATION_EN} target="_blank">
                                here
                            </Link>
                            . Please, make a reservation when you agree on a match.
                        </>
                    }
                />
            </p>
            <div className="md:grid gap-10 md:grid-cols-2 2xl:grid-cols-4 justify-items-center">
                {groups.map((group) => GroupCard(group))}
            </div>
            <section>
                <h2>
                    <T sk="Skupinové zápasy" en="Group matches" />
                </h2>
                <div className="grid gap-10 grid-cols-2 lg:grid-cols-4">
                    {matches.map((group) => GroupMatchesCard(group))}
                </div>
            </section>
        </>
    );
}
