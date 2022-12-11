<?php


namespace App\Auxiliary;

use Illuminate\Support\Str;
use kornrunner\Keccak;
use Elliptic\EC;

if(!function_exists('verifySignature')){
    function verifySignature(string $signature, string $address): bool
    {
        $message = config('app.signature_message');
        $hash = Keccak::hash(sprintf("\x19Ethereum Signed Message:\n%s%s", strlen($message), $message), 256);
        $sign = [
            'r' => substr($signature, 2, 64),
            's' => substr($signature, 66, 64),
        ];
        $recid = ord(hex2bin(substr($signature, 130, 2))) - 27;

        if ($recid != ($recid & 1)) {
            return false;
        }

        $pubkey = (new EC('secp256k1'))->recoverPubKey($hash, $sign, $recid);
        $derived_address = '0x' . substr(Keccak::hash(substr(hex2bin($pubkey->encode('hex')), 1), 256), 24);
        return (Str::lower($address) === $derived_address);
    }
}

if(! function_exists('getDevice')){
    function getDevice(string $userAgent){
        return explode(') ',explode(' (',$userAgent)[1])[0];
    }
}

if(! function_exists('removeFile')){
    function removeFile($image){
        if(!empty($image)){
            if(file_exists(storage_path($image))){
                unlink(storage_path($image));
            }
        }
    }
}

if(! function_exists('removeFiles')){
    function removeFiles($images){
        foreach ($images as $image){
            if(!empty($image)){
                if(file_exists(storage_path($image))){
                    unlink(storage_path($image));
                }
            }
        }
    }
}

if(! function_exists('slug')){
    function slug(string $title){
        return Str::slug($title);
    }
}
