<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class NftKeyword extends Model
{
    use HasFactory;

    protected $table = 'nft_keywords';

    protected $fillable = [
        'nft_id',
        'keyword',
    ];

    public function nft(){
        return $this->belongsTo(Nft::class);
    }
}
