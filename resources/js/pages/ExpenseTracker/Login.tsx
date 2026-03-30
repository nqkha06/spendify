import { FormEvent, useState } from 'react';
import ExpenseLayout from '@/components/expense-tracker/layout';
import type { ExpenseNavigationItem } from '@/types/expense-tracker';

interface LoginProps {
    navigation: ExpenseNavigationItem[];
    data: {
        demoAccount: {
            email: string;
            password: string;
        };
    };
}

export default function Login({ navigation, data }: LoginProps) {
    const [credentials, setCredentials] = useState({
        email: data.demoAccount.email,
        password: data.demoAccount.password,
    });
    const [status, setStatus] = useState<string>('');

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setStatus('Mock login successful. No API call was triggered.');
    };

    return (
        <ExpenseLayout
            title="Expense Tracker Login"
            heading="Login"
            description="Demo login page for migrated static UI."
            activePath="/expense-tracker/login"
            navigation={navigation}
            showSidebar={false}
        >
            <div className="mx-auto max-w-md rounded-xl border border-slate-200 p-5">
                <p className="text-sm text-slate-600">
                    Demo account: <span className="font-semibold">{data.demoAccount.email}</span> /{' '}
                    <span className="font-semibold">{data.demoAccount.password}</span>
                </p>

                <form onSubmit={handleSubmit} className="mt-4 space-y-3">
                    <input
                        type="email"
                        value={credentials.email}
                        onChange={(event) =>
                            setCredentials((previous) => ({ ...previous, email: event.target.value }))
                        }
                        className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
                    />
                    <input
                        type="password"
                        value={credentials.password}
                        onChange={(event) =>
                            setCredentials((previous) => ({ ...previous, password: event.target.value }))
                        }
                        className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
                    />
                    <button type="submit" className="w-full rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white">
                        Sign in
                    </button>
                </form>

                {status ? <p className="mt-3 text-sm text-emerald-700">{status}</p> : null}
            </div>
        </ExpenseLayout>
    );
}
