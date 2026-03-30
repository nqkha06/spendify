import { FormEvent, useState } from 'react';
import ExpenseLayout from '@/components/expense-tracker/layout';
import type { ExpenseNavigationItem, ExpenseProfile } from '@/types/expense-tracker';

interface SettingsProps {
    navigation: ExpenseNavigationItem[];
    profile: ExpenseProfile;
    data: {
        currencies: string[];
        profile: {
            firstName: string;
            lastName: string;
            email: string;
            currency: string;
        };
    };
}

export default function Settings({ navigation, profile, data }: SettingsProps) {
    const [formState, setFormState] = useState(data.profile);
    const [status, setStatus] = useState('');

    const handleSave = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setStatus('Profile updated locally with mock state only.');
    };

    return (
        <ExpenseLayout
            title="Expense Settings"
            heading="Settings"
            description="Form interactions are managed locally using React state."
            activePath="/expense-tracker/settings"
            navigation={navigation}
            profile={profile}
        >
            <form onSubmit={handleSave} className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                        <label className="mb-1 block text-sm font-medium text-slate-700">First Name</label>
                        <input
                            value={formState.firstName}
                            onChange={(event) =>
                                setFormState((previous) => ({ ...previous, firstName: event.target.value }))
                            }
                            className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
                        />
                    </div>
                    <div>
                        <label className="mb-1 block text-sm font-medium text-slate-700">Last Name</label>
                        <input
                            value={formState.lastName}
                            onChange={(event) =>
                                setFormState((previous) => ({ ...previous, lastName: event.target.value }))
                            }
                            className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
                        />
                    </div>
                </div>

                <div>
                    <label className="mb-1 block text-sm font-medium text-slate-700">Email</label>
                    <input
                        type="email"
                        value={formState.email}
                        onChange={(event) =>
                            setFormState((previous) => ({ ...previous, email: event.target.value }))
                        }
                        className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
                    />
                </div>

                <div>
                    <label className="mb-1 block text-sm font-medium text-slate-700">Currency</label>
                    <select
                        value={formState.currency}
                        onChange={(event) =>
                            setFormState((previous) => ({ ...previous, currency: event.target.value }))
                        }
                        className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
                    >
                        {data.currencies.map((currency) => (
                            <option key={currency}>{currency}</option>
                        ))}
                    </select>
                </div>

                <button type="submit" className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white">
                    Save Changes
                </button>

                {status ? <p className="text-sm text-emerald-700">{status}</p> : null}
            </form>
        </ExpenseLayout>
    );
}
