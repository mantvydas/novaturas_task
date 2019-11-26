<?php
namespace App\Http\Actions;

use Validator;
use Illuminate\Validation\Rule;
use App\AirportAirline;

class StoreAirportAirline
{
  public function execute(array $data)
  {
    // validate data
    $this->validate($data);

    if(isset($data['airline_id']) && isset($data['airport_id'])){
      // create new object
      $airportAirline = new AirportAirline;

      $airportAirline->airport_id = $data['airport_id'];
      $airportAirline->airline_id = $data['airline_id'];

      $airportAirline->save();
    }
    else if(isset($data['airline_ids']) && isset($data['airport_id'])){
      $airportAirlines = [];
      foreach ($data['airline_ids'] as $value) {
        array_push($airportAirlines, [ "airline_id" => $value, "airport_id" => $data['airport_id'] ]);
      }
      AirportAirline::insert($airportAirlines);
    }
    else if(isset($data['airport_ids']) && isset($data['airline_id'])){
      $airportAirlines = [];
      foreach ($data['airport_ids'] as $value) {
        array_push($airportAirlines, [ "airport_id" => $value, "airline_id" => $data['airline_id'] ]);
      }
      AirportAirline::insert($airportAirlines);
    }
  }

  private function validate(array $data)
  {
    Validator::make($data, [
      'airport_id' => 'required_without:airport_ids|integer|exists:airports,id',
      'airline_id' => 'required_without:airline_ids|integer|exists:airlines,id',
      'airline_ids' => 'required_without:airline_id|array|min:1',
      'airline_ids.*' => 'integer|exists:airlines,id',
      'airport_ids' => 'required_without:airport_id|array|min:1',
      'airport_ids.*' => 'integer|exists:airports,id',
    ])->validate();
  }
}


?>
