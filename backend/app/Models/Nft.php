<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Nft extends Model
{
    use HasFactory;

    protected $table = 'nfts';

    protected $fillable = [
        'user_id',
        'collection_id',
        'title',
        'type',
        'image',
        'audio',
        'video',
        'slug',
        'description',
    ];

    public function user(){
        return $this->belongsTo(User::class);
    }

    public function collection(){
        return $this->belongsTo(Collection::class);
    }

    public function nftAttributes(){
        return $this->hasMany(NftAttribute::class);
    }

    public function nftKeywords(){
        return $this->hasMany(NftKeyword::class);
    }
}
