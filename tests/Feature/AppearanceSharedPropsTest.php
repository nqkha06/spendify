<?php

use App\Models\Setting;

use function Pest\Laravel\get;
use function Pest\Laravel\withoutVite;

it('shares dynamic appearance options to landing and user pages', function (): void {
    withoutVite();

    Setting::query()->updateOrCreate(
        ['key' => 'appearance.general'],
        [
            'value' => json_encode([
                'en' => [
                    'site_name' => 'Dynamic Brand',
                    'site_title' => 'Dynamic Site Title',
                    'tagline' => 'Dynamic tagline',
                    'meta_description' => 'Dynamic meta description',
                ],
            ]),
        ],
    );

    get(route('home'))
        ->assertOk()
        ->assertSee('Dynamic Brand')
        ->assertSee('Dynamic Site Title');

    get(route('expense.home'))
        ->assertOk()
        ->assertSee('Dynamic Brand')
        ->assertSee('Dynamic Site Title');
});
