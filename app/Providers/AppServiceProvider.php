<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Schema;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
      // AIRPORT
      $this->app->singleton('getairports', function () {
          return new GetAirports;
      });
      $this->app->singleton('getairport', function () {
          return new GetAirport;
      });
      $this->app->singleton('storeairport', function () {
          return new StoreAirport;
      });
      $this->app->singleton('deleteairport', function () {
          return new DeleteAirport;
      });

      // AIRLINE
      $this->app->singleton('getairlines', function () {
          return new GetAirlines;
      });
      $this->app->singleton('getairline', function () {
          return new GetAirline;
      });
      $this->app->singleton('storeairline', function () {
          return new StoreAirline;
      });
      $this->app->singleton('deleteairline', function () {
          return new DeleteAirline;
      });

      // AIRPORT Airline
      $this->app->singleton('storeairportairline', function () {
          return new StoreAirportAirline;
      });
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        Schema::defaultStringLength(255);
    }
}
