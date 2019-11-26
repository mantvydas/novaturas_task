<?php
namespace App\Http\Actions;

use Validator;
use App\Airport;

class StoreAirport
{
  protected $getAirport;
  protected $storeAirportAirline;

  public function __construct(GetAirport $getAirport, StoreAirportAirline $storeAirportAirline)
  {
    $this->getAirport = $getAirport;
    $this->storeAirportAirline = $storeAirportAirline;
  }

  public function execute(array $data) : Airport
  {
    // validate data
    $this->validate($data);

    // get existing or create new airport
    $airport = isset($data['id']) > 0 ? $this->getAirport->execute($data['id']) : new Airport;

    if(isset($data['name']))
      $airport->name = $data['name'];

    if(isset($data['latitude']))
      $airport->latitude = $data['latitude'];

    if(isset($data['longitude']))
      $airport->longitude = $data['longitude'];

    if(isset($data['country_id']))
      $airport->country_id = $data['country_id'];

    $airport->save();

    if(isset($data['airline_ids'])){
      $airport->airlines()->delete();

      if(count($data['airline_ids']) > 0)
        $this->storeAirportAirline->execute(["airline_ids" => $data['airline_ids'], "airport_id" => $airport['id']]);

      $airport = $this->getAirport->execute($airport['id']);
    }

    return $airport;
  }

  private function validate(array $data)
  {
    if(isset($data['id']))
    {
      Validator::make($data, [
        'name' => 'string|min:3|max:255',
        'latitude' => 'numeric',
        'longitude' => 'numeric',
        'country_id' => 'integer|exists:countries,id',
        'airline_ids' => 'array',
      ])->validate();
    }
    else
    {
      Validator::make($data, [
        'name' => 'required|string|min:3|max:255',
        'latitude' => 'required|numeric',
        'longitude' => 'required|numeric',
        'country_id' => 'required|integer|exists:countries,id',
        'airline_ids' => 'array',
      ])->validate();
    }
  }
}


?>
