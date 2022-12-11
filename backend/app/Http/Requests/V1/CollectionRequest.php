<?php

namespace App\Http\Requests\V1;

use Illuminate\Foundation\Http\FormRequest;

class CollectionRequest extends FormRequest
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
            'title' => ['required','string','max:255'],
            'symbol' => ['required','string','max:255'],
            'description' => ['nullable', 'string','max:1000'],
            'logo' => ['required','image','mimes:jpg,jpeg,png,gif', 'max:15360'],
            'bg_image' => ['required','image','mimes:jpg,jpeg,png,gif', 'max:15360'],
        ];
        if($this->isMethod('patch')){
            $validation['logo'][0] = 'nullable';
            $validation['bg_image'][0] = 'nullable';
        }
        return $validation;
    }
}
