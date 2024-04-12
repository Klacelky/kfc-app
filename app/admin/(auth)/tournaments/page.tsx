import { redirect } from 'next/navigation';
import { RouteParams as ParentRouteParams } from '../page';

export interface RouteParams extends ParentRouteParams {}

export default function TournamentsPage() {
    redirect('/admin');
}
