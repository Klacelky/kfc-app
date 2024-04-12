import classNames from 'classnames';
import { ButtonHTMLAttributes, ReactNode } from 'react';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    color?: 'primary' | 'secondary' | 'danger';
    children?: ReactNode;
}

export default function Button({ children, color, className, ...props }: ButtonProps) {
    return (
        <button
            {...props}
            className={classNames(
                'block p-2 text-center',
                {
                    'bg-blue-600 text-white': color === 'primary',
                    'bg-slate-300 text-black': color === 'secondary',
                    'bg-red-600 text-white': color === 'danger',
                },
                'disabled:opacity-50',
                className,
            )}
        >
            {children}
        </button>
    );
}
