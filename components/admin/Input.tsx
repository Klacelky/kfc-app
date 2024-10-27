import classNames from 'classnames';
import { HTMLInputTypeAttribute, InputHTMLAttributes, ReactNode, SelectHTMLAttributes } from 'react';
import { FieldPath, FieldValues, UseFormRegisterReturn } from 'react-hook-form';

import { callOptional } from '@/utils/common';

type BaseControlProps<TInputProps, TFieldValues extends FieldValues> = {
    label?: ReactNode;
    error?: string;
    className?: string;
    inputProps?: TInputProps;
    register?: () => UseFormRegisterReturn<FieldPath<TFieldValues>>;
};

type ControlWrapperProps<TInputProps, TFieldValues extends FieldValues> = BaseControlProps<
    TInputProps,
    TFieldValues
> & {
    children: ReactNode;
    labelClassName?: string;
};

function ControlWrapper<TInputProps, TFieldValues extends FieldValues>({
    children,
    label,
    error,
    className,
    labelClassName,
}: ControlWrapperProps<TInputProps, TFieldValues>) {
    return (
        <div className={classNames('flex gap-2 flex-col', className)}>
            {label && <label className={labelClassName}>{label}</label>}
            {children}
            {error && <span className="text-admin-danger text-sm">{error}</span>}
        </div>
    );
}

export type InputProps<TFieldValues extends FieldValues> = BaseControlProps<
    InputHTMLAttributes<HTMLInputElement>,
    TFieldValues
> & {
    type: HTMLInputTypeAttribute;
};

export function Input<TFieldValues extends FieldValues>(props: InputProps<TFieldValues>) {
    const { register, inputProps, error, type, ...wrapperProps } = props;
    return (
        <ControlWrapper error={error} {...wrapperProps}>
            <input
                type={type}
                {...inputProps}
                {...callOptional(register)}
                className={classNames('border-2 p-1 px-2', { 'border-red-500': !!error }, inputProps?.className)}
            />
        </ControlWrapper>
    );
}

export type SelectProps<TFieldValues extends FieldValues> = BaseControlProps<
    SelectHTMLAttributes<HTMLSelectElement>,
    TFieldValues
> & {
    children?: ReactNode;
};

export function Select<TFieldValues extends FieldValues>(props: SelectProps<TFieldValues>) {
    const { register, inputProps, error, children, ...wrapperProps } = props;
    return (
        <ControlWrapper error={error} {...wrapperProps}>
            <select
                {...inputProps}
                {...callOptional(register)}
                className={classNames('border-2 p-1 px-2', { 'border-red-500': !!error })}
            >
                {children}
            </select>
        </ControlWrapper>
    );
}

export type CheckboxProps<TFieldValues extends FieldValues> = BaseControlProps<
    InputHTMLAttributes<HTMLInputElement>,
    TFieldValues
>;

export function Checkbox<TFieldValues extends FieldValues>(props: CheckboxProps<TFieldValues>) {
    const { register, inputProps, label, ...wrapperProps } = props;
    return (
        <ControlWrapper
            {...wrapperProps}
            labelClassName="flex flex-row gap-2 items-center"
            label={
                <>
                    <input {...inputProps} {...callOptional(register)} type="checkbox" className="w-7 h-7" />
                    {label}
                </>
            }
        >
            {null}
        </ControlWrapper>
    );
}
