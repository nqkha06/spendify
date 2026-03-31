import type { ExpenseBudget, ExpenseCategory, ExpenseTransaction, ExpenseWallet } from '@/types/expense-tracker';

export const MOCK_CATEGORIES: ExpenseCategory[] = [
    { id: 'cat-food', name: 'Food & Drink', color: '#f97316' },
    { id: 'cat-transport', name: 'Transport', color: '#0ea5e9' },
    { id: 'cat-shopping', name: 'Shopping', color: '#a855f7' },
    { id: 'cat-bills', name: 'Bills & Utilities', color: '#ef4444' },
    { id: 'cat-salary', name: 'Salary', color: '#10b981' },
    { id: 'cat-freelance', name: 'Freelance', color: '#22c55e' },
];

export const MOCK_WALLETS: ExpenseWallet[] = [
    {
        id: 'wallet-cash',
        name: 'Cash Wallet',
        balance: 1250.5,
        type: 'cash',
        currency: 'USD',
        isDefault: true,
    },
    {
        id: 'wallet-bank',
        name: 'Vietcombank',
        balance: 8420.75,
        type: 'bank',
        currency: 'USD',
    },
    {
        id: 'wallet-credit',
        name: 'Credit Card',
        balance: -620.35,
        type: 'credit',
        currency: 'USD',
    },
];

export const MOCK_TRANSACTIONS: ExpenseTransaction[] = [
    {
        id: 'tx-1001',
        amount: 3200,
        type: 'income',
        categoryId: 'cat-salary',
        walletId: 'wallet-bank',
        date: '2026-03-12',
        note: 'Monthly salary',
        labels: ['payroll'],
    },
    {
        id: 'tx-1002',
        amount: 45.5,
        type: 'expense',
        categoryId: 'cat-food',
        walletId: 'wallet-cash',
        date: '2026-03-13',
        note: 'Lunch with team',
    },
    {
        id: 'tx-1003',
        amount: 18.2,
        type: 'expense',
        categoryId: 'cat-transport',
        walletId: 'wallet-cash',
        date: '2026-03-14',
        note: 'Grab ride',
    },
    {
        id: 'tx-1004',
        amount: 120,
        type: 'expense',
        categoryId: 'cat-bills',
        walletId: 'wallet-bank',
        date: '2026-03-15',
        note: 'Internet bill',
        labels: ['utility'],
    },
    {
        id: 'tx-1005',
        amount: 350,
        type: 'income',
        categoryId: 'cat-freelance',
        walletId: 'wallet-bank',
        date: '2026-03-16',
        note: 'Landing page project',
    },
    {
        id: 'tx-1006',
        amount: 89.9,
        type: 'expense',
        categoryId: 'cat-shopping',
        walletId: 'wallet-credit',
        date: '2026-03-18',
        note: 'Sneakers',
    },
];

export const MOCK_BUDGETS: ExpenseBudget[] = [
    {
        id: 'budget-food',
        categoryId: 'cat-food',
        limit: 500,
        spent: 240.5,
        period: 'monthly',
    },
    {
        id: 'budget-transport',
        categoryId: 'cat-transport',
        limit: 200,
        spent: 86.2,
        period: 'monthly',
    },
    {
        id: 'budget-shopping',
        categoryId: 'cat-shopping',
        limit: 350,
        spent: 198.4,
        period: 'monthly',
    },
    {
        id: 'budget-bills',
        categoryId: 'cat-bills',
        limit: 300,
        spent: 145.3,
        period: 'monthly',
    },
];
