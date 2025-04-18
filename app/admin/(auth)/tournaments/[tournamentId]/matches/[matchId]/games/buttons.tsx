'use client';

import { finishMatchAction, newGameAction } from './actions';

import Button from '@/components/admin/Button';
import { useLoadingAction } from '@/utils/client/api';

export type MatchGameButtonsProps = {
    matchId: string;
};

export function MatchGameButtons({ matchId }: MatchGameButtonsProps) {
    const [newGame, newGameLoading] = useLoadingAction(() => newGameAction(matchId));
    const [finishMatch, finishMatchLoading] = useLoadingAction(() => finishMatchAction(matchId));

    return (
        <div className="flex flex-row justify-between">
            <Button color="primary" onClick={newGame} disabled={newGameLoading}>
                New Game
            </Button>
            <Button color="danger" onClick={finishMatch} disabled={finishMatchLoading}>
                Finish Match
            </Button>
        </div>
    );
}
