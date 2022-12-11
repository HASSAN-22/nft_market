<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Collection extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'title',
        'slug',
        'symbol',
        'description',
        'logo',
        'bg_image',
    ];

    public function user(){
        return $this->belongsTo(User::class);
    }

    public function nfts(){
        return $this->hasMany(Nft::class);
    }
}
