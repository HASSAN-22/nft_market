<?php

namespace App\Http\Requests\V1;

use Illuminate\Foundation\Http\FormRequest;

class NftRequest extends FormRequest
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
        $mimes = $this->type == 'audio' ? 'mp3,flac,alac' : 'mp4';

        $validation = [
            'collection_id'=>['required','numeric','exists:collections,id'],
            'type'=>['required','string','in:image,audio,video'],
            'title'=>['required','string','max:255'],
            'description'=>['required','string','max:1000'],
            'image'=>['required','image','mimes:jpg,jpeg,png,gif','max:20480'],
            'file'=>['nullable',"mimes:$mimes",'max:51200'],
            'keywords'=>['nullable','array'],
            'keywords.*'=>['nullable','string','max:255'],
            'attributeKeys'=>['nullable','array'],
            'attributeKeys.*'=>['nullable','string','max:255'],
            'attributeValues'=>['nullable','array'],
            'attributeValues.*'=>['nullable','string','max:255']
        ];
        if($this->isMethod('patch')){
            $validation['image'][0] = 'nullable';
            $validation['type'][0] = 'nullable';
        }

        return $validation;
    }
}
