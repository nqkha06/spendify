<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\Category;
use Inertia\Inertia;
use Inertia\Response;

class ExpenseWalletsController extends Controller
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

        return Inertia::render('User/Wallets', [
            'navigation' => [
                ['label' => 'Dashboard', 'href' => route('expense.dashboard')],
                ['label' => 'Transactions', 'href' => route('expense.transactions')],
                ['label' => 'Budgets', 'href' => route('expense.budgets')],
                ['label' => 'Wallets', 'href' => route('expense.wallets')],
                ['label' => 'Settings', 'href' => route('expense.settings')],
            ],
            'profile' => [
                'name' => $user?->name ?? 'Guest',
                'email' => $user?->email ?? 'guest@example.com',
                'initials' => collect(explode(' ', (string) ($user?->name ?? 'Guest')))
                    ->filter()
                    ->take(2)
                    ->map(fn (string $part): string => strtoupper(substr($part, 0, 1)))
                    ->implode(''),
            ],
            'data' => [
                'categories' => $categories,
                'wallets' => $wallets,
                'transactions' => [],
            ],
        ]);
    }
}
