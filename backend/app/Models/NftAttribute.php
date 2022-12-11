<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class NftAttribute extends Model
{
    use HasFactory;

    public $timestamps = false;

    protected $table = 'nft_attributes';

    protected $fillable = [
        'nft_id',
        'key',
        'value',
    ];

    public function nft(){
        return $this->belongsTo(Nft::class);
    }
}
