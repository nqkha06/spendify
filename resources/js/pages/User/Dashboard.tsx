import { format, parseISO } from 'date-fns';
import {
    ArrowDownRight,
    ArrowUpRight,
    TrendingUp,
    Wallet,
    DollarSign,
} from 'lucide-react';
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
} from 'recharts';
import ExpenseLayout from '@/components/expense-tracker/layout';
import {
    MOCK_WALLETS,
    MOCK_CATEGORIES,
} from '@/lib/mock-data';
import type {
    ExpenseTransaction,
    ExpenseNavigationItem,
    ExpenseProfile,
} from '@/types/expense-tracker';

const chartData = [
    { name: 'T1', value: 4000 },
    { name: 'T2', value: 3000 },
    { name: 'T3', value: 2000 },
    { name: 'T4', value: 2780 },
    { name: 'T5', value: 1890 },
    { name: 'T6', value: 2390 },
    { name: 'T7', value: 3490 },
];

const categoryData = MOCK_CATEGORIES.map((cat) => ({
    name: cat.name,
    value: Math.floor(Math.random() * 500) + 50,
    color: cat.color,
}));

interface DashboardProps {
    navigation: ExpenseNavigationItem[];
    profile?: ExpenseProfile;
    data?: {
        transactions?: ExpenseTransaction[];
    };
}

