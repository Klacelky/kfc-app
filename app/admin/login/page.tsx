'use client';

import { Input } from '@/components/admin/Input';
import Button from '@/components/admin/Button';
import { useForm } from 'react-hook-form';
import { AuthAdmin, AuthLoginDto, AuthLoginDtoSchema } from '@/dtos/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { api, handleApiCall } from '@/utils/client/api';
import { useState } from 'react';
import Alert from '@/components/admin/Alert';
import { useRouter } from 'next/navigation';

export default function AdminLoginPage() {
    const { replace } = useRouter();
    const [error, setError] = useState('');
    const {
        register,
        formState: { errors, isValid },
        handleSubmit,
    } = useForm<AuthLoginDto>({
        mode: 'all',
        resolver: zodResolver(AuthLoginDtoSchema),
    });
    return (
        <form
            onSubmit={handleSubmit(async (formData) => {
                const { error } = await handleApiCall<AuthAdmin>(() => api.post('/api/auth', formData));
                if (error) {
                    setError(error?.message || error.error || 'Unknown error');
                } else {
                    replace('/admin');
                }
            })}
        >
            {error && <Alert>{error}</Alert>}
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
