<?php

namespace App\Http\Controllers\V1;

use App\Auxiliary\Uploader\Upload;
use App\Http\Controllers\Controller;
use App\Http\Requests\V1\CollectionRequest;
use App\Http\Resources\V1\CollectionResource;
use App\Models\Collection;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\URL;

use function App\Auxiliary\removeFiles;
use function App\Auxiliary\slug;

class CollectionController extends Controller
{
    private $uploaderPath = 'uploader/collections';
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $collections = auth()->user()->collections()->latest()->paginate(14);
        return response(['status'=>'success', 'data'=>CollectionResource::collection($collections)]);
    }


    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(CollectionRequest $request)
    {
        $this->authorize('create', Collection::class);

        $logo = Upload::upload($request, 'logo', $this->uploaderPath);

        $bg_image = Upload::upload($request, 'bg_image', $this->uploaderPath);

        $collection = Collection::create([
            'user_id' => auth()->Id(),
            'title' => $request->title,
            'slug' => slug($request->title),
            'symbol' => $request->symbol,
            'description' => $request->description,
            'logo' => $logo,
            'bg_image' => $bg_image,
        ]);

        return $collection ? response(['status'=>'success'], 201) : response(['status'=>'error'], 500);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Collection  $collection
     * @return \Illuminate\Http\Response
     */
    public function show(Collection $collection)
    {
        $this->authorize('view', $collection);
        return response(['status'=>'success', 'data'=>new CollectionResource($collection)]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Collection  $collection
     * @return \Illuminate\Http\Response
     */
    public function update(CollectionRequest $request, Collection $collection)
    {
        $this->authorize('update', $collection);

        $logo = Upload::upload($request, 'logo', $this->uploaderPath, $collection->logo);

        $bg_image = Upload::upload($request, 'bg_image', $this->uploaderPath, $collection->bg_image);

        $collection->title = $request->title;
        $collection->slug = slug($request->title);
        $collection->symbol = $request->symbol;
        $collection->description = $request->description;
        $collection->logo = $logo;
        $collection->bg_image = $bg_image;

        return $collection->save() ? response(['status'=>'success'], 201) : response(['status'=>'error'], 500);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Collection  $collection
     * @return \Illuminate\Http\Response
     */
    public function destroy(Collection $collection)
    {
        $this->authorize('delete', $collection);
        if($collection->nfts->count() > 0){
            return response(['status'=>'success','data'=>'has_child']);
        }
        if($collection->delete()){
            removeFiles([$collection->logo, $collection->bg_image]);
            return response(['status'=>'success']);
        }
        return response(['status'=>'error'], 500);
    }
}
