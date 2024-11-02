'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { loginAction } from './actions';

import Alert from '@/components/Alert';
import Button from '@/components/admin/Button';
import { Input } from '@/components/admin/Input';
import { AuthLoginDto, AuthLoginDtoSchema } from '@/dtos/auth';

export default function LoginForm() {
    const {
        register,
        formState: { errors, isValid },
        handleSubmit,
        setError,
    } = useForm<AuthLoginDto>({
        mode: 'all',
        resolver: zodResolver(AuthLoginDtoSchema),
    });
    return (
        <form
            onSubmit={handleSubmit(async (formData) => {
                const response = await loginAction({ data: formData });
                if (response?.error) {
                    setError('root', { message: response.error.message });
                }
            })}
        >
            {errors.root && <Alert>{errors.root?.message}</Alert>}
            <div className="flex flex-col p-4 gap-4">
                <Input
                    register={() => register('username')}
                    type="text"
                    label="Username"
                    error={errors.username?.message}
                />
                <Input
                    register={() => register('password')}
                    type="password"
                    label="Password"
                    error={errors.password?.message}
                />
                <Button type="submit" color="primary" disabled={!isValid}>
                    Login
                </Button>
            </div>
        </form>
    );
}
