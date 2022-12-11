<?php

namespace App\Http\Resources\V1;

use Illuminate\Http\Resources\Json\JsonResource;

class NftResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return [
            'id'=>$this->id,
            'title'=>$this->title,
            'slug'=>$this->slug,
            'description'=>$this->description,
            'user'=>[
                'id'=>$this->user_id,
                'address'=>$this->user->address,
                'username'=>$this->user->profile->username
            ],
            'collection'=>[
                'id'=>$this->collection_id,
                'title'=>$this->collection->title
            ],
            'attributes'=>$this->nftAttributes,
            'keywords'=>$this->nftKeywords
        ];
    }
}
