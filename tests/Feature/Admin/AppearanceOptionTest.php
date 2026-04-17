<?php

use App\Models\Setting;
use App\Models\User;

use function Pest\Laravel\actingAs;
use function Pest\Laravel\get;
use function Pest\Laravel\post;
use function Pest\Laravel\withoutVite;

it('admin can open appearance options page', function (): void {
    withoutVite();

    $admin = User::factory()->create([
        'email_verified_at' => now(),
    ]);

    actingAs($admin);

    $response = get(route('admin.settings.appearance.options.index'));

    $response->assertOk();
});

it('admin can save appearance general options', function (): void {
    $admin = User::factory()->create([
        'email_verified_at' => now(),
    ]);

    $payload = [
        'general' => [
            'vi' => [
                'site_name' => 'Cashback Viet',
                'site_title' => 'Cashback Viet Admin',
                'tagline' => 'Save more every day',
                'meta_description' => 'Vietnam cashback platform',
            ],
        ],
    ];

    actingAs($admin);

    $response = post(route('admin.settings.appearance.options.store'), $payload);

    $response->assertRedirect();

    $saved = Setting::query()->where('key', 'appearance.general')->value('value');

    expect($saved)->not->toBeNull();

    $decoded = json_decode((string) $saved, true);

    expect($decoded)->toBeArray()
        ->and($decoded['vi']['site_name'] ?? null)->toBe('Cashback Viet')
        ->and($decoded['vi']['site_title'] ?? null)->toBe('Cashback Viet Admin');
});
