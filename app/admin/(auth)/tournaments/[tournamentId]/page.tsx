import { RouteParams as ParentRouteParams } from '../page';

export interface RouteParams extends ParentRouteParams {
    tournamentId: string;
}
