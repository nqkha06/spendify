<?php

use App\Models\User;
use Inertia\Testing\AssertableInertia as Assert;

it('renders expense tracker pages for guests', function (): void {
    $this->withoutVite();

    $pages = [
        '/user' => 'User/Dashboard',
        '/user/dashboard' => 'User/Dashboard',
        '/user/transactions' => 'User/Transactions',
        '/user/budgets' => 'User/Budgets',
        '/user/settings' => 'User/Setting',
    ];

    foreach ($pages as $uri => $component) {
        $this->get($uri)
            ->assertOk()
            ->assertInertia(fn (Assert $page) => $page
                ->component($component)
            );
    }
});

it('renders wallets page for authenticated users', function (): void {
    $this->withoutVite();

    $user = User::factory()->create();

    $this->actingAs($user)
        ->get('/user/wallets')
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('User/Wallets')
        );
});
