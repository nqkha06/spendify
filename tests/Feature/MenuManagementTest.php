<?php

use App\Models\Menu;
use App\Models\User;
use Inertia\Testing\AssertableInertia as Assert;

test('admin can view menu management list', function () {
    $this->withoutVite();

    $admin = User::factory()->create();
    Menu::factory()->header()->create([
        'title' => 'Features',
        'url' => '/#features',
        'canonical' => 'home.header',
    ]);

    $this->actingAs($admin)
        ->get(route('admin.menus.index'))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('Admin/menus/list')
            ->has('menus', 1)
            ->where('menus.0.title', 'Features')
        );
});

test('public pages receive dynamic header and footer menus with submenu', function () {
    $this->withoutVite();

    $headerParent = Menu::factory()->header()->create([
        'title' => 'Products',
        'url' => '/products',
        'sort_order' => 1,
        'canonical' => 'home.header',
    ]);

    Menu::factory()->header()->create([
        'title' => 'Pricing',
        'url' => '/pricing',
        'parent_id' => $headerParent->id,
        'sort_order' => 1,
        'canonical' => 'home.header',
    ]);

    Menu::factory()->header()->inactive()->create([
        'title' => 'Hidden',
        'url' => '/hidden',
        'canonical' => 'home.header',
    ]);

    Menu::factory()->footer()->create([
        'title' => 'Support',
        'url' => '/support',
        'sort_order' => 1,
        'canonical' => 'home.footer',
    ]);

    $response = $this->get('/');

    $response
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->has('publicMenus.homeHeader', 1)
            ->where('publicMenus.homeHeader.0.title', 'Products')
            ->has('publicMenus.homeHeader.0.children', 1)
            ->where('publicMenus.homeHeader.0.children.0.title', 'Pricing')
            ->has('publicMenus.homeFooter', 1)
            ->where('publicMenus.homeFooter.0.title', 'Support')
        );
});
