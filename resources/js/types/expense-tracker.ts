export interface ExpenseNavigationItem {
    label: string;
    href: string;
}

export interface ExpenseProfile {
    name: string;
    email: string;
    initials: string;
}

export interface ExpenseCategory {
    id: string;
    name: string;
    color: string;
}

export interface ExpenseWallet {
    id: string;
    name: string;
    balance: number;
    type: 'cash' | 'bank' | 'credit';
}

export interface ExpenseTransaction {
    id: string;
    amount: number;
    type: 'income' | 'expense';
    categoryId: string;
    walletId: string;
    date: string;
    note?: string;
}

export interface ExpenseBudget {
    id: string;
    categoryId: string;
    limit: number;
    spent: number;
    period: 'monthly' | 'yearly';
}

export interface ExpenseDataBundle {
    categories: ExpenseCategory[];
    wallets: ExpenseWallet[];
    transactions: ExpenseTransaction[];
    budgets: ExpenseBudget[];
}
