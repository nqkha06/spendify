import { useMemo, useState } from 'react';
import ExpenseLayout from '@/components/expense-tracker/layout';
import type {
    ExpenseCategory,
    ExpenseNavigationItem,
    ExpenseProfile,
    ExpenseTransaction,
    ExpenseWallet,
} from '@/types/expense-tracker';

interface WalletsProps {
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

export default function Wallets({ navigation, profile, data }: WalletsProps) {
    const [selectedWalletId, setSelectedWalletId] = useState(data.wallets[0]?.id ?? '');

    const selectedWalletTransactions = useMemo(() => {
        return data.transactions
            .filter((item) => item.walletId === selectedWalletId)
            .sort((a, b) => b.date.localeCompare(a.date));
    }, [data.transactions, selectedWalletId]);

    return (
        <ExpenseLayout
            title="Expense Wallets"
            heading="Wallets"
            description="Select a wallet and inspect its local transaction history."
            activePath="/expense-tracker/wallets"
            navigation={navigation}
            profile={profile}
        >
            <div className="grid gap-4 md:grid-cols-3">
                {data.wallets.map((wallet) => {
                    const isSelected = wallet.id === selectedWalletId;
                    return (
                        <button
                            key={wallet.id}
                            onClick={() => setSelectedWalletId(wallet.id)}
                            className={[
                                'rounded-xl border p-4 text-left transition-colors',
                                isSelected ? 'border-blue-600 bg-blue-50' : 'border-slate-200 bg-white hover:bg-slate-50',
                            ].join(' ')}
                        >
                            <p className="text-xs uppercase tracking-wide text-slate-500">{wallet.type}</p>
                            <p className="mt-1 font-semibold text-slate-900">{wallet.name}</p>
                            <p className="mt-2 text-lg font-bold text-slate-900">{currency.format(wallet.balance)}</p>
                        </button>
                    );
                })}
            </div>

            <div className="mt-6 rounded-xl border border-slate-200 p-4">
                <h2 className="text-base font-semibold text-slate-900">Transaction History</h2>
                <div className="mt-3 space-y-2">
                    {selectedWalletTransactions.length === 0 ? (
                        <p className="text-sm text-slate-500">No transactions for this wallet.</p>
                    ) : (
                        selectedWalletTransactions.map((transaction) => {
                            const category = data.categories.find((item) => item.id === transaction.categoryId);
                            const sign = transaction.type === 'income' ? '+' : '-';

                            return (
                                <div key={transaction.id} className="flex items-center justify-between rounded-lg bg-slate-50 p-3">
                                    <div>
                                        <p className="font-medium text-slate-900">{transaction.note ?? 'Transfer'}</p>
                                        <p className="text-xs text-slate-500">{category?.name ?? 'Category'} · {transaction.date}</p>
                                    </div>
                                    <p className="text-sm font-semibold text-slate-900">
                                        {sign}
                                        {currency.format(transaction.amount)}
                                    </p>
                                </div>
                            );
                        })
                    )}
                </div>
            </div>
        </ExpenseLayout>
    );
}
