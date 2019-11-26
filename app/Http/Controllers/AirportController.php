<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests;
use App\Http\Resources\Airport as AirportResource;

use App\Http\Actions\GetAirports;
use App\Http\Actions\GetAirport;
use App\Http\Actions\StoreAirport;
use App\Http\Actions\DeleteAirport;

class AirportController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @param  GetAirports $getAirports - single action
     * @return \Illuminate\Http\Response
     */
    public function index(GetAirports $getAirports)
    {
      // Get airports
      $airports = $getAirports->execute();

      // Return collection of airports as a resource
      return AirportResource::collection($airports);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  StoreAirport $storeAirport - single action
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request, StoreAirport $storeAirport)
    {
      $data = $request->all();
      $data['id'] = $request->isMethod('put') ? $request->id : NULL;
      $airport = $storeAirport->execute($data);

      return new AirportResource($airport);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @param  GetAirport $getAirport - single action
     * @return \Illuminate\Http\Response
     */
    public function show($id, GetAirport $getAirport)
    {
      $airport = $getAirport->execute($id);

      return new AirportResource($airport);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @param  DeleteAirport $deleteAirport - single action
     * @return \Illuminate\Http\Response
     */
   public function destroy(int $id, DeleteAirport $deleteAirport)
   {
     if($deleteAirport->execute($id)){
       return response(null, 204);
     }
   }
}
