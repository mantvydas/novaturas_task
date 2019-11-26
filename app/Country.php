<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Country extends Model
{
  /**
   * The attributes that aren't mass assignable.
   *
   * @var array
   */
  protected $guarded = [];

  /**
  * Get airports for the country.
  */
  public function airports()
  {
    return $this->hasMany('App\Airport', 'id');
  }

  /**
  * Get airlines for the country.
  */
  public function airlines()
  {
    return $this->hasMany('App\Airline', 'id');
  }
}
