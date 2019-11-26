<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class AirportAirline extends Model
{
  protected $table = 'airport_airline';

  /**
   * The attributes that should be hidden for arrays.
   *
   * @var array
   */
  protected $hidden = [
      'airport_id', 'airline_id',
  ];

  /**
  * Get the airport.
  */
  public function airport()
  {
    return $this->belongsTo('App\Airport', 'airport_id');
  }

  /**
  * Get the airline.
  */
  public function airline()
  {
    return $this->belongsTo('App\Airline', 'airline_id');
  }
}
