<?php

use App\Models\User;
use App\Models\UserWallet;

test('user can update their wallet', function () {
    $user = User::factory()->create();
    $wallet = UserWallet::factory()->create([
        'user_id' => $user->id,
        'name' => 'Cash',
        'currency' => 'VND',
        'opening_balance' => 100000,
        'is_default' => true,
    ]);

    $this->actingAs($user)
        ->put(route('expense.wallets.update', $wallet), [
            'name' => 'Main bank',
            'currency' => 'usd',
            'opening_balance' => 250.75,
            'is_default' => true,
        ])
        ->assertRedirect(route('expense.wallets'));

    $wallet->refresh();

    expect($wallet->name)->toBe('Main bank')
        ->and($wallet->currency)->toBe('USD')
        ->and($wallet->opening_balance)->toBe('250.75')
        ->and($wallet->is_default)->toBeTrue();
});

test('user cannot update another users wallet', function () {
    $user = User::factory()->create();
    $wallet = UserWallet::factory()->create();

    $this->actingAs($user)
        ->put(route('expense.wallets.update', $wallet), [
            'name' => 'Blocked update',
            'currency' => 'VND',
            'opening_balance' => 0,
            'is_default' => false,
        ])
        ->assertForbidden();
});

test('user can delete their wallet', function () {
    $user = User::factory()->create();
    $wallet = UserWallet::factory()->create(['user_id' => $user->id]);

    $this->actingAs($user)
        ->delete(route('expense.wallets.destroy', $wallet))
        ->assertRedirect(route('expense.wallets'));

    $this->assertSoftDeleted($wallet);
});

test('deleting the default wallet promotes another wallet', function () {
    $user = User::factory()->create();
    $defaultWallet = UserWallet::factory()->defaultWallet()->create(['user_id' => $user->id]);
    $nextWallet = UserWallet::factory()->create([
        'user_id' => $user->id,
        'is_default' => false,
    ]);

    $this->actingAs($user)
        ->delete(route('expense.wallets.destroy', $defaultWallet))
        ->assertRedirect(route('expense.wallets'));

    expect($nextWallet->refresh()->is_default)->toBeTrue();
});

test('user cannot delete another users wallet', function () {
    $user = User::factory()->create();
    $wallet = UserWallet::factory()->create();

    $this->actingAs($user)
        ->delete(route('expense.wallets.destroy', $wallet))
        ->assertForbidden();
});
