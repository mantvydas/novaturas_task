<?php
namespace App\Http\Actions;

use Validator;
use App\Airline;

class StoreAirline
{
  protected $getAirline;
  protected $storeAirportAirline;

  public function __construct(GetAirline $getAirline, StoreAirportAirline $storeAirportAirline)
  {
    $this->getAirline = $getAirline;
    $this->storeAirportAirline = $storeAirportAirline;
  }

  public function execute(array $data) : Airline
  {
    // validate data
    $this->validate($data);

    // get existing or create new airport
    $airline = isset($data['id']) > 0 ? $this->getAirline->execute($data['id']) : new Airline;

    if(isset($data['name']))
      $airline->name = $data['name'];

    if(isset($data['country_id']))
      $airline->country_id = $data['country_id'];

    $airline->save();

    if(isset($data['airport_ids'])){
      $airline->airports()->delete();

      if(count($data['airport_ids']) > 0)
        $this->storeAirportAirline->execute(["airport_ids" => $data['airport_ids'], "airline_id" => $airline['id']]);

      $airline = $this->getAirline->execute($airline['id']);
    }

    return $airline;
  }

  private function validate(array $data)
  {
    if(isset($data['id']))
    {
      Validator::make($data, [
        'name' => 'string|min:3|max:255',
        'country_id' => 'integer|exists:countries,id',
        'airport_ids' => 'array',
      ])->validate();
    }
    else
    {
      Validator::make($data, [
        'name' => 'required|string|min:3|max:255',
        'country_id' => 'required|integer|exists:countries,id',
        'airport_ids' => 'array',
      ])->validate();
    }
  }
}


?>
