<?php

use Inertia\Testing\AssertableInertia as Assert;

// it('renders all expense tracker pages with mock data', function (): void {
//     $this->withoutVite();

//     $pages = [
//         '/user' => 'ExpenseTracker/App',
//         '/user/dashboard' => 'ExpenseTracker/App',
//         '/user/transactions' => 'ExpenseTracker/App',
//         '/user/budgets' => 'ExpenseTracker/App',
//         '/user/wallets' => 'ExpenseTracker/App',
//         '/user/settings' => 'ExpenseTracker/App',
//     ];

//     foreach ($pages as $uri => $component) {
//         $this->get($uri)
//             ->assertOk()
//             ->assertInertia(fn (Assert $page) => $page
//                 ->component($component)
//             );
//     }
// });

// it('returns 404 for routes not present in personal expense tracker UI', function (): void {
//     $this->withoutVite();

//     $this->get('/user/about')->assertNotFound();
//     $this->get('/user/contact')->assertNotFound();
//     $this->get('/user/login')->assertNotFound();
// });
