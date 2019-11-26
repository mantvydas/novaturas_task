<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Airport extends Model
{
  /**
   * The attributes that are mass assignable.
   *
   * @var array
   */
  protected $fillable = [
      'name', 'latitude', 'longitude', 'country_id'
  ];

  /**
  * Get the country of the airport.
  */
  public function country()
  {
    return $this->belongsTo('App\Country', 'country_id');
  }

  /**
  * Get airlines for the airport.
  */
  public function airlines()
  {
    return $this->hasMany('App\AirportAirline', 'airport_id');
  }

  public static function boot() {
    parent::boot();

    /*
     * Delete all related data before delete
     */
    self::deleting(function($airport) {
         $airport->airlines()->each(function($airportAirline) {
            $airportAirline->delete();
         });
    });
  }
}
