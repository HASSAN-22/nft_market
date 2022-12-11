<?php

namespace App\Http\Controllers\V1;

use App\Auxiliary\Uploader\Upload;
use App\Http\Controllers\Controller;
use App\Http\Requests\V1\ProfileRequest;
use App\Models\Profile;
use App\Models\Socialmedia;
use App\Models\User;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ProfileController extends Controller
{
    private $uploaderPath = 'uploader/profile';
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }


    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\User  $user
     * @return \Illuminate\Http\Response
     */
    public function show(User $user)
    {
        $profile = $user->profile;
        $this->authorize('view', $profile);
        $socialMedia = auth()->user()->socialMedia;
        return response(['status'=>'success','data'=>['profile'=>$profile, 'social_media'=>$socialMedia]]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\User  $user
     * @return \Illuminate\Http\Response
     */
    public function update(ProfileRequest $request, User $user)
    {
        $profile = $user->profile;
        $this->authorize('update', $profile);
        DB::beginTransaction();
        try{
            $avatar = Upload::upload($request, 'avatar', $this->uploaderPath, $profile->avatar);
            $cover_image = Upload::upload($request, 'cover_image', $this->uploaderPath, $profile->cover_image);
            $profile->user_id = $user->id;
            $profile->username = $request->username;
            $profile->email = $request->email;
            $profile->personal_id = $request->personal_id;
            $profile->avatar = $avatar;
            $profile->cover_image = $cover_image;
            $profile->bio = $request->bio;
            $profile->save();

            $socialmedia = $user->socialMedia ?? new Socialmedia();
            $socialmedia->user_id = $user->id;
            $socialmedia->telegram = $request->telegram;
            $socialmedia->instagram = $request->instagram;
            $socialmedia->facebook = $request->facebook;
            $socialmedia->twitter = $request->twitter;
            $socialmedia->tiktok = $request->tiktok;
            $socialmedia->snapchat = $request->snapchat;
            $socialmedia->youtube = $request->youtube;
            $socialmedia->site = $request->site;
            $socialmedia->save();
            DB::commit();
            return response(['status'=>'success'], 201);
        }catch(Exception $e){
            DB::rollBack();
            return response(['status'=>'error', 'message'=>$e->getMessage()], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Profile  $profile
     * @return \Illuminate\Http\Response
     */
    public function destroy(Profile $profile)
    {
        //
    }

    public function checkPersonalId(Request $request){
        $request->validate([
            'personal_id'=>['required','string','unique:profiles,id']
        ]);
    }
}
