<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SubCategory extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'main_category_id'
    ];

    public function maincategory(){
        return $this->belongsTo(MainCategory::class,'main_category_id','id');
    }

    public function basicproducts(){
        return $this->hasMany(BasicProduct::class);
    }

    protected $hidden = [
        'created_at',
        'updated_at',
    ];
}
