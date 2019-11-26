<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/
/*
Route::group([
    'prefix' => 'auth'
], function () {
    Route::post('login', 'AuthController@login');
    Route::post('signup', 'AuthController@signup');

    Route::group([
      'middleware' => 'auth:api'
    ], function() {
        Route::get('logout', 'AuthController@logout');
        Route::get('user', 'AuthController@user');
    });
});

Route::middleware('auth:api')->group(function () {*/
    // Create new airport
    Route::post('airport', 'AirportController@store');

    // Update airport
    Route::put('airport/{id}', 'AirportController@store');

    // Delete airport
    Route::delete('airport/{id}', 'AirportController@destroy');

    // Create new airline
    Route::post('airline', 'AirlineController@store');

    // Update airline
    Route::put('airline/{id}', 'AirlineController@store');

    // Delete airline
    Route::delete('airline/{id}', 'AirlineController@destroy');
//});

// List countries
Route::get('countries', 'CountryController');

// List airports
Route::get('airports', 'AirportController@index');

// Get single airport
Route::get('airport/{id}', 'AirportController@show');

// List airlines
Route::get('airlines', 'AirlineController@index');

// Get single airline
Route::get('airline/{id}', 'AirlineController@show');
