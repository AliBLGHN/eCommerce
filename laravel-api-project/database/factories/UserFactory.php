<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\User>
 */
class UserFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        $name = fake('tr_TR')->firstName()." ".fake('tr_TR')->unique()->lastName();
        return [
            'name' => $name,
            'email' => Str::slug($name,'')."@".fake('tr_TR')->safeEmailDomain(),
            'password' => bcrypt(123), // password
            'user_level' => 2
            //store_id
        ];
    }

}
