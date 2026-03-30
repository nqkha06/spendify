import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { MainLayout } from '@/personal-expense-tracker/src/components/layout/MainLayout';
import { Budgets } from '@/personal-expense-tracker/src/pages/Budgets';
import { Dashboard } from '@/personal-expense-tracker/src/pages/Dashboard';
import { Settings } from '@/personal-expense-tracker/src/pages/Settings';
import { Transactions } from '@/personal-expense-tracker/src/pages/Transactions';
import { Wallets } from '@/personal-expense-tracker/src/pages/Wallets';

export default function ExpenseTrackerApp() {
    return (
        <BrowserRouter basename="/user">
            <Routes>
                <Route path="/" element={<MainLayout />}>
                    <Route index element={<Dashboard />} />
                    <Route path="dashboard" element={<Dashboard />} />
                    <Route path="transactions" element={<Transactions />} />
                    <Route path="budgets" element={<Budgets />} />
                    <Route path="wallets" element={<Wallets />} />
                    <Route path="settings" element={<Settings />} />
                    <Route path="*" element={<Dashboard />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}
