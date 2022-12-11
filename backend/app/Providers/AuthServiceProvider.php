<?php

namespace App\Providers;

// use Illuminate\Support\Facades\Gate;

use App\Models\Collection;
use App\Models\Nft;
use App\Models\Profile;
use App\Policies\CollectionPolicy;
use App\Policies\NftPolicy;
use App\Policies\ProfilePolicy;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * The model to policy mappings for the application.
     *
     * @var array<class-string, class-string>
     */
    protected $policies = [
        Collection::class => CollectionPolicy::class,
        Nft::class => NftPolicy::class,
        Profile::class => ProfilePolicy::class,
    ];

    /**
     * Register any authentication / authorization services.
     *
     * @return void
     */
    public function boot()
    {
        $this->registerPolicies();

        //
    }
}
