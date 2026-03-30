import { FormEvent, useMemo, useState } from 'react';
import ExpenseLayout from '@/components/expense-tracker/layout';
import type {
    ExpenseCategory,
    ExpenseNavigationItem,
    ExpenseProfile,
    ExpenseTransaction,
    ExpenseWallet,
} from '@/types/expense-tracker';

interface TransactionsProps {
    navigation: ExpenseNavigationItem[];
    profile: ExpenseProfile;
    data: {
        categories: ExpenseCategory[];
        wallets: ExpenseWallet[];
        transactions: ExpenseTransaction[];
    };
}

const currency = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
});

export default function Transactions({ navigation, profile, data }: TransactionsProps) {
    const [searchTerm, setSearchTerm] = useState('');
    const [filterType, setFilterType] = useState<'all' | 'income' | 'expense'>('all');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [status, setStatus] = useState('');

    const filteredTransactions = useMemo(() => {
        return data.transactions
            .filter((item) => {
                const matchesSearch = (item.note ?? '').toLowerCase().includes(searchTerm.toLowerCase());
                const matchesType = filterType === 'all' || item.type === filterType;
                return matchesSearch && matchesType;
            })
            .sort((a, b) => b.date.localeCompare(a.date));
    }, [data.transactions, filterType, searchTerm]);

    const handleMockSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setStatus('Transaction saved locally (mock mode).');
        setIsModalOpen(false);
    };

    return (
        <ExpenseLayout
            title="Expense Transactions"
            heading="Transactions"
            description="Search and filter transactions from mock props."
            activePath="/expense-tracker/transactions"
            navigation={navigation}
            profile={profile}
        >
            <div className="flex flex-col gap-3 sm:flex-row">
                <input
                    value={searchTerm}
                    onChange={(event) => setSearchTerm(event.target.value)}
                    placeholder="Search by note"
                    className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
                />
                <select
                    value={filterType}
                    onChange={(event) => setFilterType(event.target.value as 'all' | 'income' | 'expense')}
                    className="rounded-lg border border-slate-200 px-3 py-2 text-sm"
                >
                    <option value="all">All</option>
                    <option value="income">Income</option>
                    <option value="expense">Expense</option>
                </select>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white"
                >
                    Add Transaction
                </button>
            </div>

            {status ? <p className="mt-3 text-sm text-emerald-700">{status}</p> : null}

            <div className="mt-4 overflow-x-auto rounded-xl border border-slate-200">
                <table className="min-w-full text-left text-sm">
                    <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                        <tr>
                            <th className="px-4 py-3">Note</th>
                            <th className="px-4 py-3">Category</th>
                            <th className="px-4 py-3">Wallet</th>
                            <th className="px-4 py-3">Date</th>
                            <th className="px-4 py-3 text-right">Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredTransactions.map((transaction) => {
                            const category = data.categories.find((item) => item.id === transaction.categoryId);
                            const wallet = data.wallets.find((item) => item.id === transaction.walletId);
                            const sign = transaction.type === 'income' ? '+' : '-';

                            return (
                                <tr key={transaction.id} className="border-t border-slate-100">
                                    <td className="px-4 py-3 font-medium text-slate-900">{transaction.note ?? 'Transfer'}</td>
                                    <td className="px-4 py-3 text-slate-600">{category?.name ?? 'Unknown'}</td>
                                    <td className="px-4 py-3 text-slate-600">{wallet?.name ?? 'Wallet'}</td>
                                    <td className="px-4 py-3 text-slate-600">{transaction.date}</td>
                                    <td className="px-4 py-3 text-right font-semibold text-slate-900">
                                        {sign}
                                        {currency.format(transaction.amount)}
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>

            {isModalOpen ? (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4">
                    <form onSubmit={handleMockSubmit} className="w-full max-w-md rounded-xl bg-white p-5 shadow-xl">
                        <h2 className="text-lg font-semibold text-slate-900">Add Transaction</h2>
                        <p className="mt-1 text-sm text-slate-500">Mock submit only, no backend write.</p>
                        <div className="mt-4 space-y-3">
                            <input className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm" placeholder="Amount" />
                            <select className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm">
                                {data.categories.map((category) => (
                                    <option key={category.id}>{category.name}</option>
                                ))}
                            </select>
                            <input className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm" placeholder="Note" />
                        </div>
                        <div className="mt-5 flex justify-end gap-2">
                            <button
                                type="button"
                                onClick={() => setIsModalOpen(false)}
                                className="rounded-lg border border-slate-200 px-4 py-2 text-sm"
                            >
                                Cancel
                            </button>
                            <button type="submit" className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white">
                                Save
                            </button>
                        </div>
                    </form>
                </div>
            ) : null}
        </ExpenseLayout>
    );
}
