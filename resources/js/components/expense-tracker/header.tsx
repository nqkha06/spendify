import { Link } from '@inertiajs/react';
import type {
    TrackerNavigationItem,
    TrackerProfile,
} from '@/types/expense-tracker';

interface TrackerHeaderProps {
    navigation: TrackerNavigationItem[];
    activePath: string;
    profile?: TrackerProfile;
}

export default function TrackerHeader({
    navigation,
    activePath,
    profile,
}: TrackerHeaderProps) {
    const homeLink = navigation[0]?.href ?? '/user';

    return (
        <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/90 backdrop-blur">
            <div className="mx-auto flex h-18 w-full max-w-7xl items-center justify-between px-4 sm:px-6">
                <Link href={homeLink} className="flex items-center gap-2">
                    <div className="w-9 h-9">
                        <img className='w-full h-full object-cover rounded-xl shadow-sm' src="/logo.png" alt="Spendify Logo" />
                    </div>
                    <span className="text-lg font-semibold tracking-tight text-slate-900">
                        Spendify
                    </span>
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
                    <div className="block text-right sm:block">
                        <p className="text-sm font-semibold text-slate-900">
                            {profile?.name ?? 'Khách'}
                        </p>
                        <p className="text-xs text-slate-500">
                            {profile?.email ?? 'khach@example.com'}
                        </p>
                    </div>
                    <div className="flex size-9 items-center justify-center rounded-full bg-blue-100 font-semibold text-blue-700">
                        {profile?.initials ?? 'KH'}
                    </div>
                </div>
            </div>
        </header>
    );
}
