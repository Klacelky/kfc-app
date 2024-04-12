import { GroupDetailedGetDto } from '@/dtos/group';
import { listGroups } from '@/services/groups';
import { getTournament } from '@/services/tournaments';
import T from '@/utils/client/i18n/t';
import classNames from 'classnames';

function GroupCard({ name, teams }: GroupDetailedGetDto) {
    return (
        <div className="w-96 max-w-full" key={name}>
            <h2 className="bg-kfc-teal w-10 h-10 rounded-full text-center text-kfc-blue">
                <span className="align-sub">{name}</span>
            </h2>
            <div className="flex flex-col gap-3">
                {teams
                    .sort((a, b) => b.points - a.points)
                    .map(({ name, abbrev, points, players, standing }) => (
                        <div key={name}>
                            <div className="flex flex-row items-center gap-3">
                                {standing !== null ? (
                                    <h3
                                        className={classNames(
                                            'translate-y-2 w-6 h-6 text-center rounded-full',
                                            { 'text-kfc-beige bg-kfc-red': standing === 4 },
                                            {
                                                'dark:text-kfc-blue text-kfc-beige dark:bg-kfc-beige bg-kfc-blue':
                                                    standing !== 4 && standing !== 1,
                                            },
                                            { 'text-kfc-blue bg-kfc-teal': standing === 1 },
                                        )}
                                    >
                                        {standing}
                                    </h3>
                                ) : null}
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

export interface GroupsProps {
    groups: GroupDetailedGetDto[];
}

export default async function Groups({ groups }: GroupsProps) {
    return (
        <div className="md:grid gap-10 md:grid-cols-2 2xl:grid-cols-4 justify-items-center">
            {groups
                .sort(({ name: name1 }, { name: name2 }) => (name1 <= name2 ? -1 : 1))
                .map((group) => GroupCard(group))}
        </div>
    );
}
