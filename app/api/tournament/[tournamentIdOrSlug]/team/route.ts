import { NextRequest } from 'next/server';

import { RouteParams as ParentRouteParams } from '../route';

import { TeamCreateDtoSchema, TeamQueryDtoSchema } from '@/dtos/team';
import { createTeam, listTeams } from '@/services/teams';
import { RouteContext, auth, handle } from '@/utils/server/api';
import { getQueryObject } from '@/utils/server/query';

export interface RouteParams extends ParentRouteParams {}

export const GET = handle(
    async (request: NextRequest, { params: { tournamentIdOrSlug } }: RouteContext<RouteParams>) => {
        const query = await TeamQueryDtoSchema.parseAsync(getQueryObject(request));
        return Response.json(await listTeams(tournamentIdOrSlug, query));
    },
);

export const POST = handle(
    auth({}, async (request: Request, { params: { tournamentIdOrSlug } }: RouteContext<RouteParams>) => {
        const data = await TeamCreateDtoSchema.parseAsync(await request.json());
        return Response.json(await createTeam(tournamentIdOrSlug, data), { status: 201 });
    }),
);
