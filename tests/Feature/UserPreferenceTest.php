<?php

use App\Models\User;
use Inertia\Testing\AssertableInertia as Assert;

test('authenticated user can view settings page with default currency', function () {
    $this->withoutVite();

    $user = User::factory()->create();

    $this->actingAs($user)
        ->get(route('user.settings'))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('User/Setting')
            ->where('preferences.currency', 'VND')
        );
});

test('authenticated user can update currency preference', function () {
    $user = User::factory()->create();

    $this->actingAs($user)
        ->from(route('user.settings'))
        ->patch(route('user.settings.preferences.update'), [
            'currency' => 'USD',
        ])
        ->assertRedirect(route('user.settings'));

    $this->assertDatabaseHas('user_metas', [
        'user_id' => $user->id,
        'meta_key' => 'currency',
        'meta_value' => 'USD',
    ]);
});

test('currency preference must be valid', function () {
    $user = User::factory()->create();

    $this->actingAs($user)
        ->patch(route('user.settings.preferences.update'), [
            'currency' => 'CAD',
        ])
        ->assertSessionHasErrors('currency');

    $this->assertDatabaseMissing('user_metas', [
        'user_id' => $user->id,
        'meta_key' => 'currency',
    ]);
});
