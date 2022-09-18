<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        User::create([                //default first user
            'name' => "admin",
            'email' => 'admin@admin.com',
            'password' => bcrypt("admin"),
            'user_level' => 0,
            'store_id' => null,
            'created_at'=> now(),
            'updated_at'=> now()
        ]);


    }
}
