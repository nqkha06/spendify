<?php

use App\Models\Category;
use App\Models\ExpenseTransaction;
use App\Models\User;
use App\Models\UserWallet;
use Inertia\Testing\AssertableInertia as Assert;

test('authenticated user can create expense transaction', function () {
    $user = User::factory()->create();
    $wallet = UserWallet::factory()->for($user)->create();
    $category = Category::factory()->create([
        'status' => 'active',
    ]);

    $payload = [
        'wallet_id' => $wallet->id,
        'category_id' => $category->id,
        'type' => 'expense',
        'amount' => 88.25,
        'transacted_at' => now()->format('Y-m-d'),
        'note' => 'Lunch',
        'labels' => 'food,team',
    ];

    $this->actingAs($user)
        ->post(route('expense.transactions.store'), $payload)
        ->assertRedirect(route('expense.transactions'));

    $this->assertDatabaseHas('expense_transactions', [
        'user_id' => $user->id,
        'wallet_id' => $wallet->id,
        'category_id' => $category->id,
        'type' => 'expense',
        'amount' => 88.25,
        'status' => 'posted',
        'note' => 'Lunch',
    ]);
});

test('user cannot create transaction with another users wallet', function () {
    $user = User::factory()->create();
    $otherUser = User::factory()->create();
    $otherWallet = UserWallet::factory()->for($otherUser)->create();
    $category = Category::factory()->create([
        'status' => 'active',
    ]);

    $payload = [
        'wallet_id' => $otherWallet->id,
        'category_id' => $category->id,
        'type' => 'expense',
        'amount' => 15,
        'transacted_at' => now()->format('Y-m-d'),
    ];

    $this->actingAs($user)
        ->from(route('expense.transactions'))
        ->post(route('expense.transactions.store'), $payload)
        ->assertRedirect(route('expense.transactions'))
        ->assertSessionHasErrors('wallet_id');

    $this->assertDatabaseCount('expense_transactions', 0);
});

test('transactions page renders user transaction data', function () {
    $user = User::factory()->create();
    $wallet = UserWallet::factory()->for($user)->create();
    $category = Category::factory()->create([
        'status' => 'active',
    ]);

    ExpenseTransaction::factory()->create([
        'user_id' => $user->id,
        'wallet_id' => $wallet->id,
        'category_id' => $category->id,
        'type' => 'income',
        'amount' => 1200,
        'transacted_at' => now()->format('Y-m-d'),
        'note' => 'Salary',
        'status' => 'posted',
    ]);

    $this->actingAs($user)
        ->get(route('expense.transactions'))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('User/Transactions')
            ->has('data.transactions', 1)
            ->where('data.transactions.0.note', 'Salary')
            ->where('data.transactions.0.type', 'income')
        );
});
