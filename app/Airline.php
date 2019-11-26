<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Airline extends Model
{
  /**
   * The attributes that are mass assignable.
   *
   * @var array
   */
  protected $fillable = [
      'name', 'country_id'
  ];

  /**
  * Get the country of the airline.
  */
  public function country()
  {
    return $this->belongsTo('App\Country', 'country_id');
  }

  /**
  * Get airports for the airline.
  */
  public function airports()
  {
    return $this->hasMany('App\AirportAirline', 'airline_id');
  }

  public static function boot() {
    parent::boot();

    /*
     * Delete all related data before delete
     */
    self::deleting(function($airline) {
         $airline->airports()->each(function($airportAirline) {
            $airportAirline->delete();
         });
    });
  }
}
