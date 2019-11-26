<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use App\Http\Resources\SingleAirline as AirlineResource;

class Airport extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
      return [
          'id' => $this->id,
          'name' => $this->name,
          'latitude' => $this->latitude,
          'longitude' => $this->longitude,
          'country' => $this->country,
          'airlines' => AirlineResource::collection($this->airlines->load('airport')),
      ];
    }
}
