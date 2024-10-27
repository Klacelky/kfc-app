import GroupsPage from './groupsPage';
import PlayOffPage from './playoffPage';

import T from '@/utils/client/i18n/t';

export default function Podzim2023Page() {
    return (
        <>
            <h1>
                <T sk="Podzim 2023" en="Autumn 2023" />
            </h1>
            <GroupsPage />
            <PlayOffPage />
        </>
    );
}
