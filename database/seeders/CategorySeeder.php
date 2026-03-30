<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = [
            ['name' => 'Food & Dining', 'color' => '#f59e0b'],
            ['name' => 'Transportation', 'color' => '#3b82f6'],
            ['name' => 'Shopping', 'color' => '#ec4899'],
            ['name' => 'Entertainment', 'color' => '#8b5cf6'],
            ['name' => 'Bills & Utilities', 'color' => '#ef4444'],
            ['name' => 'Salary', 'color' => '#10b981'],
        ];

        foreach ($categories as $category) {
            Category::query()->firstOrCreate(
                ['name' => $category['name']],
                [
                    'color' => $category['color'],
                    'status' => 'active',
                ],
            );
        }
    }
}