export default function Dashboard({ navigation, profile, data: pageData }: DashboardProps) {
    const totalBalance = MOCK_WALLETS.reduce(
        (acc, wallet) => acc + wallet.balance,
        0,
    );
    const totalIncome = 3000;
    const totalExpense = 425.5;
    const recentTransactions = pageData?.transactions ?? [];

    return (
        <ExpenseLayout
            title="Tổng quan"
            heading="Tổng quan tài chính"
            description="Theo dõi số dư, dòng tiền và chi tiêu trong nháy mắt."
            activePath="/user/dashboard"
            navigation={navigation}
            profile={profile}
            action={
                <div>
                    <select className="block rounded-lg border border-slate-200 bg-white p-2 text-sm font-medium text-slate-700 shadow-sm focus:border-primary-500 focus:ring-primary-500">
                        <option>Tháng này</option>
                        <option>Tháng trước</option>
                        <option>Năm nay</option>
                    </select>
                </div>
            }
        >
            <div className="space-y-6">
                {/* Overview Cards */}
                <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                    <div className="flex flex-col justify-between rounded-2xl border border-slate-100 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
                        <div className="flex items-start justify-between">
                            <div>
                                <p className="mb-1 text-sm font-medium text-slate-500">
                                    Tổng số dư
                                </p>
                                <h3 className="text-3xl font-bold text-slate-900">
                                    $
                                    {totalBalance.toLocaleString('en-US', {
                                        minimumFractionDigits: 2,
                                    })}
                                </h3>
                            </div>
                            <div className="rounded-xl bg-primary-50 p-3 text-primary-600">
                                <Wallet className="h-6 w-6" />
                            </div>
                        </div>
                        <div className="mt-4 flex items-center text-sm">
                            <TrendingUp className="mr-1 h-4 w-4 text-success-500" />
                            <span className="font-medium text-success-500">
                                +2.5%
                            </span>
                            <span className="ml-2 text-slate-400">
                                so với tháng trước
                            </span>
                        </div>
                    </div>

                    <div className="flex flex-col justify-between rounded-2xl border border-slate-100 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
                        <div className="flex items-start justify-between">
                            <div>
                                <p className="mb-1 text-sm font-medium text-slate-500">
                                    Tổng thu nhập
                                </p>
                                <h3 className="text-3xl font-bold text-slate-900">
                                    $
                                    {totalIncome.toLocaleString('en-US', {
                                        minimumFractionDigits: 2,
                                    })}
                                </h3>
                            </div>
                            <div className="rounded-xl bg-success-50 p-3 text-success-600">
                                <ArrowDownRight className="h-6 w-6" />
                            </div>
                        </div>
                        <div className="mt-4 flex items-center text-sm">
                            <TrendingUp className="mr-1 h-4 w-4 text-success-500" />
                            <span className="font-medium text-success-500">
                                +12%
                            </span>
                            <span className="ml-2 text-slate-400">
                                so với tháng trước
                            </span>
                        </div>
                    </div>

                    <div className="flex flex-col justify-between rounded-2xl border border-slate-100 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
                        <div className="flex items-start justify-between">
                            <div>
                                <p className="mb-1 text-sm font-medium text-slate-500">
                                    Tổng chi tiêu
                                </p>
                                <h3 className="text-3xl font-bold text-slate-900">
                                    $
                                    {totalExpense.toLocaleString('en-US', {
                                        minimumFractionDigits: 2,
                                    })}
                                </h3>
                            </div>
                            <div className="rounded-xl bg-danger-50 p-3 text-danger-600">
                                <ArrowUpRight className="h-6 w-6" />
                            </div>
                        </div>
                        <div className="mt-4 flex items-center text-sm">
                            <TrendingUp className="mr-1 h-4 w-4 text-danger-500" />
                            <span className="font-medium text-danger-500">
                                +5.4%
                            </span>
                            <span className="ml-2 text-slate-400">
                                so với tháng trước
                            </span>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                    {/* Main Chart */}
                    <div className="flex flex-col rounded-2xl border border-slate-100 bg-white p-6 shadow-sm transition-shadow hover:shadow-md lg:col-span-2">
                        <h3 className="mb-6 text-lg font-bold tracking-tight text-slate-900">
                            Dòng tiền
                        </h3>
                        <div className="h-[300px] w-full grow">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart
                                    data={chartData}
                                    margin={{
                                        top: 10,
                                        right: 10,
                                        left: -20,
                                        bottom: 0,
                                    }}
                                >
                                    <defs>
                                        <linearGradient
                                            id="colorValue"
                                            x1="0"
                                            y1="0"
                                            x2="0"
                                            y2="1"
                                        >
                                            <stop
                                                offset="5%"
                                                stopColor="#3b82f6"
                                                stopOpacity={0.3}
                                            />
                                            <stop
                                                offset="95%"
                                                stopColor="#3b82f6"
                                                stopOpacity={0}
                                            />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid
                                        strokeDasharray="3 3"
                                        vertical={false}
                                        stroke="#e2e8f0"
                                    />
                                    <XAxis
                                        dataKey="name"
                                        axisLine={false}
                                        tickLine={false}
                                        tick={{ fill: '#64748b', fontSize: 12 }}
                                        dy={10}
                                    />
                                    <YAxis
                                        axisLine={false}
                                        tickLine={false}
                                        tick={{ fill: '#64748b', fontSize: 12 }}
                                        tickFormatter={(value) => `$${value}`}
                                    />
                                    <Tooltip
                                        contentStyle={{
                                            borderRadius: '12px',
                                            border: 'none',
                                            boxShadow:
                                                '0 10px 15px -3px rgb(0 0 0 / 0.1)',
                                        }}
                                        itemStyle={{
                                            color: '#0f172a',
                                            fontWeight: 600,
                                        }}
                                    />
                                    <Area
                                        type="monotone"
                                        dataKey="value"
                                        stroke="#3b82f6"
                                        strokeWidth={3}
                                        fillOpacity={1}
                                        fill="url(#colorValue)"
                                    />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Expenses by Category */}
                    <div className="flex flex-col rounded-2xl border border-slate-100 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
                        <h3 className="mb-6 text-lg font-bold tracking-tight text-slate-900">
                            Chi tiêu theo danh mục
                        </h3>
                        <div className="relative flex min-h-[220px] w-full grow items-center justify-center">
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
                                            <Cell
                                                key={`cell-${index}`}
                                                fill={entry.color}
                                            />
                                        ))}
                                    </Pie>
                                    <Tooltip
                                        contentStyle={{
                                            borderRadius: '12px',
                                            border: 'none',
                                            boxShadow:
                                                '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                                        }}
                                        itemStyle={{ fontWeight: 500 }}
                                        formatter={(value: any) => [
                                            `$${value}`,
                                            'Số tiền',
                                        ]}
                                    />
                                </PieChart>
                            </ResponsiveContainer>
                            <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
                                <span className="text-2xl font-bold text-slate-900">
                                    $
                                    {totalExpense.toLocaleString('en-US', {
                                        minimumFractionDigits: 0,
                                    })}
                                </span>
                                <span className="text-xs font-medium tracking-wider text-slate-500 uppercase">
                                    Tổng
                                </span>
                            </div>
                        </div>
                        <div className="mt-4 flex flex-col gap-3">
                            {categoryData.slice(0, 4).map((category, index) => (
                                <div
                                    key={index}
                                    className="flex items-center justify-between text-sm"
                                >
                                    <div className="flex items-center gap-2">
                                        <div
                                            className="h-3 w-3 rounded-full"
                                            style={{
                                                backgroundColor: category.color,
                                            }}
                                        ></div>
                                        <span className="font-medium text-slate-600">
                                            {category.name}
                                        </span>
                                    </div>
                                    <span className="font-bold text-slate-900">
                                        ${category.value}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Recent Transactions */}
                <div className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm transition-shadow hover:shadow-md">
                    <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50/50 p-6">
                        <h3 className="text-lg font-bold tracking-tight text-slate-900">
                            Giao dịch gần đây
                        </h3>
                        <button className="hover:text-primary-700 text-sm font-medium text-primary-600 transition-colors">
                            Xem tất cả
                        </button>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm whitespace-nowrap">
                            <thead className="border-b border-slate-100 bg-slate-50/50 text-xs font-medium tracking-wider text-slate-500 uppercase">
                                <tr>
                                    <th scope="col" className="px-6 py-4">
                                        Giao dịch
                                    </th>
                                    <th scope="col" className="px-6 py-4">
                                        Danh mục
                                    </th>
                                    <th scope="col" className="px-6 py-4">
                                        Ngày
                                    </th>
                                    <th scope="col" className="px-6 py-4">
                                        Ví
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-4 text-right"
                                    >
                                        Số tiền
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 text-slate-700">
                                {recentTransactions
                                    .slice()
                                    .sort(
                                        (a, b) =>
                                            new Date(b.date).getTime() -
                                            new Date(a.date).getTime(),
                                    )
                                    .map((tx) => {
                                        const category = MOCK_CATEGORIES.find(
                                            (c) => c.id === tx.categoryId,
                                        );
                                        const wallet = MOCK_WALLETS.find(
                                            (w) => w.id === tx.walletId,
                                        );
                                        const isIncome = tx.type === 'income';
                                        return (
                                            <tr
                                                key={tx.id}
                                                className="group cursor-pointer transition-colors hover:bg-slate-50/80"
                                            >
                                                <td className="flex items-center gap-3 px-6 py-4 font-medium text-slate-900">
                                                    <div
                                                        className={`rounded-lg p-2 ${isIncome ? 'group-hover:bg-success-100 bg-success-50 text-success-600' : 'bg-slate-100 text-slate-600 group-hover:bg-slate-200'} transition-colors`}
                                                    >
                                                        {isIncome ? (
                                                            <ArrowDownRight className="h-4 w-4" />
                                                        ) : (
                                                            <DollarSign className="h-4 w-4" />
                                                        )}
                                                    </div>
                                                    {tx.note || 'Chuyển khoản'}
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span
                                                        className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium"
                                                        style={{
                                                            backgroundColor: `${category?.color}15`,
                                                            color: category?.color,
                                                            borderColor: `${category?.color}30`,
                                                        }}
                                                    >
                                                        {category?.name}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 text-slate-500">
                                                    {format(
                                                        parseISO(tx.date),
                                                        'dd/MM/yyyy',
                                                    )}
                                                </td>
                                                <td className="px-6 py-4 text-slate-500">
                                                    {wallet?.name}
                                                </td>
                                                <td
                                                    className={`px-6 py-4 text-right font-bold ${isIncome ? 'text-success-600' : 'text-slate-900'}`}
                                                >
                                                    {isIncome ? '+' : '-'}$
                                                    {tx.amount.toLocaleString(
                                                        'en-US',
                                                        {
                                                            minimumFractionDigits: 2,
                                                        },
                                                    )}
                                                </td>
                                            </tr>
                                        );
                                    })}
                                {recentTransactions.length === 0 ? (
                                    <tr>
                                        <td
                                            colSpan={5}
                                            className="px-6 py-12 text-center text-slate-500"
                                        >
                                            Chua co giao dich nao.
                                        </td>
                                    </tr>
                                ) : null}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </ExpenseLayout>
    );
}
