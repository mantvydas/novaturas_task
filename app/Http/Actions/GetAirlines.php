<?php
namespace App\Http\Actions;

use App\Airline;

class GetAirlines
{
  public function execute()
  {
    return Airline::get();
  }
}


?>
