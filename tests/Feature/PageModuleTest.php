<?php

use App\Enums\BaseStatusEnum;
use App\Models\Page;
use App\Models\User;
use Inertia\Testing\AssertableInertia as Assert;

test('admin can view pages list', function () {
    $this->withoutVite();

    $admin = User::factory()->create();

    Page::query()->create([
        'user_id' => $admin->id,
        'title' => 'About Us',
        'slug' => 'about-us',
        'status' => BaseStatusEnum::DRAFT->value,
    ]);

    $this->actingAs($admin)
        ->get(route('admin.pages.index'))
        ->assertOk()
        ->assertInertia(fn (Assert $inertia) => $inertia
            ->component('Admin/pages/list')
            ->has('pages', 1)
            ->where('pages.0.title', 'About Us')
        );
});

test('admin can create update and delete a page', function () {
    $admin = User::factory()->create();

    $createPayload = [
        'status' => BaseStatusEnum::PUBLISHED->value,
        'title' => 'Company Intro',
        'slug' => 'company-intro',
        'image' => null,
        'tags' => 'company,about',
        'content' => 'Initial content',
        'meta_title' => 'Company Intro',
        'meta_description' => 'Company intro description',
        'meta_keywords' => 'company,intro',
    ];

    $this->actingAs($admin)
        ->post(route('admin.pages.store'), $createPayload)
        ->assertRedirect(route('admin.pages.index'));

    $page = Page::query()->firstOrFail();

    expect($page->status->value)->toBe(BaseStatusEnum::PUBLISHED->value)
        ->and($page->title)->toBe('Company Intro')
        ->and($page->slug)->toBe('company-intro');

    $updatePayload = [
        'status' => BaseStatusEnum::DRAFT->value,
        'title' => 'Company Intro Updated',
        'slug' => 'company-intro-updated',
        'image' => null,
        'tags' => 'company,draft',
        'content' => 'Updated content',
        'meta_title' => 'Company Intro Updated',
        'meta_description' => 'Updated description',
        'meta_keywords' => 'company,updated',
    ];

    $this->actingAs($admin)
        ->put(route('admin.pages.update', $page), $updatePayload)
        ->assertRedirect(route('admin.pages.index'));

    $this->assertDatabaseHas('pages', [
        'id' => $page->id,
        'title' => 'Company Intro Updated',
        'slug' => 'company-intro-updated',
    ]);

    $this->actingAs($admin)
        ->delete(route('admin.pages.destroy', $page))
        ->assertRedirect(route('admin.pages.index'));

    $this->assertDatabaseMissing('pages', ['id' => $page->id]);
});
