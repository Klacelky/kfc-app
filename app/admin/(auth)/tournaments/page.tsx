import { redirect } from 'next/navigation';

import { RouteParams as ParentRouteParams } from '../page';

export type RouteParams = ParentRouteParams;

export default function TournamentsPage() {
    redirect('/admin');
}
