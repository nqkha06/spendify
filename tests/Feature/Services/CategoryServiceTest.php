<?php

use App\Models\Category;
use App\Services\CategoryService;

it('can create and update category through service methods', function (): void {
    $service = app(CategoryService::class);

    $createdCategory = $service->create([
        'name' => 'Utilities',
        'color' => '#123456',
        'description' => 'Monthly utility expenses',
        'status' => 'active',
    ]);

    expect($createdCategory)->toBeInstanceOf(Category::class)
        ->and($createdCategory->name)->toBe('Utilities')
        ->and($createdCategory->status)->toBe('active');

    $updatedCategory = $service->update($createdCategory->id, [
        'name' => 'Utilities Updated',
        'color' => '#654321',
        'description' => 'Updated utility expenses',
        'status' => 'inactive',
    ]);

    expect($updatedCategory)->toBeInstanceOf(Category::class)
        ->and($updatedCategory->name)->toBe('Utilities Updated')
        ->and($updatedCategory->status)->toBe('inactive');

    expect(
        Category::query()
            ->whereKey($createdCategory->id)
            ->where('name', 'Utilities Updated')
            ->where('status', 'inactive')
            ->exists()
    )->toBeTrue();
});
