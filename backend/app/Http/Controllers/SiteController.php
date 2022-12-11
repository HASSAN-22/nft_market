<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use PhpParser\ErrorHandler\Collecting;

class SiteController extends Controller
{
	// Get all your collections
    public function getCollections(){
        $collections = auth()->user()->collections;
        return response(['status'=>'success','data'=>$collections]);
    }
}
