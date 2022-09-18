<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MainCategory extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
    ];

    public function subcategories(){
        return $this->hasMany(SubCategory::class);
    }

//    public function basicproduct(){
//        return $this->hasManyThrough(BasicProduct::class,SubCategory::class);
//    }

    protected $hidden = [
        'created_at',
        'updated_at',
    ];

    //protected $appends = ['extra_column'];  //Buraya yazmak yerine Controllerdan $data->each()->setAppends(['extra_column'])  şeklinde çağırılabilir.

    public function getExtraColumn () {
        return $this->id ." ". $this->name;
    }
}
