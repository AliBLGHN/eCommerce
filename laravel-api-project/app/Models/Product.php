<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    protected $fillable = [
        'basic_product_id',
        'store_id',
        'price',
        'stock'
    ];

    public function basicproduct()
    {
        return $this->belongsTo(BasicProduct::class,'basic_product_id','id');
                                                                                                //->with('photos');
    }

    public function store()
    {
        return  $this->belongsTo(Store::class,'store_id','id')
            ->with(['photos'=>function($query){
                $query->where('type','=',1);
            }]);
    }


    protected $hidden = [
        'created_at',
        'updated_at',
    ];
}
