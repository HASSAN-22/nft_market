<?php

namespace App\Http\Controllers\V1\Auth;

use App\Enums\Access;
use App\Http\Controllers\Controller;
use App\Models\Profile;
use App\Models\User;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

use function App\Auxiliary\verifySignature;

class AuthController extends Controller
{
	/**
     * Register user
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function register(Request $request){
        $request->validate([
            'address'=>['required','min:42','max:42'],
            'signature'=>['required','min:132','max:132'],
            'chainId'=>['required','numeric']
        ]);
        if(!verifySignature($request->signature, $request->address)){
            return response(['status'=>'error', 'message'=>'signature is not valid'], 500);
        }
        DB::beginTransaction();
        try{
            $user = User::firstOrCreate(
                ['address'=>$request->address],
                ['signature'=>$request->signature, 'chain_id'=>$request->chainId,'access'=>'user']
            );
            $shortAddress = substr($user->address, 0, 6).'...'.substr($user->address, -4);
            $profile = $user->profile ?? Profile::create($this->setProfileData($user->id, $shortAddress));
            $token = $user->generateToken($request->header('User-Agent'));
            DB::commit();
            return response([
                'status'=>'success',
                'data'=>[
                    'token'=>$token,
                    'id'=>$user->id,
                    'address'=>$user->address,
                    'username'=>$profile->username,
                    'personal_id'=>$profile->personal_id,
                    'avatar'=>$profile->avatar,
                    'cover_image'=>$profile->cover_image,
                ]
            ],201);
        }catch(Exception $e){
            DB::rollBack();
            return response(['status'=>'error', 'message'=>$e],500);
        }
    }
	
	/**
     * Logout user
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function logout(Request $request){
        $user = auth()->user();
        $user->tokens()->delete();
        return response(['status'=>'success']);
    }
	
	
	/**
     * Token check for each request
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function checkToken(Request $request){
        if(auth()->check()){
            $user = auth()->user();
            $address = $request->address;
            $signature = $user->signature;
            $profile = $user->profile;

            return response([
                'status'=>'success',
                'token_is_expire'=>$this->tokenIsExpire($user),
                'address'=>$user->address,
                'signature'=>verifySignature($signature, $address),
                'id'=>$user->id,
                'username'=>$profile->username ?? null,
                'personal_id'=>$profile->personal_id ?? null,
                'avatar'=>$profile->avatar ?? null,
                'cover_image'=>$profile->cover_image ?? null,
            ]);


        }
        return response(['status'=>'error'], 500);
    }
	
	/**
     * User signature validation with user wallet address
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function checkSignature(Request $request){
        $user = $request->user();
        if(!is_null($user)){
            return response(['status'=>'success', 'data'=>['signature'=>verifySignature($user->signature, $user->address)]], 200);
        }
        return response(['status'=>'error'], 500);
    }
	
	/**
     * Check for token expiration
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    private function tokenIsExpire($user): bool{
        $token = $user->tokens()->first();
        $tokenIsExpire = $token->created_at->addHour(3) > now();
        if($tokenIsExpire){
            $token->created_at = now();
            $token->save();
        }
        return $tokenIsExpire;
    }

    private function setProfileData($userId, string $shortAddress): array{
        return [
            'user_id'=>$userId,
            'username'=>$shortAddress,
            'personal_id'=>$shortAddress,
            'avatar'=>'/img/user.png',
            'cover_image'=>'/img/bg.jpg',
        ];
    }
}
