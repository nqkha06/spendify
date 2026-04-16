<?php

use App\Models\Budget;
use App\Models\Category;
use App\Models\ExpenseTransaction;
use App\Models\User;
use App\Models\UserWallet;
use Inertia\Testing\AssertableInertia as Assert;

test('admin can view categories list after service repository refactor', function () {
    $this->withoutVite();

    $admin = User::factory()->create();
    Category::factory()->create(['name' => 'Food', 'status' => 'active']);

    $this->actingAs($admin)
        ->get(route('admin.categories.index'))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('Admin/categories/list')
            ->has('categories', 1)
            ->where('categories.0.name', 'Food')
        );
});

test('admin can view budgets list after service repository refactor', function () {
    $this->withoutVite();

    $admin = User::factory()->create();
    $owner = User::factory()->create();
    $category = Category::factory()->create(['name' => 'Housing', 'status' => 'active']);

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
            ->has('budgets', 1)
        );
});

test('admin can view transactions list after service repository refactor', function () {
    $this->withoutVite();

    $admin = User::factory()->create();
    $owner = User::factory()->create();
    $category = Category::factory()->create(['name' => 'Salary', 'status' => 'active']);
    $wallet = UserWallet::factory()->for($owner)->create();

    ExpenseTransaction::factory()->create([
        'user_id' => $owner->id,
        'wallet_id' => $wallet->id,
        'category_id' => $category->id,
        'type' => 'income',
        'status' => 'posted',
    ]);

    $this->actingAs($admin)
        ->get(route('admin.transactions.index'))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('Admin/transactions/list')
            ->has('transactions', 1)
        );
});
