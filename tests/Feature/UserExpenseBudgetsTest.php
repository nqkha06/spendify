<?php

use App\Models\Budget;
use App\Models\Category;
use App\Models\ExpenseTransaction;
use App\Models\User;
use App\Models\UserWallet;
use Inertia\Testing\AssertableInertia as Assert;

test('budgets page renders real budget data for authenticated user', function () {
    $user = User::factory()->create();
    $wallet = UserWallet::factory()->for($user)->create();
    $category = Category::factory()->create([
        'name' => 'Ăn uống',
        'status' => 'active',
    ]);

    Budget::factory()->create([
        'user_id' => $user->id,
        'category_id' => $category->id,
        'amount_limit' => 500,
        'period' => 'monthly',
        'status' => 'active',
    ]);

    ExpenseTransaction::factory()->create([
        'user_id' => $user->id,
        'wallet_id' => $wallet->id,
        'category_id' => $category->id,
        'type' => 'expense',
        'amount' => 150,
        'status' => 'posted',
        'transacted_at' => now()->format('Y-m-d'),
    ]);

    ExpenseTransaction::factory()->create([
        'user_id' => $user->id,
        'wallet_id' => $wallet->id,
        'category_id' => $category->id,
        'type' => 'income',
        'amount' => 500,
        'status' => 'posted',
        'transacted_at' => now()->format('Y-m-d'),
    ]);

    $this->actingAs($user)
        ->get(route('expense.budgets'))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('User/Budgets')
            ->has('data.budgets', 1)
            ->where('data.budgets.0.limit', 500)
            ->where('data.budgets.0.spent', 150)
        );
});

test('authenticated user can create a budget from user budgets page', function () {
    $user = User::factory()->create();
    $category = Category::factory()->create([
        'status' => 'active',
    ]);

    $payload = [
        'category_id' => $category->id,
        'amount_limit' => 650,
        'period' => 'monthly',
        'note' => 'Budget from user page',
    ];

    $this->actingAs($user)
        ->post(route('expense.budgets.store'), $payload)
        ->assertRedirect(route('expense.budgets'));

    $this->assertDatabaseHas('budgets', [
        'user_id' => $user->id,
        'category_id' => $category->id,
        'amount_limit' => 650,
        'period' => 'monthly',
        'status' => 'active',
        'note' => 'Budget from user page',
    ]);
});

test('guest cannot create budget from user budgets page', function () {
    $category = Category::factory()->create([
        'status' => 'active',
    ]);

    $payload = [
        'category_id' => $category->id,
        'amount_limit' => 650,
        'period' => 'monthly',
    ];

    $this->post(route('expense.budgets.store'), $payload)
        ->assertRedirect(route('login'));

    $this->assertDatabaseCount('budgets', 0);
});
