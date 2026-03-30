import ExpenseLayout from '@/components/expense-tracker/layout';
import type { ExpenseNavigationItem, ExpenseProfile } from '@/types/expense-tracker';

interface AboutProps {
    navigation: ExpenseNavigationItem[];
    profile: ExpenseProfile;
    data: {
        overview: string;
        stats: Array<{
            label: string;
            value: number;
        }>;
        values: string[];
    };
}

export default function About({ navigation, profile, data }: AboutProps) {
    return (
        <ExpenseLayout
            title="About Expense Tracker"
            heading="About This Migration"
            description="Static UI from React has been reorganized into reusable Inertia pages and components."
            activePath="/expense-tracker/about"
            navigation={navigation}
            profile={profile}
        >
            <p className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700">{data.overview}</p>

            <div className="mt-6 grid gap-4 sm:grid-cols-3">
                {data.stats.map((stat) => (
                    <article key={stat.label} className="rounded-xl border border-slate-200 p-4">
                        <p className="text-xs uppercase tracking-wide text-slate-500">{stat.label}</p>
                        <p className="mt-1 text-2xl font-bold text-slate-900">{stat.value}</p>
                    </article>
                ))}
            </div>

            <ul className="mt-6 space-y-3">
                {data.values.map((value) => (
                    <li key={value} className="rounded-lg bg-slate-100 px-4 py-3 text-sm text-slate-700">
                        {value}
                    </li>
                ))}
            </ul>
        </ExpenseLayout>
    );
}
