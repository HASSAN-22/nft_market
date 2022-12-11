<?php

namespace App\Auxiliary\Uploader;

use function App\Auxiliary\removeFile;

class Upload{

    private function __construct(){}

    /**
     * Add timestamp to prev file name
     *
     * @param $file
     * @return string
    */
    private static function getName($file): string{
        $Microtime = explode(' ',microtime())[0];
        $Microtime = last(explode('.', $Microtime));
        return $Microtime.'-'.$file->getClientOriginalName();
    }


    /**
     * Move file to storage
     *
     * @param $file
     * @param string $directory
     * @return string
    */

    private static function move($file, string $directory): string{
        $path = $file->store($directory);
        return str_replace('uploader/','',$path);
    }

    /**
     * Upload file if file dose not exist
     *
     * @param $request
     * @param string $key
     * @param string $directory
     * @param string|null $lastPath
     * @return string
    */
    public static function upload($request, string $key, string $directory, string $lastPath=null): string|null{
        if( $request->hasFile($key) ){
            removeFile($lastPath);
            return static::move($request->file($key), $directory);
        }
        return $lastPath;
    }
}