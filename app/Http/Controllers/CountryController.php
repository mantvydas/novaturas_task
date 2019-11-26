<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;

use Illuminate\Http\Request;
use App\Http\Requests;
use App\Http\Resources\Country as CountryResource;

use App\Country;
use App\Http\Actions\GetCountries;

class CountryController extends Controller
{
  /**
   * Display a listing of the resource.
   *
   * @param  GetCountries $getCountries - single action
   * @return \Illuminate\Http\Response
   */
  public function __invoke(GetCountries $getCountries)
  {
    // Get countries
    $countries = $getCountries->execute();

    // Return collection of countries as a resource
    return CountryResource::collection($countries);
  }
}
