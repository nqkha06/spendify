<?php

namespace Database\Factories;

use App\Models\Category;
use App\Models\User;
use App\Models\UserWallet;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\ExpenseTransaction>
 */
class ExpenseTransactionFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $type = fake()->randomElement(['income', 'expense']);

        return [
            'user_id' => User::factory(),
            'wallet_id' => UserWallet::factory(),
            'category_id' => Category::factory(),
            'type' => $type,
            'amount' => fake()->randomFloat(2, 10, 5_000_000),
            'transacted_at' => fake()->dateTimeBetween('-3 months', 'now')->format('Y-m-d'),
            'status' => fake()->randomElement(['posted', 'pending']),
            'note' => $type === 'income' ? 'Khoản thu mẫu' : 'Khoản chi mẫu',
            'labels' => fake()->boolean(40) ? [fake()->word(), fake()->word()] : null,
        ];
    }

    public function forUser(User $user): static
    {
        return $this->state(function () use ($user): array {
            return [
                'user_id' => $user->id,
                'wallet_id' => UserWallet::factory()->for($user),
            ];
        });
    }
}
