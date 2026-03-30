import type { PropsWithChildren } from 'react';
import { Head } from '@inertiajs/react';
import ExpenseFooter from '@/components/expense-tracker/footer';
import ExpenseHeader from '@/components/expense-tracker/header';
import ExpenseSidebar from '@/components/expense-tracker/sidebar';
import type { ExpenseNavigationItem, ExpenseProfile } from '@/types/expense-tracker';

interface ExpenseLayoutProps extends PropsWithChildren {
    title: string;
    heading: string;
    description?: string;
    activePath: string;
    navigation: ExpenseNavigationItem[];
    profile?: ExpenseProfile;
    showSidebar?: boolean;
}

export default function ExpenseLayout({
    title,
    heading,
    description,
    activePath,
    navigation,
    profile,
    showSidebar = true,
    children,
}: ExpenseLayoutProps) {
    return (
        <div className="min-h-screen bg-slate-50 text-slate-900">
            <Head title={title} />
            <ExpenseHeader navigation={navigation} activePath={activePath} profile={profile} />

            <main className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6">
                <div className="mb-6 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 p-6 text-white shadow-lg shadow-blue-300/40">
                    <h1 className="text-2xl font-bold tracking-tight">{heading}</h1>
                    {description ? <p className="mt-2 text-sm text-blue-100">{description}</p> : null}
                </div>

                <div className="flex items-start gap-6">
                    {showSidebar ? <ExpenseSidebar navigation={navigation} activePath={activePath} /> : null}
                    <section className="w-full rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">{children}</section>
                </div>
            </main>

            <ExpenseFooter />
        </div>
    );
}
