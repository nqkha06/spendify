<?php

namespace Database\Factories;

use App\Models\Category;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Budget>
 */
class BudgetFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'user_id' => User::factory(),
            'category_id' => Category::factory(),
            'amount_limit' => fake()->randomFloat(2, 50, 10000),
            'period' => fake()->randomElement(['monthly', 'yearly']),
            'status' => fake()->randomElement(['active', 'inactive']),
            'note' => fake()->optional()->sentence(),
        ];
    }
}
