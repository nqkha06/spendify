import ExpenseLayout from '@/components/expense-tracker/layout';
import type {
    ExpenseCategory,
    ExpenseNavigationItem,
    ExpenseProfile,
    ExpenseTransaction,
    ExpenseWallet,
} from '@/types/expense-tracker';

interface DashboardProps {
    navigation: ExpenseNavigationItem[];
    profile: ExpenseProfile;
    data: {
        categories: ExpenseCategory[];
        wallets: ExpenseWallet[];
        transactions: ExpenseTransaction[];
        metrics: {
            totalBalance: number;
            totalIncome: number;
            totalExpense: number;
        };
        cashFlow: Array<{
            name: string;
            value: number;
        }>;
    };
}

const currency = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
});

export default function Dashboard({ navigation, profile, data }: DashboardProps) {
    const recentTransactions = [...data.transactions].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 5);

    return (
        <ExpenseLayout
            title="Expense Dashboard"
            heading="Financial Overview"
            description="Overview cards and recent transactions fed by Laravel mock props."
            activePath="/expense-tracker/dashboard"
            navigation={navigation}
            profile={profile}
        >
            <div className="grid gap-4 md:grid-cols-3">
                <article className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                    <p className="text-sm text-slate-500">Total Balance</p>
                    <p className="mt-1 text-2xl font-bold text-slate-900">{currency.format(data.metrics.totalBalance)}</p>
                </article>
                <article className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                    <p className="text-sm text-slate-500">Total Income</p>
                    <p className="mt-1 text-2xl font-bold text-emerald-700">{currency.format(data.metrics.totalIncome)}</p>
                </article>
                <article className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                    <p className="text-sm text-slate-500">Total Expense</p>
                    <p className="mt-1 text-2xl font-bold text-rose-700">{currency.format(data.metrics.totalExpense)}</p>
                </article>
            </div>

            <div className="mt-6 grid gap-4 lg:grid-cols-2">
                <article className="rounded-xl border border-slate-200 p-4">
                    <h2 className="text-base font-semibold text-slate-900">Cash Flow</h2>
                    <div className="mt-4 space-y-3">
                        {data.cashFlow.map((item) => {
                            const width = Math.max(10, Math.round(item.value / 40));

                            return (
                                <div key={item.name}>
                                    <div className="mb-1 flex items-center justify-between text-xs text-slate-500">
                                        <span>{item.name}</span>
                                        <span>{currency.format(item.value)}</span>
                                    </div>
                                    <div className="h-2 rounded-full bg-slate-100">
                                        <div className="h-2 rounded-full bg-blue-500" style={{ width: `${width}%` }} />
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </article>

                <article className="rounded-xl border border-slate-200 p-4">
                    <h2 className="text-base font-semibold text-slate-900">Recent Transactions</h2>
                    <div className="mt-3 space-y-2">
                        {recentTransactions.map((transaction) => {
                            const category = data.categories.find((item) => item.id === transaction.categoryId);
                            const wallet = data.wallets.find((item) => item.id === transaction.walletId);
                            const sign = transaction.type === 'income' ? '+' : '-';

                            return (
                                <div key={transaction.id} className="flex items-center justify-between rounded-lg bg-slate-50 p-3">
                                    <div>
                                        <p className="font-medium text-slate-900">{transaction.note ?? 'Transfer'}</p>
                                        <p className="text-xs text-slate-500">{category?.name ?? 'Unknown'} · {wallet?.name ?? 'Wallet'}</p>
                                    </div>
                                    <p className="text-sm font-semibold text-slate-900">
                                        {sign}
                                        {currency.format(transaction.amount)}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </article>
            </div>
        </ExpenseLayout>
    );
}
