<?php

use App\Models\User;
use App\Models\UserWallet;

test('user can have wallets and soft delete wallet', function () {
    $user = User::factory()->create();

    $wallet = UserWallet::query()->create([
        'user_id' => $user->id,
        'name' => 'Primary Wallet',
        'currency' => 'VND',
        'opening_balance' => 100000,
        'is_default' => true,
    ]);

    expect($user->wallets()->count())->toBe(1)
        ->and($wallet->user->is($user))->toBeTrue();

    $wallet->delete();

    expect(UserWallet::query()->find($wallet->id))->toBeNull()
        ->and(UserWallet::query()->withTrashed()->find($wallet->id))->not->toBeNull();
});
