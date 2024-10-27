import { NextRequest } from 'next/server';

import { RouteParams as ParentRouteParams } from '../route';

import { MatchCreateDtoSchema, MatchQueryDtoSchema } from '@/dtos/match';
import { createMatch, listMatches } from '@/services/matches';
import { RouteContext, auth, handle } from '@/utils/server/api';
import { getQueryObject } from '@/utils/server/query';

export interface RouteParams extends ParentRouteParams {}

export const GET = handle(
    async (request: NextRequest, { params: { tournamentIdOrSlug } }: RouteContext<RouteParams>) => {
        const query = await MatchQueryDtoSchema.parseAsync(getQueryObject(request));
        return Response.json(await listMatches(tournamentIdOrSlug, query));
    },
);

export const POST = handle(
    auth({}, async (request: Request, {params: {tournamentIdOrSlug}}: RouteContext<RouteParams>) => {
        const data = await MatchCreateDtoSchema.parseAsync(await request.json());
        return Response.json(await createMatch(tournamentIdOrSlug, data), { status: 201 });
    }),
);
