<?php

namespace App\Http\Controllers\V1;

use App\Auxiliary\Uploader\Upload;
use App\Http\Controllers\Controller;
use App\Http\Requests\V1\NftRequest;
use App\Http\Resources\V1\NftResource;
use App\Models\Nft;
use App\Models\NftAttribute;
use App\Models\NftKeyword;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

use function App\Auxiliary\slug;

class NftController extends Controller
{
    private $uploaderPath = 'uploader/nfts';
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $nfts = Nft::with('collection','user','nftAttributes','keywords')->latest()->paginate();
        return response(['status'=>'success', 'data'=>NftResource::collection($nfts)]);
    }


    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(NftRequest $request)
    {
        $this->authorize('create', Nft::class);

        DB::beginTransaction();
        try{
            $image = Upload::upload($request, 'image', $this->uploaderPath);
            $path = Upload::upload($request, 'file', $this->uploaderPath);

            $nft = Nft::create([
                'user_id'=>auth()->Id(),
                'collection_id'=>$request->collection_id,
                'title'=>$request->title,
                'slug'=>slug($request->title),
                'type'=>$request->type,
                'image'=>$image,
                'audio'=>$request->type == 'audio' ? $path : null,
                'video'=>$request->type == 'video' ? $path : null,
                'description'=>$request->description,
            ]);

            list($attributes, $keywords)=$this->attributesAndKeywords($request, $nft->id);
            NftAttribute::insert($attributes);
            NftKeyword::insert($keywords);
            DB::commit();
            return response(['status'=>'success', 'data'=>$nft->id], 201);
        }catch(Exception $e){
            DB::rollBack();
            return response(['status'=>'error','msg'=>$e], 500);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Nft  $nft
     * @return \Illuminate\Http\Response
     */
    public function show(Nft $nft)
    {
        return response(['status'=>'success', 'data'=>new NftResource($nft)]);
    }


    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Nft  $nft
     * @return \Illuminate\Http\Response
     */
    public function update(NftRequest $request, Nft $nft)
    {
        $this->authorize('update', $nft);

        DB::beginTransaction();
        try{
            $image = Upload::upload($request, 'image', $this->uploaderPath, $nft->image);
            $audio = Upload::upload($request, 'audio', $this->uploaderPath, $nft->audio);
            $video = Upload::upload($request, 'video', $this->uploaderPath, $nft->video);

            $nft->collection_id = $request->collection_id;
            $nft->title = $request->title;
            $nft->slug = slug($request->title);
            $nft->type = $nft->type;
            $nft->image = $image;
            $nft->audio = $audio;
            $nft->video = $video;
            $nft->description = $request->description;
            $nft->save();

            $nft->nftAttributes()->delete();
            $nft->nftKeywords()->delete();
            list($attributes, $keywords)=$this->attributesAndKeywords($request, $nft->id);
            NftAttribute::insert($attributes);
            NftKeyword::insert($keywords);
            DB::commit();
            return response(['status'=>'success'], 201);
        }catch(Exception $e){
            DB::rollBack();
            return response(['status'=>'error','msg'=>$e], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Nft  $nft
     * @return \Illuminate\Http\Response
     */
    public function destroy(Nft $nft)
    {
        $this->authorize('delete', $nft);
        return $nft->delete() ? response(['status'=>'success']) : response(['status'=>'error']);
    }

    /**
     * Make array for attribute and keywords for insert to database
     *
     * @param NftRequest $request
     * @param int $nft_id
     * @return array
    */
    private function attributesAndKeywords(NftRequest $request, int $nft_id): array{
        $attributes = [];
        foreach($request->attributeKeys as $key=>$attributeKey){
            $attributes[]=[
                'nft_id'=>$nft_id,
                'key'=>$attributeKey,
                'value'=>$request->attributeValues[$key],
                'created_at'=>now(),
                'updated_at'=>now()
            ];
        }
        $keywords = [];
        foreach($request->keywords as $keyword){
            $keywords[]=[
                'nft_id'=>$nft_id,
                'keyword'=>$keyword,
                'created_at'=>now(),
                'updated_at'=>now()
            ];
        }
        return [$attributes, $keywords];
    }
}
