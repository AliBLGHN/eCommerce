<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Photo extends Model
{
    use HasFactory;

    protected $fillable = [
        'path',
        'table_type',
        'table_id',
        'type'
    ];

    public function table()
    {
        return $this->morphTo();
    }

    protected $hidden = [
        'created_at',
        'updated_at',
        'table_type',
        'table_id',
    ];

//    protected $casts = [
//        'type' =>
//    ];

}
