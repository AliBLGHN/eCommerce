<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TmpStore extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'store_id'
    ];

    protected $hidden = [
        'created_at',
        'updated_at',
    ];

    public function owner()
    {
        return $this->belongsTo(User::class,'user_id','id');
    }

    public function store()
    {
        return  $this->belongsTo(Store::class,'store_id','id');
    }
}
