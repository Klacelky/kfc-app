import { redirect } from 'next/navigation';

import { RouteParams as ParentRouteParams } from '../page';

export type RouteParams = ParentRouteParams & {
    tournamentId: string;
};

export default function TournamentPage() {
    redirect('/admin');
}
