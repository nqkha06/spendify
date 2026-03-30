<?php

use App\Models\Category;
use App\Models\User;
use Inertia\Testing\AssertableInertia as Assert;

test('admin can view categories list', function () {
    $user = User::factory()->create();
    Category::factory()->count(2)->create();

    $this->actingAs($user)
        ->get(route('admin.categories.index'))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('Admin/categories/list')
            ->has('categories')
            ->has('pagination')
        );
});

test('admin can create a category', function () {
    $user = User::factory()->create();

    $payload = [
        'name' => 'Groceries',
        'color' => '#f59e0b',
        'description' => 'Daily essentials',
        'status' => 'active',
    ];

    $this->actingAs($user)
        ->post(route('admin.categories.store'), $payload)
        ->assertRedirect(route('admin.categories.index'));

    $this->assertDatabaseHas('categories', [
        'name' => 'Groceries',
        'color' => '#f59e0b',
        'status' => 'active',
    ]);
});

test('admin can update a category', function () {
    $user = User::factory()->create();
    $category = Category::factory()->create([
        'name' => 'Transport',
        'color' => '#3b82f6',
        'status' => 'active',
    ]);

    $payload = [
        'name' => 'Transportation',
        'color' => '#3b82f6',
        'description' => 'Bus, taxi, fuel',
        'status' => 'active',
    ];

    $this->actingAs($user)
        ->put(route('admin.categories.update', $category), $payload)
        ->assertRedirect(route('admin.categories.index'));

    $this->assertDatabaseHas('categories', [
        'id' => $category->id,
        'name' => 'Transportation',
    ]);
});

test('admin can delete a category', function () {
    $user = User::factory()->create();
    $category = Category::factory()->create();

    $this->actingAs($user)
        ->delete(route('admin.categories.destroy', $category))
        ->assertRedirect(route('admin.categories.index'));

    $this->assertDatabaseMissing('categories', [
        'id' => $category->id,
    ]);
});

test('users can fetch active categories', function () {
    Category::factory()->create([
        'name' => 'Food',
        'status' => 'active',
        'color' => '#f59e0b',
    ]);
    Category::factory()->create([
        'name' => 'Hidden',
        'status' => 'inactive',
        'color' => '#94A3B8',
    ]);

    $this->get(route('expense.categories.index'))
        ->assertOk()
        ->assertJsonFragment(['name' => 'Food'])
        ->assertJsonMissing(['name' => 'Hidden']);
});
