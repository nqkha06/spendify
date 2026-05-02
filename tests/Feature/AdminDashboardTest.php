<?php

use App\Models\Budget;
use App\Models\Category;
use App\Models\ExpenseTransaction;
use App\Models\User;
use App\Models\UserWallet;
use Inertia\Testing\AssertableInertia as Assert;

test('admin can view dashboard', function () {
    $admin = User::factory()->create();
    $user = User::factory()->create();
    $category = Category::factory()->create([
        'name' => 'Food',
        'color' => '#22c55e',
        'status' => 'active',
    ]);
    $wallet = UserWallet::factory()->create([
        'user_id' => $user->id,
        'name' => 'Main wallet',
        'currency' => 'VND',
    ]);

    Budget::factory()->create([
        'user_id' => $user->id,
        'category_id' => $category->id,
        'status' => 'active',
    ]);

    ExpenseTransaction::factory()->create([
        'user_id' => $user->id,
        'wallet_id' => $wallet->id,
        'category_id' => $category->id,
        'type' => 'income',
        'amount' => 1000,
        'status' => 'posted',
        'transacted_at' => now()->toDateString(),
    ]);
    ExpenseTransaction::factory()->create([
        'user_id' => $user->id,
        'wallet_id' => $wallet->id,
        'category_id' => $category->id,
        'type' => 'expense',
        'amount' => 250,
        'status' => 'posted',
        'transacted_at' => now()->toDateString(),
    ]);
    ExpenseTransaction::factory()->create([
        'user_id' => $user->id,
        'wallet_id' => $wallet->id,
        'category_id' => $category->id,
        'type' => 'expense',
        'amount' => 125,
        'status' => 'pending',
        'transacted_at' => now()->toDateString(),
    ]);

    $this->actingAs($admin)
        ->withoutVite()
        ->get(route('admin.dashboard'))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('Admin/dashboard')
            ->where('stats.users', 2)
            ->where('stats.wallets', 1)
            ->where('stats.activeCategories', 1)
            ->where('stats.activeBudgets', 1)
            ->where('stats.postedIncomeThisMonth', 1000)
            ->where('stats.postedExpenseThisMonth', 250)
            ->where('stats.netThisMonth', 750)
            ->where('stats.pendingTransactions', 1)
            ->where('topExpenseCategories.0.name', 'Food')
            ->where('recentTransactions.0.walletName', 'Main wallet')
        );
});
