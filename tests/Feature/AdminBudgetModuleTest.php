<?php

use App\Models\Budget;
use App\Models\Category;
use App\Models\ExpenseTransaction;
use App\Models\User;
use App\Models\UserWallet;
use Inertia\Testing\AssertableInertia as Assert;

test('admin can view budgets list', function () {
    $admin = User::factory()->create();
    $owner = User::factory()->create();
    $category = Category::factory()->create([
        'status' => 'active',
    ]);

    Budget::factory()->create([
        'user_id' => $owner->id,
        'category_id' => $category->id,
        'period' => 'monthly',
        'status' => 'active',
    ]);

    $this->actingAs($admin)
        ->get(route('admin.budgets.index'))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('Admin/budgets/list')
            ->has('budgets')
            ->has('pagination')
            ->has('formOptions')
        );
});

test('admin can create a budget', function () {
    $admin = User::factory()->create();
    $owner = User::factory()->create();
    $category = Category::factory()->create([
        'status' => 'active',
    ]);

    $payload = [
        'user_id' => $owner->id,
        'category_id' => $category->id,
        'amount_limit' => 900,
        'period' => 'monthly',
        'status' => 'active',
        'note' => 'Monthly food budget',
    ];

    $this->actingAs($admin)
        ->post(route('admin.budgets.store'), $payload)
        ->assertRedirect(route('admin.budgets.index'));

    $this->assertDatabaseHas('budgets', [
        'user_id' => $owner->id,
        'category_id' => $category->id,
        'period' => 'monthly',
        'status' => 'active',
        'note' => 'Monthly food budget',
    ]);
});

test('admin can update a budget', function () {
    $admin = User::factory()->create();
    $owner = User::factory()->create();
    $category = Category::factory()->create([
        'status' => 'active',
    ]);

    $budget = Budget::factory()->create([
        'user_id' => $owner->id,
        'category_id' => $category->id,
        'amount_limit' => 500,
        'period' => 'monthly',
        'status' => 'inactive',
    ]);

    $payload = [
        'user_id' => $owner->id,
        'category_id' => $category->id,
        'amount_limit' => 750,
        'period' => 'monthly',
        'status' => 'active',
        'note' => 'Updated budget',
    ];

    $this->actingAs($admin)
        ->put(route('admin.budgets.update', $budget), $payload)
        ->assertRedirect(route('admin.budgets.index'));

    $this->assertDatabaseHas('budgets', [
        'id' => $budget->id,
        'amount_limit' => 750,
        'status' => 'active',
        'note' => 'Updated budget',
    ]);
});

test('admin can delete a budget', function () {
    $admin = User::factory()->create();
    $budget = Budget::factory()->create();

    $this->actingAs($admin)
        ->delete(route('admin.budgets.destroy', $budget))
        ->assertRedirect(route('admin.budgets.index'));

    $this->assertDatabaseMissing('budgets', [
        'id' => $budget->id,
    ]);
});

test('admin budgets list includes computed spent amount', function () {
    $admin = User::factory()->create();
    $owner = User::factory()->create();
    $wallet = UserWallet::factory()->for($owner)->create();
    $category = Category::factory()->create([
        'status' => 'active',
    ]);

    Budget::factory()->create([
        'user_id' => $owner->id,
        'category_id' => $category->id,
        'amount_limit' => 1000,
        'period' => 'monthly',
        'status' => 'active',
    ]);

    ExpenseTransaction::factory()->create([
        'user_id' => $owner->id,
        'wallet_id' => $wallet->id,
        'category_id' => $category->id,
        'type' => 'expense',
        'status' => 'posted',
        'amount' => 125,
        'transacted_at' => now()->format('Y-m-d'),
    ]);

    ExpenseTransaction::factory()->create([
        'user_id' => $owner->id,
        'wallet_id' => $wallet->id,
        'category_id' => $category->id,
        'type' => 'expense',
        'status' => 'posted',
        'amount' => 75,
        'transacted_at' => now()->format('Y-m-d'),
    ]);

    $this->actingAs($admin)
        ->get(route('admin.budgets.index'))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('Admin/budgets/list')
            ->where('budgets.0.spent', 200)
        );
});
