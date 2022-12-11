<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('nft_keywords', function (Blueprint $table) {
            $table->id();
            $table->foreignId('nft_id');
            $table->string('keyword');
            $table->timestamps();
            $table->foreign('nft_id')->references('id')->on('nfts')->onDelete('cascade')->onUpdate('cascade');

        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('nft_keywords');
    }
};
