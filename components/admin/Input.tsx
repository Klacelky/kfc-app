import classNames from 'classnames';
import { InputHTMLAttributes, ReactNode } from 'react';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: ReactNode;
    error?: string;
    placeholder?: string;
}

export default function Input({ label, error, ...rest }: InputProps) {
    return (
        <div className="flex gap-2 flex-col">
            {label ? <label>{label}</label> : null}
            <input {...rest} className={classNames('border-2 p-1 px-2', { 'border-red-500': !!error })} />
            {error ? <span className="text-admin-danger text-sm">{error}</span> : null}
        </div>
    );
}
