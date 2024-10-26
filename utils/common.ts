export function callOptional<TReturn>(fn?: () => TReturn): TReturn | {} {
    return fn ? fn() : {};
}
