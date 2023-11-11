import T from '@/utils/i18n/t';
import { RESERVATION_EN, RESERVATION_SK } from '@/utils/links';
import Link from 'next/link';

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
                points: 0,
                players: [{ name: 'Matúš Kapičák' }, { name: 'Michal Sokolík' }],
            },
            {
                name: 'Nepredvídateľní',
                abbrev: 'NPV',
                points: 0,
                players: [{ name: 'Timotej Šváby' }, { name: 'Dominika Dolinová' }],
            },
            {
                name: 'Timon a pumba',
                abbrev: 'TAP',
                points: 0,
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
                points: 0,
                players: [{ name: 'Alexej Šaňo Eliáš' }, { name: 'Karol Kováč' }],
            },
            {
                name: 'Klácelkovský korporátny team',
                abbrev: 'KKT',
                points: 0,
                players: [{ name: 'Peter Dao' }, { name: 'Oliver Svetlík (Diana)' }],
            },
            {
                name: 'Zedz mi kár',
                abbrev: 'ZMK',
                points: 0,
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
                points: 0,
                players: [{ name: 'Adam Majzlík' }, { name: 'Zuzana Sepešiová' }],
            },
            {
                name: 'Michal David',
                abbrev: 'MID',
                points: 0,
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
                points: 0,
                players: [{ name: 'Richard Truben' }, { name: 'Patrik Szoboszlai' }],
            },
        ],
    },
    {
        name: 'D',
        teams: [
            {
                name: 'Paprice',
                abbrev: 'PAC',
                points: 0,
                players: [{ name: 'Barbora Tušilová' }, { name: 'Berta Papulová' }],
            },
            {
                name: 'Onspiruk sa ostatnymi',
                abbrev: 'OCO',
                points: 0,
                players: [{ name: 'Jitka Viceníková' }, { name: 'Adam Balušeskul' }],
            },
            {
                name: 'Mal si branic',
                abbrev: 'MSB',
                points: 0,
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

export function GroupCard({ name, teams }: GroupData) {
    return (
        <div className="w-96 max-w-full" key={name}>
            <h2 className="bg-teal w-10 h-10 rounded-full text-center kfc-shadow ">
                <span className="align-sub">{name}</span>
            </h2>
            <div className="flex flex-col gap-3">
                {teams.map(({ name, abbrev, points, players }) => (
                    <div key={name}>
                        <div className="flex flex-row items-center gap-3">
                            <h3>
                                {abbrev}
                            </h3>
                            <h3>
                                {name}
                            </h3>
                            <div className='flex-grow text-right'>
                                {points}
                                <T sk="b" en="pts" />
                            </div>
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
        </>
    );
}
