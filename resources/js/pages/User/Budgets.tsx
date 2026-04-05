import { Plus, Target, AlertCircle } from 'lucide-react';
import ExpenseLayout from '@/components/expense-tracker/layout';
import { MOCK_BUDGETS, MOCK_CATEGORIES } from '@/lib/mock-data';
import type {
    ExpenseNavigationItem,
    ExpenseProfile,
} from '@/types/expense-tracker';

interface BudgetsProps {
    navigation: ExpenseNavigationItem[];
    profile?: ExpenseProfile;
}

export default function Budgets({ navigation, profile }: BudgetsProps) {
    const totalBudget = MOCK_BUDGETS.reduce((acc, b) => acc + b.limit, 0);
    const totalSpent = MOCK_BUDGETS.reduce((acc, b) => acc + b.spent, 0);
    const overallPercentage = Math.min((totalSpent / totalBudget) * 100, 100);

    return (
        <ExpenseLayout
            title="Ngân sách"
            heading="Kế hoạch ngân sách"
            description="Đặt giới hạn theo tháng và bám sát mục tiêu."
            activePath="/user/budgets"
            navigation={navigation}
            profile={profile}
            action={
                <button className="hover:bg-primary-700 flex items-center gap-2 rounded-xl bg-primary-600 px-4 py-2 font-medium text-white shadow-sm shadow-primary-500/30 transition-colors">
                    <Plus className="h-4 w-4" />
                    Tạo ngân sách
                </button>
            }
        >
            <div className="space-y-6">
                <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm transition-shadow hover:shadow-md md:p-8">
                    <h2 className="mb-6 text-lg font-bold text-slate-900">
                        Tổng quan tháng
                    </h2>

                    <div className="flex flex-col items-center gap-8 md:flex-row">
                        <div className="relative h-48 w-48 shrink-0">
                            <svg
                                className="h-full w-full -rotate-90 transform"
                                viewBox="0 0 100 100"
                            >
                                <circle
                                    className="stroke-current text-slate-100"
                                    strokeWidth="10"
                                    cx="50"
                                    cy="50"
                                    r="40"
                                    fill="transparent"
                                ></circle>
                                <circle
                                    className={`${overallPercentage > 100 ? 'text-danger-500' : overallPercentage > 80 ? 'text-amber-500' : 'text-primary-500'} stroke-current transition-all duration-1000 ease-out`}
                                    strokeWidth="10"
                                    strokeLinecap="round"
                                    cx="50"
                                    cy="50"
                                    r="40"
                                    fill="transparent"
                                    strokeDasharray={`${overallPercentage * 2.51327} 251.327`}
                                ></circle>
                            </svg>
                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                                <span className="text-3xl font-bold text-slate-900">
                                    {Math.round(overallPercentage)}%
                                </span>
                                <span className="text-sm font-medium text-slate-500">
                                    Đã dùng
                                </span>
                            </div>
                        </div>

                        <div className="w-full grow space-y-6">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">
                                    <p className="mb-1 text-sm font-medium text-slate-500">
                                        Tổng hạn mức
                                    </p>
                                    <p className="text-2xl font-bold text-slate-900">
                                        $
                                        {totalBudget.toLocaleString('en-US', {
                                            minimumFractionDigits: 2,
                                        })}
                                    </p>
                                </div>
                                <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">
                                    <p className="mb-1 text-sm font-medium text-slate-500">
                                        Tổng đã chi
                                    </p>
                                    <p className="text-2xl font-bold text-slate-900">
                                        $
                                        {totalSpent.toLocaleString('en-US', {
                                            minimumFractionDigits: 2,
                                        })}
                                    </p>
                                </div>
                            </div>

                            <div className="text-primary-900 flex items-start gap-3 rounded-xl border border-primary-100 bg-primary-50 p-4">
                                <Target className="mt-0.5 h-5 w-5 text-primary-500" />
                                <div>
                                    <p className="text-sm font-semibold">
                                        Bạn đang làm rất tốt!
                                    </p>
                                    <p className="text-primary-700/80 mt-1 text-sm">
                                        Bạn vẫn còn{' '}
                                        <strong>
                                            $
                                            {(
                                                totalBudget - totalSpent
                                            ).toLocaleString('en-US', {
                                                minimumFractionDigits: 2,
                                            })}
                                        </strong>{' '}
                                        cho phần còn lại của tháng.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    {MOCK_BUDGETS.map((budget) => {
                        const category = MOCK_CATEGORIES.find(
                            (c) => c.id === budget.categoryId,
                        );
                        const percentage = Math.min(
                            (budget.spent / budget.limit) * 100,
                            100,
                        );
                        const isWarning = percentage >= 80 && percentage < 100;
                        const isDanger = percentage >= 100;

                        return (
                            <div
                                key={budget.id}
                                className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
                            >
                                <div className="mb-4 flex items-start justify-between">
                                    <div className="flex items-center gap-3">
                                        <div
                                            className="flex h-10 w-10 items-center justify-center rounded-xl"
                                            style={{
                                                backgroundColor: `${category?.color}15`,
                                                color: category?.color,
                                            }}
                                        >
                                            <div
                                                className="h-3 w-3 rounded-full"
                                                style={{
                                                    backgroundColor:
                                                        category?.color,
                                                }}
                                            ></div>
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-slate-900">
                                                {category?.name}
                                            </h3>
                                            <p className="text-xs font-medium tracking-wider text-slate-500 uppercase">
                                                {budget.period === 'monthly'
                                                    ? 'HÀNG THÁNG'
                                                    : 'HÀNG NĂM'}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-bold text-slate-900">
                                            $
                                            {budget.spent.toLocaleString(
                                                'en-US',
                                            )}
                                        </p>
                                        <p className="text-xs font-medium text-slate-500">
                                            trên $
                                            {budget.limit.toLocaleString(
                                                'en-US',
                                            )}
                                        </p>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <div className="flex justify-between text-xs font-medium">
                                        <span
                                            className={
                                                isDanger
                                                    ? 'text-danger-600'
                                                    : isWarning
                                                      ? 'text-amber-600'
                                                      : 'text-slate-500'
                                            }
                                        >
                                            {Math.round(percentage)}% đã dùng
                                        </span>
                                        <span className="text-slate-500">
                                            $
                                            {(
                                                budget.limit - budget.spent
                                            ).toLocaleString('en-US')}{' '}
                                            còn lại
                                        </span>
                                    </div>
                                    <div className="h-2.5 w-full overflow-hidden rounded-full bg-slate-100">
                                        <div
                                            className={`h-full rounded-full transition-all duration-500 ease-out ${
                                                isDanger
                                                    ? 'bg-danger-500'
                                                    : isWarning
                                                      ? 'bg-amber-500'
                                                      : 'bg-primary-500'
                                            }`}
                                            style={{ width: `${percentage}%` }}
                                        ></div>
                                    </div>
                                </div>

                                {isDanger && (
                                    <div className="mt-4 flex items-center gap-2 rounded-lg bg-danger-50 px-3 py-2 text-xs font-medium text-danger-600">
                                        <AlertCircle className="h-4 w-4" />
                                        Bạn đã vượt quá hạn mức ngân sách này!
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </ExpenseLayout>
    );
}
