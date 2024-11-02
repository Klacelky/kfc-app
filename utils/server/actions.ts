import { redirect } from 'next/navigation';

import { Return } from '../common';

import { ActionAuthOptions, getAuth } from './auth';
import { handleError } from './common';

import { AuthAdmin } from '@/dtos/auth';

export function handleAction<TActionProps, TActionReturn>(
    actionFn: (props: TActionProps, auth?: AuthAdmin) => Promise<TActionReturn>,
    authOptions?: ActionAuthOptions,
): (props: TActionProps) => Promise<Return<TActionReturn>> {
    return async function (props: TActionProps): Promise<Return<TActionReturn>> {
        const auth = await getAuth(authOptions || {});
        if (auth === 'nologin') {
            return redirect('/admin/login?error=401');
        }
        if (auth === 'nosu') {
            return redirect('/admin/login?error=403');
        }
        return await handleError(() => actionFn(props, auth));
    };
}

export function handleActionWithAnother<TActionProps, TIntermediate, TActionReturn>(
    actionFn: (props: TActionProps) => Promise<TIntermediate>,
    anotherFn: (props: TIntermediate) => Promise<TActionReturn>,
    authOptions?: ActionAuthOptions,
): (props: TActionProps) => Promise<Return<TActionReturn>> {
    const handledActionFn = handleAction(actionFn, authOptions);
    return async function (props: TActionProps): Promise<Return<TActionReturn>> {
        const { data, error } = await handledActionFn(props);
        if (error) {
            return { error: error };
        }
        return { data: await anotherFn(data) };
    };
}
