<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Store>
 */
class StoreFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        $name = fake('tr_TR')->firstName()." ".fake('tr_TR')->lastName();
        $company = fake('tr_TR')->unique()->city()." ".fake()->randomElement(["Store","Ticaret","Perakende"]);
        return [
            'name' => $company,
            'address' => fake('tr_TR')->streetAddress(),
            'email' => "info@".Str::slug($company,'').".com",
            'phone' => fake('tr_TR')->e164PhoneNumber(),
        ];
    }
}
