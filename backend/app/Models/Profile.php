<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Profile extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'username',
        'email',
        'personal_id',
        'avatar',
        'cover_image',
        'bio'
    ];

    public function user(){
        return $this->belongsTo(User::class);
    }
}
