import { redirect } from 'next/navigation';

import { RouteParams as ParentRouteParams } from '../page';

export interface RouteParams extends ParentRouteParams {
    tournamentId: string;
}

export default function TournamentPage() {
    redirect('/admin');
}
