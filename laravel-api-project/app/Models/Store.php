<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class Store extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'address',
        'phone',
        'email',
    ];


    public function photos(){
        return $this->morphMany(Photo::class, 'table')->orderBy('type','ASC');
    }

    public function workers(){
        return $this->hasMany(User::class)->where('user_level',2);;
    }

    public function owner(){
        return $this->hasOne(User::class)->where('user_level',1);
    }


    public function products(){
        return $this->hasMany(Product::class);
    }

    protected $hidden = [
        'created_at',
        'updated_at',
    ];

    public function getProductPhotosAttribute (){
        $photos=$this->photos;
        $mapped = $photos->map(function ($photo){
            return [
                "id"=>$photo['id'],
                "path"=>asset(Storage::url($photo['path'])),
                "type"=>$photo['type'],
            ] ;
        });
        return $mapped;
    }

}
