export type PageParams<TParams> = {
    params: TParams;
    searchParams: { [key: string]: string | string[] | undefined };
}
