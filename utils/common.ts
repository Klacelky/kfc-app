import { MatchTeamTypeEnum } from '@/dtos/match';
import { MatchTeamType } from '@prisma/client';

export function teamHomeCmp(
    { type: type1 }: { type: MatchTeamType },
    { type: type2 }: { type: MatchTeamType },
): number {
    if (type1 === type2) {
        return 0;
    }
    return type1 === MatchTeamType.HOME ? -1 : 1;
}
