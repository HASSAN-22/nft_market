<?php

use App\Http\Controllers\SiteController;
use App\Http\Controllers\V1\Auth\AuthController;
use App\Http\Controllers\V1\CollectionController;
use App\Http\Controllers\V1\NftController;
use App\Http\Controllers\V1\ProfileController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::group([],function(){
    Route::controller(AuthController::class)->group(function(){
        Route::post('register', 'register')->name('register');
        Route::group(['middleware'=>'auth:sanctum'],function(){
            Route::post('logout', 'logout')->name('logout');
            Route::post('check-token', 'checkToken')->name('check.token');
            Route::post('check-signature', 'checkSignature')->name('check.signature');
        });
    });
    Route::controller(SiteController::class)->group(function(){
        Route::group(['middleware'=>'auth:sanctum'],function(){
            Route::get('get-collections', 'getCollections')->name('get.collections');
        });
    });
});

Route::group(['middleware'=>'auth:sanctum'],function(){
    Route::apiResource('collection', CollectionController::class);
    Route::apiResource('nft', NftController::class);

    Route::controller(ProfileController::class)->group(function(){
        Route::get('profile/{user}','show');
        Route::patch('profile/{user}','update');
        Route::post('check-personal-id', 'checkPersonalId')->name('check.personal.id');
    });
});

