import classNames from 'classnames';
import { Fragment } from 'react';
import T from '@/utils/client/i18n/t';

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
    {
        name: 'A',
        teams: [
            {
                name: 'Mäkčeň a Vokáň',
                abbrev: 'BBH',
                points: 3,
                players: [{ name: 'Matúš Kapičák' }, { name: 'Michal Sokolík' }],
            },
            {
                name: 'Nepredvídateľní',
                abbrev: 'NPV',
                points: 2,
                players: [{ name: 'Timotej Šváby' }, { name: 'Dominika Dolinová' }],
            },
            {
                name: 'Timon a pumba',
                abbrev: 'TAP',
                points: 1,
                players: [{ name: 'Jozef Tadian' }, { name: 'Timotej Martykán' }],
            },
            {
                name: 'Pindy',
                abbrev: 'PIN',
                points: 0,
                players: [{ name: 'Veronika Krchnavá' }, { name: 'Vlaďa Desetová' }],
            },
        ],
    },
    {
        name: 'B',
        teams: [
            {
                name: 'Organizátorská zložka',
                abbrev: 'ORG',
                points: 3,
                players: [{ name: 'Alexej Šaňo Eliáš' }, { name: 'Karol Kováč' }],
            },
            {
                name: 'Klácelkovský korporátny team',
                abbrev: 'KKT',
                points: 2,
                players: [{ name: 'Peter Dao' }, { name: 'Oliver Svetlík (Diana)' }],
            },
            {
                name: 'Zedz mi kár',
                abbrev: 'ZMK',
                points: 1,
                players: [{ name: 'Bubo Vlha' }, { name: 'Mališ Adam' }],
            },
            {
                name: 'Mediterannean people',
                abbrev: 'MEP',
                points: 0,
                players: [{ name: 'Lorenzo Lamorte' }, { name: 'Luis Izquierdo' }],
            },
        ],
    },
    {
        name: 'C',
        teams: [
            {
                name: 'Krámy Yetiho mamy',
                abbrev: 'KYM',
                points: 3,
                players: [{ name: 'Adam Majzlík' }, { name: 'Zuzana Sepešiová' }],
            },
            {
                name: 'Michal David',
                abbrev: 'MID',
                points: 2,
                players: [{ name: 'Dávid Fejczo' }, { name: 'Michal Fridrich' }],
            },
            {
                name: 'Praclík',
                abbrev: 'PRC',
                points: 0,
                players: [{ name: 'Romi Mihalovičová' }, { name: 'Ján Tóth' }],
            },
            {
                name: 'jg diff',
                abbrev: 'DIF',
                points: 1,
                players: [{ name: 'Richard Truben' }, { name: 'Patrik Szabó' }],
            },
        ],
    },
    {
        name: 'D',
        teams: [
            {
                name: 'Paprice',
                abbrev: 'PAC',
                points: 3,
                players: [{ name: 'Barbora Tušilová' }, { name: 'Berta Papulová' }],
            },
            {
                name: 'Onspiruk sa ostatnymi',
                abbrev: 'OCO',
                points: 1,
                players: [{ name: 'Jitka Viceníková' }, { name: 'Adam Balušeskul' }],
            },
            {
                name: 'Mal si branic',
                abbrev: 'MSB',
                points: 2,
                players: [{ name: 'Danny Cepr' }, { name: 'Kristián Latinák' }],
            },
            {
                name: 'Ideme si po vidličku',
                abbrev: 'VID',
                points: 0,
                players: [{ name: 'Betka Fuglíková' }, { name: 'Maťa Lysičanová' }],
            },
        ],
    },
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
    {
        group: 'A',
        matches: [
            {
                homeTeam: 'BBH',
                visitingTeam: 'NPV',
                results: [
                    [10, 7],
                    [10, 8],
                ],
            },
            {
                homeTeam: 'TAP',
                visitingTeam: 'PIN',
                results: [
                    [10, 3],
                    [10, 0],
                ],
            },
            {
                homeTeam: 'BBH',
                visitingTeam: 'TAP',
                results: [
                    [10, 6],
                    [10, 6],
                ],
            },
            {
                homeTeam: 'NPV',
                visitingTeam: 'PIN',
                results: [
                    [10, 0],
                    [10, 0],
                ],
            },
            {
                homeTeam: 'BBH',
                visitingTeam: 'PIN',
                results: [
                    [10, 1],
                    [10, 1],
                ],
            },
            {
                homeTeam: 'NPV',
                visitingTeam: 'TAP',
                results: [
                    [10, 3],
                    [10, 4],
                ],
            },
        ],
    },
    {
        group: 'B',
        matches: [
            {
                homeTeam: 'ORG',
                visitingTeam: 'KKT',
                results: [
                    [10, 4],
                    [10, 0],
                ],
            },
            {
                homeTeam: 'ZMK',
                visitingTeam: 'MEP',
                results: [
                    [6, 10],
                    [10, 4],
                    [10, 4],
                ],
            },
            {
                homeTeam: 'ORG',
                visitingTeam: 'ZMK',
                results: [
                    [10, 1],
                    [10, 2],
                ],
            },
            {
                homeTeam: 'KKT',
                visitingTeam: 'MEP',
                results: [
                    [10, 4],
                    [10, 9],
                ],
            },
            {
                homeTeam: 'ORG',
                visitingTeam: 'MEP',
                results: [
                    [10, 2],
                    [10, 3],
                ],
            },
            {
                homeTeam: 'KKT',
                visitingTeam: 'ZMK',
                results: [
                    [10, 7],
                    [10, 4],
                ],
            },
        ],
    },
    {
        group: 'C',
        matches: [
            {
                homeTeam: 'KYM',
                visitingTeam: 'MID',
                results: [
                    [10, 6],
                    [10, 4],
                ],
            },
            {
                homeTeam: 'DIF',
                visitingTeam: 'PRC',
                results: [
                    [10, 8],
                    [10, 2],
                ],
            },
            {
                homeTeam: 'KYM',
                visitingTeam: 'PRC',
                results: [
                    [10, 1],
                    [10, 0],
                ],
            },
            {
                homeTeam: 'MID',
                visitingTeam: 'DIF',
                results: [
                    [10, 5],
                    [10, 5],
                ],
            },
            {
                homeTeam: 'KYM',
                visitingTeam: 'DIF',
                results: [
                    [10, 0],
                    [10, 4],
                ],
            },
            {
                homeTeam: 'MID',
                visitingTeam: 'PRC',
                results: [
                    [10, 3],
                    [3, 10],
                    [10, 4],
                ],
            },
        ],
    },
    {
        group: 'D',
        matches: [
            {
                homeTeam: 'PAC',
                visitingTeam: 'OCO',
                results: [
                    [10, 3],
                    [10, 3],
                ],
            },
            {
                homeTeam: 'MSB',
                visitingTeam: 'VID',
                results: [
                    [10, 0],
                    [10, 3],
                ],
            },
            {
                homeTeam: 'PAC',
                visitingTeam: 'MSB',
                results: [
                    [10, 4],
                    [9, 10],
                    [10, 6],
                ],
            },
            {
                homeTeam: 'OCO',
                visitingTeam: 'VID',
                results: [
                    [10, 0],
                    [10, 1],
                ],
            },
            {
                homeTeam: 'PAC',
                visitingTeam: 'VID',
                results: [
                    [10, 0],
                    [10, 1],
                ],
            },
            {
                homeTeam: 'MSB',
                visitingTeam: 'OCO',
                results: [
                    [10, 9],
                    [10, 8],
                ],
            },
        ],
    },
];

function GroupCard({ name, teams }: GroupData) {
    return (
        <div className="w-96 max-w-full" key={name}>
            <h2 className="bg-kfc-teal w-10 h-10 rounded-full text-center text-kfc-blue">
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
                                        { 'text-kfc-beige bg-kfc-red': index == 3 },
                                        { 'dark:text-kfc-blue text-kfc-beige dark:bg-kfc-beige bg-kfc-blue': index == 1 || index == 2},
                                        { 'text-kfc-blue bg-kfc-teal': index == 0 },
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
            <h2 className="bg-kfc-teal w-10 h-10 rounded-full text-center text-kfc-blue">
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
                        {/* <div className="col-span-4 text-right font-bold">{getTeamName(group, homeTeam)}</div> */}
                        {/* <div className="text-center">-</div> */}
                        {/* <div className="col-span-4">{getTeamName(group, visitingTeam)}</div> */}
                        {/* <div className="col-span-9 text-center sm:col-span-3 sm:text-left"> */}
                        {/*     {results.map((goals) => goals.join(':')).join(', ')} */}
                        {/* </div> */}
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

