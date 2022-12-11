<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

use function App\Auxiliary\getDevice;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'access',
        'address',
        'signature',
        'chain_id',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'signature',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [];

    public function isAdmin(){
        return $this->access == 'admin';
    }

    public function isUser(){
        return $this->access == 'user';
    }

    /**
     * @param string $userAgent
     * @param User $user
     * @return \Laravel\Sanctum\string|string
     */
    public function generateToken(string $userAgent){
        $this->tokens()->delete();
        $device = getDevice($userAgent);
        return $this->createToken($device)->plainTextToken;
    }

    public function profile(){
        return $this->hasOne(Profile::class);
    }

    public function collections(){
        return $this->hasMany(Collection::class);
    }

    public function nfts(){
        return $this->hasMany(Nft::class);
    }

    public function socialMedia(){
        return $this->hasOne(Socialmedia::class);
    }
}
