<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class SingleAirport extends JsonResource
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
          'id' => $this->airport->id,
          'name' => $this->airport->name,
          'latitude' => $this->airport->latitude,
          'longitude' => $this->airport->longitude,
          'country' => $this->airport->country,
      ];
    }
}
