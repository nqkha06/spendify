<?php

use App\Models\User;
use App\Models\UserWallet;

test('user can create wallet and set it as default', function () {
    $user = User::factory()->create();
    $existingWallet = UserWallet::factory()->for($user)->defaultWallet()->create();

    $this->actingAs($user)
        ->post('/user/wallets', [
            'name' => 'Primary Wallet',
            'currency' => 'usd',
            'opening_balance' => 1250.75,
            'is_default' => true,
        ])
        ->assertRedirect(route('expense.wallets'));

    $newWallet = UserWallet::query()
        ->where('user_id', $user->id)
        ->where('name', 'Primary Wallet')
        ->first();

    expect($newWallet)->not->toBeNull()
        ->and($newWallet?->currency)->toBe('USD')
        ->and($newWallet?->is_default)->toBeTrue();

    expect($existingWallet->fresh()?->is_default)->toBeFalse();
});
