import { ErrorResponse, ZodErrorResponse } from '@/utils/server/common';
import classNames from 'classnames';
import { ForwardRefRenderFunction, InputHTMLAttributes, ReactNode, Ref, SelectHTMLAttributes, forwardRef } from 'react';

interface BaseControlProps {
    name: string;
    label?: ReactNode;
    error?: string;
    issues?: ErrorResponse;
    className?: string;
}

function BaseControl<TControl, TControlProps extends BaseControlProps, T>(
    Control: ForwardRefRenderFunction<TControl, TControlProps>,
) {
    const component = forwardRef(function (props: TControlProps, ref: Ref<TControl>) {
        const { issues, label, error, name, className } = props;
        const zodError = issues as ZodErrorResponse<T>;
        return (
            <div className={classNames("flex gap-2 flex-col", className)}>
                {label ? <label>{label}</label> : null}
                {Control(props, ref)}
                {error || zodError?.issues[name] ? (
                    <span className="text-admin-danger text-sm">{error || zodError?.issues[name]}</span>
                ) : null}
            </div>
        );
    });
    component.displayName = 'BaseControl';
    return component;
}

export interface InputProps extends BaseControlProps, Omit<InputHTMLAttributes<HTMLInputElement>, 'name'> {
    placeholder?: string;
}

export const Input = BaseControl(function ({ name, error, ...rest }: InputProps, ref: Ref<HTMLInputElement>) {
    return (
        <input
            name={name}
            {...rest}
            ref={ref}
            className={classNames('border-2 p-1 px-2', { 'border-red-500': !!error })}
        />
    );
});
Input.displayName = 'Input';

export interface SelectProps extends BaseControlProps, Omit<SelectHTMLAttributes<HTMLSelectElement>, 'name'> {}

export const Select = BaseControl(function ({ error, children, ...rest }: SelectProps, ref: Ref<HTMLSelectElement>) {
    return (
        <select {...rest} ref={ref} className={classNames('border-2 p-1 px-2', { 'border-red-500': !!error })}>
            {children}
        </select>
    );
});
Select.displayName = 'Select';
