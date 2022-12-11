<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Socialmedia extends Model
{
    use HasFactory;

    protected $table = 'socialmedias';

    protected $fillable = [
        'user_id',
        'telegram',
        'instagram',
        'facebook',
        'twitter',
        'tiktok',
        'snapchat',
        'youtube',
        'site',
    ];

    public function user(){
        return $this->belongsTo(User::class);
    }
}
