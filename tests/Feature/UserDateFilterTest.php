<?php

use App\Models\User;
use App\Services\UserService;
use Illuminate\Support\Carbon;

test('user service filters users by created date range', function () {
    User::factory()->create([
        'name' => 'Old User',
        'created_at' => Carbon::parse('2026-01-10 09:00:00'),
        'updated_at' => Carbon::parse('2026-01-10 09:00:00'),
    ]);

    $targetUser = User::factory()->create([
        'name' => 'Target User',
        'created_at' => Carbon::parse('2026-02-15 13:30:00'),
        'updated_at' => Carbon::parse('2026-02-15 13:30:00'),
    ]);

    User::factory()->create([
        'name' => 'New User',
        'created_at' => Carbon::parse('2026-03-20 18:00:00'),
        'updated_at' => Carbon::parse('2026-03-20 18:00:00'),
    ]);

    $users = app(UserService::class)->paginate([
        'created_from' => '2026-02-15',
        'created_to' => '2026-02-15',
        'per_page' => 10,
    ]);

    expect($users->total())->toBe(1)
        ->and($users->items()[0]->id)->toBe($targetUser->id);
});
