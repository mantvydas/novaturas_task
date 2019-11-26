<?php
namespace App\Http\Actions;

class DeleteAirport
{
  protected $getAirport;

  public function __construct(GetAirport $getAirport)
  {
    $this->getAirport = $getAirport;
  }

  public function execute(int $id) : bool
  {
    // get airport
    $airport = $this->getAirport->execute($id);

    return $airport->delete();
  }
}


?>
