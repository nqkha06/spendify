import { ArrowDownRight, ArrowUpRight, TrendingUp, Wallet, DollarSign } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { MOCK_TRANSACTIONS, MOCK_WALLETS, MOCK_CATEGORIES } from '../store/MockData';
import { format, parseISO } from 'date-fns';

const data = [
  { name: 'Jan', value: 4000 },
  { name: 'Feb', value: 3000 },
  { name: 'Mar', value: 2000 },
  { name: 'Apr', value: 2780 },
  { name: 'May', value: 1890 },
  { name: 'Jun', value: 2390 },
  { name: 'Jul', value: 3490 },
];

const categoryData = MOCK_CATEGORIES.map(cat => ({
  name: cat.name,
  value: Math.floor(Math.random() * 500) + 50,
  color: cat.color
}));

export const Dashboard = () => {
  const totalBalance = MOCK_WALLETS.reduce((acc, wallet) => acc + wallet.balance, 0);
  const totalIncome = 3000;
  const totalExpense = 425.50;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Financial Overview</h1>
          <p className="text-slate-500 text-sm">Welcome back! Here's your financial summary.</p>
        </div>
        <div className="flex space-x-2">
          <select className="bg-white border border-slate-200 text-slate-700 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block p-2 shadow-sm font-medium">
            <option>This Month</option>
            <option>Last Month</option>
            <option>This Year</option>
          </select>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex flex-col justify-between hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-slate-500 mb-1">Total Balance</p>
              <h3 className="text-3xl font-bold text-slate-900">${totalBalance.toLocaleString('en-US', { minimumFractionDigits: 2 })}</h3>
            </div>
            <div className="p-3 bg-primary-50 text-primary-600 rounded-xl">
              <Wallet className="w-6 h-6" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <TrendingUp className="w-4 h-4 text-success-500 mr-1" />
            <span className="text-success-500 font-medium">+2.5%</span>
            <span className="text-slate-400 ml-2">from last month</span>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex flex-col justify-between hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-slate-500 mb-1">Total Income</p>
              <h3 className="text-3xl font-bold text-slate-900">${totalIncome.toLocaleString('en-US', { minimumFractionDigits: 2 })}</h3>
            </div>
            <div className="p-3 bg-success-50 text-success-600 rounded-xl">
              <ArrowDownRight className="w-6 h-6" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <TrendingUp className="w-4 h-4 text-success-500 mr-1" />
            <span className="text-success-500 font-medium">+12%</span>
            <span className="text-slate-400 ml-2">from last month</span>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex flex-col justify-between hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-slate-500 mb-1">Total Expenses</p>
              <h3 className="text-3xl font-bold text-slate-900">${totalExpense.toLocaleString('en-US', { minimumFractionDigits: 2 })}</h3>
            </div>
            <div className="p-3 bg-danger-50 text-danger-600 rounded-xl">
              <ArrowUpRight className="w-6 h-6" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <TrendingUp className="w-4 h-4 text-danger-500 mr-1" />
            <span className="text-danger-500 font-medium">+5.4%</span>
            <span className="text-slate-400 ml-2">from last month</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Chart */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 lg:col-span-2 flex flex-col hover:shadow-md transition-shadow">
          <h3 className="text-lg font-bold text-slate-900 mb-6 tracking-tight">Cash Flow</h3>
          <div className="grow w-full h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} tickFormatter={(value) => `$${value}`} />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                  itemStyle={{ color: '#0f172a', fontWeight: 600 }}
                />
                <Area type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorValue)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Expenses by Category */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 flex flex-col hover:shadow-md transition-shadow">
          <h3 className="text-lg font-bold text-slate-900 mb-6 tracking-tight">Expenses by Category</h3>
          <div className="grow w-full min-h-[220px] flex items-center justify-center relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                  stroke="none"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  itemStyle={{ fontWeight: 500 }}
                  formatter={(value: any) => [`$${value}`, 'Amount']}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-2xl font-bold text-slate-900">${totalExpense.toLocaleString('en-US', { minimumFractionDigits: 0 })}</span>
              <span className="text-xs text-slate-500 font-medium uppercase tracking-wider">Total</span>
            </div>
          </div>
          <div className="mt-4 flex flex-col gap-3">
            {categoryData.slice(0, 4).map((category, index) => (
              <div key={index} className="flex justify-between items-center text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: category.color }}></div>
                  <span className="text-slate-600 font-medium">{category.name}</span>
                </div>
                <span className="text-slate-900 font-bold">${category.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-md transition-shadow">
        <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
          <h3 className="text-lg font-bold text-slate-900 tracking-tight">Recent Transactions</h3>
          <button className="text-sm font-medium text-primary-600 hover:text-primary-700 transition-colors">View All</button>
        </div>
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
              {MOCK_TRANSACTIONS.slice().sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).map((tx) => {
                const category = MOCK_CATEGORIES.find(c => c.id === tx.categoryId);
                const wallet = MOCK_WALLETS.find(w => w.id === tx.walletId);
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
                    <td className="px-6 py-4 text-slate-500">
                      {wallet?.name}
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
      </div>
    </div>
  );
};
