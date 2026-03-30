import ExpenseLayout from '@/components/expense-tracker/layout';
import type {
    ExpenseBudget,
    ExpenseCategory,
    ExpenseNavigationItem,
    ExpenseProfile,
} from '@/types/expense-tracker';

interface BudgetsProps {
    navigation: ExpenseNavigationItem[];
    profile: ExpenseProfile;
    data: {
        categories: ExpenseCategory[];
        budgets: ExpenseBudget[];
    };
}

const currency = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
});

export default function Budgets({ navigation, profile, data }: BudgetsProps) {
    const totalBudget = data.budgets.reduce((sum, item) => sum + item.limit, 0);
    const totalSpent = data.budgets.reduce((sum, item) => sum + item.spent, 0);
    const usageRate = totalBudget > 0 ? Math.round((totalSpent / totalBudget) * 100) : 0;

    return (
        <ExpenseLayout
            title="Expense Budgets"
            heading="Budgets"
            description="Track budget usage and overspending alerts with mock data."
            activePath="/expense-tracker/budgets"
            navigation={navigation}
            profile={profile}
        >
            <div className="grid gap-4 sm:grid-cols-3">
                <article className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                    <p className="text-xs uppercase tracking-wide text-slate-500">Total Limit</p>
                    <p className="mt-1 text-xl font-bold text-slate-900">{currency.format(totalBudget)}</p>
                </article>
                <article className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                    <p className="text-xs uppercase tracking-wide text-slate-500">Total Spent</p>
                    <p className="mt-1 text-xl font-bold text-slate-900">{currency.format(totalSpent)}</p>
                </article>
                <article className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                    <p className="text-xs uppercase tracking-wide text-slate-500">Usage</p>
                    <p className="mt-1 text-xl font-bold text-blue-700">{usageRate}%</p>
                </article>
            </div>

            <div className="mt-5 space-y-3">
                {data.budgets.map((budget) => {
                    const category = data.categories.find((item) => item.id === budget.categoryId);
                    const ratio = budget.limit > 0 ? Math.min(100, Math.round((budget.spent / budget.limit) * 100)) : 0;

                    return (
                        <article key={budget.id} className="rounded-xl border border-slate-200 p-4">
                            <div className="flex flex-wrap items-center justify-between gap-2">
                                <p className="font-semibold text-slate-900">{category?.name ?? 'Unknown Category'}</p>
                                <p className="text-sm text-slate-600">
                                    {currency.format(budget.spent)} / {currency.format(budget.limit)}
                                </p>
                            </div>
                            <div className="mt-3 h-2 rounded-full bg-slate-100">
                                <div className="h-2 rounded-full bg-blue-600" style={{ width: `${ratio}%` }} />
                            </div>
                            <p className="mt-2 text-xs text-slate-500">{ratio}% used</p>
                        </article>
                    );
                })}
            </div>
        </ExpenseLayout>
    );
}
