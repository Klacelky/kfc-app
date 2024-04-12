export interface PageParams<TParams> {
    params: TParams;
    searchParams: { [key: string]: string | string[] | undefined };
}
