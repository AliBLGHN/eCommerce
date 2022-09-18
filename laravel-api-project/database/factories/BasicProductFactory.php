<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\BasicProduct>
 */
class BasicProductFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'name' => "P-".fake()->unique()->word(),
            'description' => fake()->sentence(5),
           // 'sub_category_id' => SubCategory::factory()->create()
        ];
    }
}
