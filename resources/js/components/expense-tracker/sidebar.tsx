import { Link } from '@inertiajs/react';
import type { ExpenseNavigationItem } from '@/types/expense-tracker';

interface ExpenseSidebarProps {
    navigation: ExpenseNavigationItem[];
    activePath: string;
}

export default function ExpenseSidebar({ navigation, activePath }: ExpenseSidebarProps) {
    return (
        <aside className="hidden w-64 shrink-0 rounded-2xl border border-slate-200 bg-white p-3 shadow-sm lg:block">
            <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">Navigation</p>
            <div className="space-y-1">
                {navigation.map((item) => {
                    const isActive = activePath === item.href;

                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={[
                                'block rounded-xl px-3 py-2 text-sm font-medium transition-colors',
                                isActive
                                    ? 'bg-blue-600 text-white'
                                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900',
                            ].join(' ')}
                        >
                            {item.label}
                        </Link>
                    );
                })}
            </div>
        </aside>
    );
}
