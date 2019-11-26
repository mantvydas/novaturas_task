<?php
namespace App\Http\Actions;

use App\Airport;

class GetAirport
{
  public function execute(int $id) : Airport
  {
    return Airport::findOrFail($id);
  }
}


?>
