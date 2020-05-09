<?php

use Laravel\Lumen\Testing\DatabaseMigrations;
use Laravel\Lumen\Testing\DatabaseTransactions;

class WeatherTest extends TestCase
{
    /**
     * Test the Weather endpoints.
     *
     * @return void
     */
    public function testWeather()
    {  
      $this->get('/get-condition/lat/45.733333/lon/7.333333');

      $content = json_decode($this->response->getContent());

      $this->assertEquals(45.73, $content->coord->lat);
      $this->assertEquals(7.33, $content->coord->lon);
    }
}
