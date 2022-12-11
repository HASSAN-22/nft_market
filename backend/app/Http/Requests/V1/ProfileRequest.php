<?php

namespace App\Http\Requests\V1;

use Illuminate\Foundation\Http\FormRequest;

class ProfileRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        $validation = [
            'username'=>['required','string','max:255'],
            'email'=>['required','string','email','max:255','unique:profiles,id'],
            'personal_id'=>['required','string','max:255','unique:profiles,id'],
            'bio'=>['nullable','string','max:1000'],
            'avatar'=>['required','image','mimes:jpg,jpeg,png,gif','max:10240'],
            'cover_image'=>['required','image','mimes:jpg,jpeg,png,gif','max:10240'],
            'telegram'=>['nullable','string','max:255'],
            'instagram'=>['nullable','string','max:255'],
            'facebook'=>['nullable','string','max:255'],
            'twitter'=>['nullable','string','max:255'],
            'tiktok'=>['nullable','string','max:255'],
            'snapchat'=>['nullable','string','max:255'],
            'youtube'=>['nullable','string','max:255'],
            'site'=>['nullable','string','max:255'],
        ];

        if($this->isMethod('patch')){
            $validation['avatar'] = is_file($this->avatar) ?  $validation['avatar'] : [];
            $validation['cover_image'] = is_file($this->cover_image) ? $validation['cover_image'] : [];
        }
        return $validation;
    }
}
