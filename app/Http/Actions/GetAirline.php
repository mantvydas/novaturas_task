<?php
namespace App\Http\Actions;

use App\Airline;

class GetAirline
{
  public function execute(int $id) : Airline
  {
    return Airline::findOrFail($id);
  }
}


?>
