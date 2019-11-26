<?php
namespace App\Http\Actions;

use App\Airport;

class GetAirports
{
  public function execute()
  {
    return Airport::get();
  }
}


?>
