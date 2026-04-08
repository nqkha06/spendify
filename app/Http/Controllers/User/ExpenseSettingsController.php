<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use Inertia\Inertia;
use Inertia\Response;

class ExpenseSettingsController extends Controller
{
    public function __invoke(): Response
    {
        $user = request()->user();

        return Inertia::render('User/Setting', [
            'navigation' => [
                ['label' => 'Tổng quan', 'href' => route('expense.dashboard')],
                ['label' => 'Giao dịch', 'href' => route('expense.transactions')],
                ['label' => 'Ngân sách', 'href' => route('expense.budgets')],
                ['label' => 'Ví tiền', 'href' => route('expense.wallets')],

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
        ]);
    }
}
