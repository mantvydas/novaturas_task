<?php
namespace App\Http\Actions;

class DeleteAirline
{
  protected $getAirline;

  public function __construct(GetAirline $getAirline)
  {
    $this->getAirline = $getAirline;
  }

  public function execute(int $id) : bool
  {
    // get airport
    $airport = $this->getAirline->execute($id);

    return $airport->delete();
  }
}


?>
