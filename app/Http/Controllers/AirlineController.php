<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests;
use App\Http\Resources\Airline as AirlineResource;

use App\Http\Actions\GetAirlines;
use App\Http\Actions\GetAirline;
use App\Http\Actions\StoreAirline;
use App\Http\Actions\DeleteAirline;

class AirlineController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @param  GetAirlines $getAirlines - single action
     * @return \Illuminate\Http\Response
     */
    public function index(GetAirlines $getAirlines)
    {
      // Get airports
      $airports = $getAirlines->execute();

      // Return collection of airports as a resource
      return AirlineResource::collection($airports);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  StoreAirline $storeAirline - single action
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request, StoreAirline $storeAirline)
    {
      $data = $request->all();
      $data['id'] = $request->isMethod('put') ? $request->id : NULL;
      $airport = $storeAirline->execute($data);

      return new AirlineResource($airport);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @param  GetAirline $getAirline - single action
     * @return \Illuminate\Http\Response
     */
    public function show($id, GetAirline $getAirline)
    {
      $airport = $getAirline->execute($id);

      return new AirlineResource($airport);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @param  DeleteAirline $deleteAirline - single action
     * @return \Illuminate\Http\Response
     */
   public function destroy(int $id, DeleteAirline $deleteAirline)
   {
     if($deleteAirline->execute($id)){
       return response(null, 204);
     }
   }
}
