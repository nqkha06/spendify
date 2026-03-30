<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;

class AppRepositoryProvider extends ServiceProvider
{
    /**
     * Register services.
     */

    public $bindings = [
        'App\Repositories\Contracts\BaseRepositoryInterface' => 'App\Repositories\BaseRepository',

        'App\Repositories\Contracts\UserRepositoryInterface' => 'App\Repositories\UserRepository',

        'App\Repositories\Contracts\MerchantRepositoryInterface' => 'App\Repositories\MerchantRepository',

    ];

    public function register(): void
    {
        foreach($this->bindings as $key => $val)
        {
            $this->app->bind($key, $val);
        }
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        //
    }
}
