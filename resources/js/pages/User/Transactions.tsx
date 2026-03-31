import { useState } from 'react';
import { Plus, Search, Filter, ArrowDownRight, DollarSign, X } from 'lucide-react';
import ExpenseLayout from '@/components/expense-tracker/layout';
import { MOCK_TRANSACTIONS, MOCK_CATEGORIES, MOCK_WALLETS } from '@/lib/mock-data';
import { useExpenseCategories } from '@/hooks/use-expense-categories';
import type { ExpenseNavigationItem, ExpenseProfile } from '@/types/expense-tracker';
import { format, parseISO } from 'date-fns';

interface TransactionsProps {
  navigation: ExpenseNavigationItem[];
  profile?: ExpenseProfile;
}

export default function Transactions({ navigation, profile }: TransactionsProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all'); // all, income, expense
  const categories = useExpenseCategories();
  const categoryOptions = categories.length ? categories : MOCK_CATEGORIES;

  const filteredTransactions = MOCK_TRANSACTIONS.filter((tx) => {
    const matchesSearch = tx.note?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || tx.type === filterType;
    return matchesSearch && matchesType;
  }).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <ExpenseLayout
      title="Transactions"
      heading="Transactions"
      description="Record every income and expense in one place."
      activePath="/user/transactions"
      navigation={navigation}
      profile={profile}
    >
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">

        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-xl font-medium flex items-center gap-2 transition-colors shadow-sm shadow-primary-500/30"
        >
          <Plus className="w-4 h-4" />
          Add Transaction
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        {/* Filters */}
        <div className="p-4 border-b border-slate-100 flex flex-col sm:flex-row gap-4 justify-between bg-slate-50/50">
          <div className="relative grow sm:max-w-md">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-slate-400" />
            </div>
            <input
              type="text"
              placeholder="Search transactions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 block w-full bg-white border border-slate-200 text-slate-900 rounded-xl focus:ring-primary-500 focus:border-primary-500 sm:text-sm py-2 shadow-sm"
            />
          </div>
          <div className="flex items-center gap-2">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Filter className="h-4 w-4 text-slate-400" />
              </div>
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="pl-10 block w-full bg-white border border-slate-200 text-slate-700 rounded-xl focus:ring-primary-500 focus:border-primary-500 sm:text-sm py-2 shadow-sm font-medium pr-8"
              >
                <option value="all">All Types</option>
                <option value="income">Income Only</option>
                <option value="expense">Expenses Only</option>
              </select>
            </div>
          </div>
        </div>

        {/* List */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-slate-50/50 text-slate-500 font-medium uppercase tracking-wider text-xs border-b border-slate-100">
              <tr>
                <th scope="col" className="px-6 py-4">Transaction</th>
                <th scope="col" className="px-6 py-4">Category</th>
                <th scope="col" className="px-6 py-4">Date</th>
                <th scope="col" className="px-6 py-4">Wallet</th>
                <th scope="col" className="px-6 py-4 text-right">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {filteredTransactions.map((tx) => {
                const category = categoryOptions.find(c => c.id === tx.categoryId) || MOCK_CATEGORIES.find(c => c.id === tx.categoryId);
                const wallet = MOCK_WALLETS.find(w => w.id === tx.walletId);
                const isIncome = tx.type === 'income';
                return (
                  <tr key={tx.id} className="hover:bg-slate-50/80 transition-colors group cursor-pointer">
                    <td className="px-6 py-4 font-medium text-slate-900 flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${isIncome ? 'bg-success-50 text-success-600 group-hover:bg-success-100' : 'bg-slate-100 text-slate-600 group-hover:bg-slate-200'} transition-colors`}>
                        {isIncome ? <ArrowDownRight className="w-4 h-4" /> : <DollarSign className="w-4 h-4" />}
                      </div>
                      <div className="flex flex-col">
                        <span>{tx.note || 'Transfer'}</span>
                        {tx.labels && tx.labels.length > 0 && (
                          <div className="flex gap-1 mt-1">
                            {tx.labels.map(label => (
                              <span key={label} className="text-[10px] bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded uppercase font-bold tracking-wider">{label}</span>
                            ))}
                          </div>
                        )}
                      </div>
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
                    <td className="px-6 py-4 text-slate-500">
                      {wallet?.name || 'Unknown Wallet'}
                    </td>
                    <td className={`px-6 py-4 text-right font-bold ${isIncome ? 'text-success-600' : 'text-slate-900'}`}>
                      {isIncome ? '+' : '-'}${tx.amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                    </td>
                  </tr>
                );
              })}
              {filteredTransactions.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-slate-500">
                    No transactions found. Try adjusting your filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Transaction Modal Placeholder */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex justify-center items-center p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden animate-in slide-in-from-bottom-4 duration-300">
            <div className="flex justify-between items-center p-5 border-b border-slate-100">
              <h2 className="text-xl font-bold text-slate-900">Add Transaction</h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 hover:bg-slate-100 p-1.5 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-5 space-y-4">
              <div className="grid grid-cols-2 gap-3 mb-4">
                <button className="bg-danger-50 text-danger-600 border border-danger-200 py-2.5 rounded-xl font-medium tracking-wide">Expense</button>
                <button className="bg-white text-slate-600 border border-slate-200 hover:bg-slate-50 py-2.5 rounded-xl font-medium tracking-wide transition-colors">Income</button>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Amount</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-slate-500 sm:text-sm">$</span>
                  </div>
                  <input type="number" placeholder="0.00" className="pl-7 block w-full bg-white border border-slate-200 text-slate-900 rounded-xl focus:ring-primary-500 focus:border-primary-500 sm:text-sm py-2.5 shadow-sm" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Category</label>
                <select className="block w-full bg-white border border-slate-200 text-slate-900 rounded-xl focus:ring-primary-500 focus:border-primary-500 sm:text-sm py-2.5 shadow-sm">
                  {categoryOptions.map(c => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Date</label>
                <input type="date" defaultValue={format(new Date(), 'yyyy-MM-dd')} className="block w-full bg-white border border-slate-200 text-slate-900 rounded-xl focus:ring-primary-500 focus:border-primary-500 sm:text-sm py-2.5 shadow-sm" />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Note (Optional)</label>
                <input type="text" placeholder="What was this for?" className="block w-full bg-white border border-slate-200 text-slate-900 rounded-xl focus:ring-primary-500 focus:border-primary-500 sm:text-sm py-2.5 shadow-sm" />
              </div>

            </div>
            <div className="p-5 border-t border-slate-100 bg-slate-50 flex justify-end gap-3">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-xl font-medium hover:bg-slate-50 transition-colors"
              >
                Cancel
              </button>
              <button className="px-6 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-xl font-medium transition-colors shadow-sm shadow-primary-500/30">
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
    </ExpenseLayout>
  );
}
