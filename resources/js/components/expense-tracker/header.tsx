import { Link } from '@inertiajs/react';
import { Wallet } from 'lucide-react';
import type { ExpenseNavigationItem, ExpenseProfile } from '@/types/expense-tracker';

interface ExpenseHeaderProps {
    navigation: ExpenseNavigationItem[];
    activePath: string;
    profile?: ExpenseProfile;
}

export default function ExpenseHeader({ navigation, activePath, profile }: ExpenseHeaderProps) {
    const homeLink = navigation[0]?.href ?? '/user';

    return (
        <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/90 backdrop-blur">
            <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 sm:px-6">
                <Link href={homeLink} className="flex items-center gap-2">
                    <div className="rounded-xl bg-blue-600 p-2 text-white shadow-md shadow-blue-300/40">
                        <Wallet className="size-5" />
                    </div>
                    <span className="text-lg font-semibold tracking-tight text-slate-900">Expensify</span>
                </Link>

                <nav className="hidden items-center gap-1 md:flex">
                    {navigation.map((item) => {
                        const isActive = activePath === item.href;

                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={[
                                    'rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                                    isActive
                                        ? 'bg-blue-50 text-blue-700'
                                        : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900',
                                ].join(' ')}
                            >
                                {item.label}
                            </Link>
                        );
                    })}
                </nav>

                <div className="flex items-center gap-3">
                    <div className="hidden text-right sm:block">
                        <p className="text-sm font-semibold text-slate-900">{profile?.name ?? 'Guest User'}</p>
                        <p className="text-xs text-slate-500">{profile?.email ?? 'guest@example.com'}</p>
                    </div>
                    <div className="flex size-9 items-center justify-center rounded-full bg-blue-100 font-semibold text-blue-700">
                        {profile?.initials ?? 'GU'}
                    </div>
                </div>
            </div>
        </header>
    );
}
