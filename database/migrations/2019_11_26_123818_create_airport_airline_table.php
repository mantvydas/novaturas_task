<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAirportAirlineTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('airport_airline', function (Blueprint $table) {
            $table->unsignedBigInteger('airport_id');
            $table->unsignedBigInteger('airline_id');

            $table->foreign('airport_id')->references('id')->on('airports')->onDelete('cascade');
            $table->foreign('airline_id')->references('id')->on('airlines')->onDelete('cascade');

            // only one record for same airport and airline
            $table->unique(['airport_id', 'airline_id']);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('airport_airline', function (Blueprint $table) {
          $table->dropUnique('airport_airline_airport_id_airline_id_unique');
          $table->dropForeign('airport_airline_airport_id_foreign');
          $table->dropForeign('airport_airline_airline_id_foreign');
        });

        Schema::dropIfExists('airport_airline');
    }
}
