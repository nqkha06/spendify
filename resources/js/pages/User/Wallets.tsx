import { useState } from 'react';
import type { FormEvent } from 'react';
import { Plus, Landmark, Wallet as WalletIcon, CreditCard, ArrowDownRight, DollarSign, MoreVertical } from 'lucide-react';
import { useForm } from '@inertiajs/react';
import ExpenseLayout from '@/components/expense-tracker/layout';
import { MOCK_WALLETS, MOCK_TRANSACTIONS, MOCK_CATEGORIES } from '@/lib/mock-data';
import expense from '@/routes/expense';
import type {
  ExpenseCategory,
  ExpenseNavigationItem,
  ExpenseProfile,
  ExpenseTransaction,
  ExpenseWallet,
} from '@/types/expense-tracker';
import { format, parseISO } from 'date-fns';

interface WalletsProps {
  navigation: ExpenseNavigationItem[];
  profile?: ExpenseProfile;
  data?: {
    wallets?: ExpenseWallet[];
    categories?: ExpenseCategory[];
    transactions?: ExpenseTransaction[];
  };
}

export default function Wallets({ navigation, profile, data }: WalletsProps) {
  const wallets = data?.wallets ?? MOCK_WALLETS;
  const categories = data?.categories ?? MOCK_CATEGORIES;
  const transactions = data?.transactions ?? MOCK_TRANSACTIONS;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedWalletId, setSelectedWalletId] = useState<string>(wallets[0]?.id ?? '');
  const selectedWallet = wallets.find((wallet) => wallet.id === selectedWalletId);

  const { data: formData, setData, post, processing, errors, reset } = useForm({
    name: '',
    currency: 'VND',
    opening_balance: '0',
    is_default: false,
  });

  const closeModal = () => {
    setIsModalOpen(false);
    reset();
  };

  const submitWallet = (event: FormEvent) => {
    event.preventDefault();

    post(expense.wallets().url, {
      preserveScroll: true,
      onSuccess: () => {
        closeModal();
      },
    });
  };

  const getWalletIcon = (type: string) => {
    switch (type) {
      case 'bank': return <Landmark className="w-6 h-6" />;
      case 'credit': return <CreditCard className="w-6 h-6" />;
      default: return <WalletIcon className="w-6 h-6" />;
    }
  };

  const getWalletColor = (type: string) => {
    switch (type) {
      case 'bank': return 'bg-indigo-50 text-indigo-600 border-indigo-100';
      case 'credit': return 'bg-rose-50 text-rose-600 border-rose-100';
      default: return 'bg-emerald-50 text-emerald-600 border-emerald-100';
    }
  };

  const totalBalance = wallets.reduce((acc, wallet) => acc + wallet.balance, 0);

  const walletTransactions = transactions.filter(tx => tx.walletId === selectedWalletId)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <ExpenseLayout
      title="Wallets"
      heading="Wallets"
      description="Manage cash, bank, and card balances in one place."
      activePath="/user/wallets"
      navigation={navigation}
      profile={profile}
    >
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Wallets</h1>
          <p className="text-slate-500 text-sm">Total Balance: <span className="font-bold text-slate-900">${totalBalance.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span></p>
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-xl font-medium flex items-center gap-2 transition-colors shadow-sm shadow-primary-500/30"
          >
            <Plus className="w-4 h-4" />
            Add Wallet
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {wallets.length === 0 ? (
          <div className="col-span-full rounded-2xl border border-dashed border-slate-200 bg-white p-10 text-center text-slate-500">
            <p className="text-lg font-semibold text-slate-800">No wallets yet</p>
            <p className="mt-1 text-sm">Add your first wallet to start tracking balances.</p>
          </div>
        ) : (
          wallets.map(wallet => {
            const isSelected = wallet.id === selectedWalletId;
            const isNegative = wallet.balance < 0;
            return (
              <div
                key={wallet.id}
                onClick={() => setSelectedWalletId(wallet.id)}
                className={`bg-white rounded-2xl p-6 border-2 cursor-pointer transition-all duration-200 relative overflow-hidden ${
                  isSelected ? 'border-primary-500 shadow-md ring-4 ring-primary-500/10' : 'border-slate-100 shadow-sm hover:border-primary-200 hover:shadow-md'
                }`}
              >
                {isSelected && <div className="absolute top-0 right-0 w-16 h-16 bg-linear-to-bl from-primary-100 to-transparent -mr-8 -mt-8 rounded-full"></div>}

                <div className="flex justify-between items-start mb-6 relative">
                  <div className={`p-3 rounded-xl border ${getWalletColor(wallet.type)}`}>
                    {getWalletIcon(wallet.type)}
                  </div>
                  <button className="text-slate-400 hover:text-slate-600 transition-colors p-1" onClick={(e) => e.stopPropagation()}>
                    <MoreVertical className="w-5 h-5" />
                  </button>
                </div>

                <div>
                  <p className="text-sm font-medium text-slate-500 mb-1">{wallet.name}</p>
                  <h3 className={`text-2xl font-bold ${isNegative ? 'text-danger-600' : 'text-slate-900'}`}>
                    ${wallet.balance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  </h3>
                  <p className="text-xs text-slate-400 uppercase tracking-wider mt-2">{wallet.type} account</p>
                </div>
              </div>
            );
          })
        )}
      </div>

      {isModalOpen ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-lg overflow-hidden rounded-2xl bg-white shadow-xl animate-in slide-in-from-bottom-4 duration-300">
            <div className="flex items-center justify-between border-b border-slate-100 p-5">
              <h2 className="text-xl font-bold text-slate-900">Add Wallet</h2>
              <button
                type="button"
                onClick={closeModal}
                className="rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600"
              >
                <MoreVertical className="h-5 w-5 rotate-90" />
              </button>
            </div>

            <form onSubmit={submitWallet} className="space-y-4 p-5">
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">Wallet Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(event) => setData('name', event.target.value)}
                  placeholder="Cash Wallet"
                  className="block w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-slate-900 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                />
                {errors.name ? <p className="mt-1 text-xs text-danger-600">{errors.name}</p> : null}
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block text-sm font-medium text-slate-700">Currency</label>
                  <input
                    type="text"
                    value={formData.currency}
                    onChange={(event) => setData('currency', event.target.value.toUpperCase())}
                    placeholder="VND"
                    maxLength={3}
                    className="block w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-slate-900 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                  />
                  {errors.currency ? <p className="mt-1 text-xs text-danger-600">{errors.currency}</p> : null}
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium text-slate-700">Opening Balance</label>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.opening_balance}
                    onChange={(event) => setData('opening_balance', event.target.value)}
                    className="block w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-slate-900 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                  />
                  {errors.opening_balance ? <p className="mt-1 text-xs text-danger-600">{errors.opening_balance}</p> : null}
                </div>
              </div>

              <label className="flex items-center gap-2 text-sm text-slate-600">
                <input
                  type="checkbox"
                  checked={formData.is_default}
                  onChange={(event) => setData('is_default', event.target.checked)}
                  className="h-4 w-4 rounded border-slate-300 text-primary-600 focus:ring-primary-500"
                />
                Set as default wallet
              </label>

              <div className="flex justify-end gap-3 border-t border-slate-100 pt-4">
                <button
                  type="button"
                  onClick={closeModal}
                  className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={processing}
                  className="rounded-xl bg-primary-600 px-5 py-2 text-sm font-medium text-white shadow-sm shadow-primary-500/30 transition-colors hover:bg-primary-700 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {processing ? 'Saving...' : 'Save Wallet'}
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : null}

      {/* Selected Wallet Details */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden mt-8">
        <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
          <h3 className="text-lg font-bold text-slate-900 tracking-tight">
            Transaction History <span className="text-sm font-normal text-slate-500 ml-2">({selectedWallet?.name ?? 'No wallet selected'})</span>
          </h3>
          <button className="text-sm font-medium text-primary-600 hover:text-primary-700 transition-colors">See Analytics</button>
        </div>

        {walletTransactions.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="bg-slate-50/50 text-slate-500 font-medium uppercase tracking-wider text-xs border-b border-slate-100">
                <tr>
                  <th scope="col" className="px-6 py-4">Transaction</th>
                  <th scope="col" className="px-6 py-4">Category</th>
                  <th scope="col" className="px-6 py-4">Date</th>
                  <th scope="col" className="px-6 py-4 text-right">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {walletTransactions.map((tx) => {
                  const category = categories.find(c => c.id === tx.categoryId);
                  const isIncome = tx.type === 'income';
                  return (
                    <tr key={tx.id} className="hover:bg-slate-50/80 transition-colors group cursor-pointer">
                      <td className="px-6 py-4 font-medium text-slate-900 flex items-center gap-3">
                        <div className={`p-2 rounded-lg ${isIncome ? 'bg-success-50 text-success-600 group-hover:bg-success-100' : 'bg-slate-100 text-slate-600 group-hover:bg-slate-200'} transition-colors`}>
                          {isIncome ? <ArrowDownRight className="w-4 h-4" /> : <DollarSign className="w-4 h-4" />}
                        </div>
                        {tx.note || 'Transfer'}
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border"
                          style={{ backgroundColor: `${category?.color}15`, color: category?.color, borderColor: `${category?.color}30` }}>
                          {category?.name}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-slate-500">
                        {format(parseISO(tx.date), 'MMM dd, yyyy')}
                      </td>
                      <td className={`px-6 py-4 text-right font-bold ${isIncome ? 'text-success-600' : 'text-slate-900'}`}>
                        {isIncome ? '+' : '-'}${tx.amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-12 text-center text-slate-500">
            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <DollarSign className="w-8 h-8 text-slate-400" />
            </div>
            <p className="text-lg font-medium text-slate-900 mb-1">No transactions yet</p>
            <p className="text-sm">This wallet has no associated transactions.</p>
          </div>
        )}
      </div>
    </div>
    </ExpenseLayout>
  );
}
