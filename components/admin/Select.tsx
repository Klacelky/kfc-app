import classNames from 'classnames';
import { ReactNode, SelectHTMLAttributes } from 'react';

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
    label?: ReactNode;
    error?: string;
}

export default function Select({ label, error, children, ...rest }: SelectProps) {
    return (
        <div className="flex gap-2 flex-col">
            {label ? <label>{label}</label> : null}
            <select {...rest} className={classNames('border-2 p-1 px-2', { 'border-red-500': !!error })}>
                {children}
            </select>
            {error ? <span className="text-admin-danger text-sm">{error}</span> : null}
        </div>
    );
}
