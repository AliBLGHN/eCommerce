<?php

namespace App\Models;

use App\Http\Resources\PhotoResource;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class BasicProduct extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        "description",
        'sub_category_id',
    ];

    public function photos(){
        return $this->morphMany(Photo::class, 'table')->orderBy('type','ASC');  //with ile photolar giderken type'a göre sıralanıp giderse front-end'de main foto aranmadan ilk indis main olarak seçilebilir
    }

    public function subcategory(){
        return $this->belongsTo(SubCategory::class,'sub_category_id','id');
    }

    public function products(){
        return $this->hasMany(Product::class)->with('store')->orderBy('price','asc');
    }

//    public function stores(){
//        return $this->belongsToMany(Store::class,'product');
//    }


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

//    public function store(){
//        return $this->hasOneThrough(Store::class,Product::class);
//    }

    protected $hidden = [
        'created_at',
        'updated_at',
    ];



}
