<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\Category;
use Inertia\Inertia;
use Inertia\Response;

class ExpenseDashboardController extends Controller
{
    public function __invoke(): Response
    {
        $user = request()->user();

        $wallets = $user?->wallets()
            ->orderByDesc('is_default')
            ->orderBy('name')
            ->get()
            ->map(fn ($wallet): array => [
                'id' => (string) $wallet->id,
                'name' => $wallet->name,
                'balance' => (float) $wallet->opening_balance,
                'type' => 'cash',
                'currency' => $wallet->currency,
                'isDefault' => (bool) $wallet->is_default,
            ])
            ->values()
            ->all() ?? [];

        $categories = Category::query()
            ->where('status', 'active')
            ->orderBy('name')
            ->get(['id', 'name', 'color'])
            ->map(fn (Category $category): array => [
                'id' => (string) $category->id,
                'name' => $category->name,
                'color' => $category->color,
            ])
            ->values()
            ->all();

        $transactions = $user?->expenseTransactions()
            ->latest('transacted_at')
            ->latest('id')
            ->get()
            ->map(fn ($transaction): array => [
                'id' => (string) $transaction->id,
                'amount' => (float) $transaction->amount,
                'type' => $transaction->type,
                'categoryId' => $transaction->category_id ? (string) $transaction->category_id : '',
                'walletId' => (string) $transaction->wallet_id,
                'date' => $transaction->transacted_at?->format('Y-m-d') ?? $transaction->created_at?->format('Y-m-d'),
                'note' => $transaction->note,
                'labels' => is_array($transaction->labels) ? $transaction->labels : [],
                'status' => $transaction->status,
            ])
            ->values()
            ->all() ?? [];

        return Inertia::render('User/Dashboard', [
            'navigation' => [
                ['label' => 'Tổng quan', 'href' => route('expense.dashboard')],
                ['label' => 'Giao dịch', 'href' => route('expense.transactions')],
                ['label' => 'Ngân sách', 'href' => route('expense.budgets')],
                ['label' => 'Ví tiền', 'href' => route('expense.wallets')],
                ['label' => 'Cài đặt', 'href' => route('expense.settings')],
            ],
            'profile' => [
                'name' => $user?->name ?? 'Khách',
                'email' => $user?->email ?? 'khach@example.com',
                'initials' => collect(explode(' ', (string) ($user?->name ?? 'Khách')))
                    ->filter()
                    ->take(2)
                    ->map(fn (string $part): string => strtoupper(substr($part, 0, 1)))
                    ->implode(''),
            ],
            'data' => [
                'categories' => $categories,
                'wallets' => $wallets,
                'transactions' => $transactions,
            ],
        ]);
    }
}
