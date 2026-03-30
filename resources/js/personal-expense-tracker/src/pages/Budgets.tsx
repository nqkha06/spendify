import { Plus, Target, AlertCircle } from 'lucide-react';
import { MOCK_BUDGETS, MOCK_CATEGORIES } from '../store/MockData';

export const Budgets = () => {
  const totalBudget = MOCK_BUDGETS.reduce((acc, b) => acc + b.limit, 0);
  const totalSpent = MOCK_BUDGETS.reduce((acc, b) => acc + b.spent, 0);
  const overallPercentage = Math.min((totalSpent / totalBudget) * 100, 100);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Budgets</h1>
          <p className="text-slate-500 text-sm">Track and manage your monthly budgets.</p>
        </div>
        <button className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-xl font-medium flex items-center gap-2 transition-colors shadow-sm shadow-primary-500/30">
          <Plus className="w-4 h-4" />
          Create Budget
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 md:p-8 hover:shadow-md transition-shadow">
        <h2 className="text-lg font-bold text-slate-900 mb-6">Monthly Overview</h2>
        
        <div className="flex flex-col md:flex-row gap-8 items-center">
          <div className="relative w-48 h-48 shrink-0">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              <circle
                className="text-slate-100 stroke-current"
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
              <span className="text-3xl font-bold text-slate-900">{Math.round(overallPercentage)}%</span>
              <span className="text-sm font-medium text-slate-500">Used</span>
            </div>
          </div>

          <div className="grow w-full space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                <p className="text-sm font-medium text-slate-500 mb-1">Total Limit</p>
                <p className="text-2xl font-bold text-slate-900">${totalBudget.toLocaleString('en-US', { minimumFractionDigits: 2 })}</p>
              </div>
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                <p className="text-sm font-medium text-slate-500 mb-1">Total Spent</p>
                <p className="text-2xl font-bold text-slate-900">${totalSpent.toLocaleString('en-US', { minimumFractionDigits: 2 })}</p>
              </div>
            </div>
            
            <div className="bg-primary-50 p-4 rounded-xl border border-primary-100 flex items-start gap-3 text-primary-900">
              <Target className="w-5 h-5 text-primary-500 mt-0.5" />
              <div>
                <p className="font-semibold text-sm">You're doing great!</p>
                <p className="text-sm text-primary-700/80 mt-1">You still have <strong>${(totalBudget - totalSpent).toLocaleString('en-US', { minimumFractionDigits: 2 })}</strong> remaining for the rest of the month.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {MOCK_BUDGETS.map((budget) => {
          const category = MOCK_CATEGORIES.find(c => c.id === budget.categoryId);
          const percentage = Math.min((budget.spent / budget.limit) * 100, 100);
          const isWarning = percentage >= 80 && percentage < 100;
          const isDanger = percentage >= 100;
          
          return (
            <div key={budget.id} className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${category?.color}15`, color: category?.color }}>
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: category?.color }}></div>
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900">{category?.name}</h3>
                    <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">{budget.period}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-slate-900">${budget.spent.toLocaleString('en-US')}</p>
                  <p className="text-xs font-medium text-slate-500">of ${budget.limit.toLocaleString('en-US')}</p>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-xs font-medium">
                  <span className={isDanger ? 'text-danger-600' : isWarning ? 'text-amber-600' : 'text-slate-500'}>
                    {Math.round(percentage)}% Used
                  </span>
                  <span className="text-slate-500">
                    ${(budget.limit - budget.spent).toLocaleString('en-US')} left
                  </span>
                </div>
                <div className="h-2.5 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div 
                    className={`h-full rounded-full transition-all duration-500 ease-out ${
                      isDanger ? 'bg-danger-500' : isWarning ? 'bg-amber-500' : 'bg-primary-500'
                    }`}
                    style={{ width: `${percentage}%` }}
                  ></div>
                </div>
              </div>

              {isDanger && (
                <div className="mt-4 flex items-center gap-2 text-danger-600 text-xs font-medium bg-danger-50 px-3 py-2 rounded-lg">
                  <AlertCircle className="w-4 h-4" />
                  You have exceeded this budget limit!
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
