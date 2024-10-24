import { GroupDetailedGetDto } from '@/dtos/group';
import { MatchDetailedGetDto } from '@/dtos/match';
import { TrophyIcon } from '@heroicons/react/16/solid';
import classNames from 'classnames';

export interface GroupMatches {
    group: GroupDetailedGetDto;
    matches: MatchDetailedGetDto[];
}

function GroupMatchesCard({ group: { id: groupId, name }, matches }: GroupMatches) {
    return (
        <div key={groupId}>
            <h2 className="bg-kfc-teal w-10 h-10 rounded-full text-center text-kfc-blue">
                <span className="align-sub">{name}</span>
            </h2>
            <div className="pt-6">
                <table className="table-auto w-full whitespace-nowrap">
                    <tbody>
                        {matches.map(({ id: matchId, homeTeam, visitingTeam, games, winner }) => (
                            <tr key={matchId} className="line">
                                <td className="text-right p-1">
                                    <div className="flex justify-end items-center gap-1">
                                        {homeTeam?.id && homeTeam.id === winner?.id && (
                                            <TrophyIcon className="text-kfc-teal h-6" />
                                        )}
                                        <span>{homeTeam?.abbrev}</span>
                                    </div>
                                </td>
                                <td className="text-center p-1">
                                    {games
                                        .map(
                                            ({ score: [[homeScore, _], [visitingScore, __]] }) =>
                                                `${homeScore}:${visitingScore}`,
                                        )
                                        .join(', ')}
                                </td>
                                <td className="p-1">
                                    <div className="flex justify-start items-center gap-1">
                                        <span>{visitingTeam?.abbrev}</span>
                                        {visitingTeam?.id && visitingTeam.id === winner?.id && (
                                            <TrophyIcon className="text-kfc-teal h-6" />
                                        )}
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export interface GroupsMatchesProps {
    matchesByGroup: GroupMatches[];
}

export function GroupsMatches({ matchesByGroup }: GroupsMatchesProps) {
    return (
        <div className="grid gap-10 grid-cols-1 sm:grid-cols-2 xl:grid-cols-4">
            {matchesByGroup?.map(({ group, matches }) => (
                <GroupMatchesCard key={group.id} group={group} matches={matches} />
            ))}
        </div>
    );
}
