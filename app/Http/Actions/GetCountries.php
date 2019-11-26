<?php
namespace App\Http\Actions;

use App\Country;

class GetCountries
{
  public function execute()
  {
    return Country::get();
  }
}


?>
