import { NextRequest } from 'next/server';
import { MatchCreateDtoSchema, MatchQueryDtoSchema } from '@/dtos/match';
import { createMatch, listMatches } from '@/services/matches';
import { handle } from '@/utils/api';
import { getQueryObject } from '@/utils/query';
import { RouteParams as ParentRouteParams } from '../route';

export interface RouteParams extends ParentRouteParams {}

export const GET = handle(async (request: NextRequest, { tournamentIdOrSlug }: RouteParams) => {
    const query = await MatchQueryDtoSchema.parseAsync(getQueryObject(request));
    return Response.json(await listMatches(tournamentIdOrSlug, query));
});

export const POST = handle(async (request: Request) => {
    const data = await MatchCreateDtoSchema.parseAsync(await request.json());
    return Response.json(await createMatch(data), { status: 201 });
});
