<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Models\MainCategory;
use App\Models\BasicProduct;
use App\Models\Store;
use App\Models\SubCategory;
use App\Models\User;
use Illuminate\Database\Seeder;
use DB;
use Illuminate\Support\Str;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        DB::statement('SET FOREIGN_KEY_CHECKS=0');

        MainCategory::truncate();
        SubCategory::truncate();
        BasicProduct::truncate();
        Store::truncate();
        User::truncate();

        DB::statement('TRUNCATE table photos');

        $this->call([       // php artisan db:seed
            UserSeeder::class,
        ]);

        Store::factory(4)->create()->each(function ($store){
            User::factory(1)->create(["store_id"=>$store->id,"user_level"=>1]);
            for ($i=1 ; $i<3 ; $i++) {
                $store->photos()->create(["path"=>"ex".$i.".png","type"=>$i]);
            }
        });

        MainCategory::factory(2)->create()->each(function ($maincategory){
            SubCategory::factory(2)->create([
                'main_category_id'=>$maincategory->id
            ]);
        });

        DB::statement('SET FOREIGN_KEY_CHECKS=1');
    }
}
