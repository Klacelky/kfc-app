import { CheckCircleIcon, ExclamationCircleIcon } from '@heroicons/react/16/solid';
import classNames from 'classnames';
import { ReactNode } from 'react';

export type AlertProps = {
    type?: 'error' | 'success';
    children: ReactNode;
};

export default function Alert({ type, children }: AlertProps) {
    return (
        <div
            className={classNames('p-4 flex flex-row gap-2 items-center text-white font-bold', {
                'bg-red-600': !type || type === 'error',
                'bg-green-600': type === 'success',
            })}
        >
            {type === 'success' ? <CheckCircleIcon className="w-5" /> : <ExclamationCircleIcon className="w-5" />}
            {children}
        </div>
    );
}
