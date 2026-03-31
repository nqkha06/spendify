<?php

namespace Database\Factories;

use App\Models\User;
use App\Models\UserWallet;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<UserWallet>
 */
class UserWalletFactory extends Factory
{
    protected $model = UserWallet::class;

    public function definition(): array
    {
        return [
            'user_id' => User::factory(),
            'name' => fake()->unique()->randomElement([
                'Cash',
                'Bank Account',
                'E-Wallet',
                'Savings',
            ]).'-'.fake()->numerify('##'),
            'currency' => 'VND',
            'opening_balance' => fake()->randomFloat(2, 0, 5_000_000),
            'is_default' => false,
        ];
    }

    public function defaultWallet(): static
    {
        return $this->state(fn (): array => [
            'is_default' => true,
        ]);
    }
}
