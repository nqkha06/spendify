<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use Inertia\Inertia;
use Inertia\Response;

class ExpenseTransactionsController extends Controller
{
    public function __invoke(): Response
    {
        $user = request()->user();

        return Inertia::render('User/Transactions', [
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
        ]);
    }
}
