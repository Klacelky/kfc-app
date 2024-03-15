import { NextRequest } from 'next/server';
import { TeamCreateDtoSchema, TeamQueryDtoSchema } from '@/dtos/team';
import { createTeam, listTeams } from '@/services/teams';
import { getQueryObject } from '@/utils/query';
import { handle } from '../../../errors';
import { RouteParams as TournamentRouteParams } from '../route';

export interface RouteParams extends TournamentRouteParams {}

export interface RouteContext {
    params: RouteParams;
}

export const GET = handle(async (request: NextRequest, { params: { idOrSlug } }: RouteContext) => {
    const query = await TeamQueryDtoSchema.parseAsync(getQueryObject(request));
    return Response.json(await listTeams(idOrSlug, query));
});

export const POST = handle(async (request: Request, { params: { idOrSlug } }: RouteContext) => {
    const data = await TeamCreateDtoSchema.parseAsync(await request.json());
    return Response.json(await createTeam(idOrSlug, data), { status: 201 });
});
