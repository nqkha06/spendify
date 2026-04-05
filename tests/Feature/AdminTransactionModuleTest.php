<?php

use App\Models\Category;
use App\Models\ExpenseTransaction;
use App\Models\User;
use App\Models\UserWallet;
use Inertia\Testing\AssertableInertia as Assert;

test('admin can view transactions list', function () {
    $admin = User::factory()->create();
    $owner = User::factory()->create();
    $wallet = UserWallet::factory()->for($owner)->create();
    $category = Category::factory()->create([
        'status' => 'active',
    ]);

    ExpenseTransaction::factory()->create([
        'user_id' => $owner->id,
        'wallet_id' => $wallet->id,
        'category_id' => $category->id,
        'type' => 'expense',
        'status' => 'posted',
    ]);

    $this->actingAs($admin)
        ->get(route('admin.transactions.index'))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('Admin/transactions/list')
            ->has('transactions')
            ->has('pagination')
            ->has('formOptions')
        );
});

test('admin can create a transaction', function () {
    $admin = User::factory()->create();
    $owner = User::factory()->create();
    $wallet = UserWallet::factory()->for($owner)->create();
    $category = Category::factory()->create([
        'status' => 'active',
    ]);

    $payload = [
        'user_id' => $owner->id,
        'wallet_id' => $wallet->id,
        'category_id' => $category->id,
        'type' => 'income',
        'amount' => 2500,
        'transacted_at' => now()->format('Y-m-d'),
        'status' => 'posted',
        'note' => 'Monthly salary',
        'labels' => ['salary', 'monthly'],
    ];

    $this->actingAs($admin)
        ->post(route('admin.transactions.store'), $payload)
        ->assertRedirect(route('admin.transactions.index'));

    $this->assertDatabaseHas('expense_transactions', [
        'user_id' => $owner->id,
        'wallet_id' => $wallet->id,
        'category_id' => $category->id,
        'type' => 'income',
        'status' => 'posted',
        'note' => 'Monthly salary',
    ]);
});

test('admin can update a transaction', function () {
    $admin = User::factory()->create();
    $owner = User::factory()->create();
    $wallet = UserWallet::factory()->for($owner)->create();
    $category = Category::factory()->create([
        'status' => 'active',
    ]);

    $transaction = ExpenseTransaction::factory()->create([
        'user_id' => $owner->id,
        'wallet_id' => $wallet->id,
        'category_id' => $category->id,
        'type' => 'expense',
        'amount' => 99.5,
        'status' => 'pending',
        'note' => 'Initial note',
    ]);

    $payload = [
        'user_id' => $owner->id,
        'wallet_id' => $wallet->id,
        'category_id' => $category->id,
        'type' => 'expense',
        'amount' => 120.75,
        'transacted_at' => now()->format('Y-m-d'),
        'status' => 'posted',
        'note' => 'Updated note',
        'labels' => ['household'],
    ];

    $this->actingAs($admin)
        ->put(route('admin.transactions.update', $transaction), $payload)
        ->assertRedirect(route('admin.transactions.index'));

    $this->assertDatabaseHas('expense_transactions', [
        'id' => $transaction->id,
        'amount' => 120.75,
        'status' => 'posted',
        'note' => 'Updated note',
    ]);
});

test('admin can delete a transaction', function () {
    $admin = User::factory()->create();
    $transaction = ExpenseTransaction::factory()->create();

    $this->actingAs($admin)
        ->delete(route('admin.transactions.destroy', $transaction))
        ->assertRedirect(route('admin.transactions.index'));

    $this->assertDatabaseMissing('expense_transactions', [
        'id' => $transaction->id,
    ]);
});
