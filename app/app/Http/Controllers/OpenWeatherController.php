<?php

namespace App\Http\Controllers;

use Log;
use GuzzleHttp\Client;

class OpenWeatherController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        Log::info('OpenWeatherController.construct()');
    }

    /**
     * Get the current condition by coords
     *
     * @param string $lat
     * @param string $lon
     * @return string
     */
    public function getConditionByCoords(string $lat, string $lon) : string
    {
      // Sanitize inputs
      $lat = filter_var($lat, FILTER_SANITIZE_NUMBER_FLOAT, FILTER_FLAG_ALLOW_FRACTION);
      $lon = filter_var($lon, FILTER_SANITIZE_NUMBER_FLOAT, FILTER_FLAG_ALLOW_FRACTION);

      Log::debug(sprintf('lat: %s | lon: %s', $lat, $lon));

      // http://docs.guzzlephp.org/en/stable/quickstart.html ===>>>  Use the Authorization header instead.
      // Create a client with a base URI
      $client = new Client([
        'base_uri' => env('OPEN_WEATHER_URL')
      ]);
      $params = [
         'query' => [
            'lat' => $lat,
            'lon' => $lon,
            'appid' => env('OPEN_WEATHER_APP_ID'),
         ]
      ];

      $response = $client->request('GET', 'data/2.5/weather', $params);

      // Return JSON response
      return $response->getBody()->getContents();
    }

    /**
     * Get the forecast by coords
     *
     * @param string $lat
     * @param string $lon
     * @return string
     */
    public function getForecastByCoords(string $lat, string $lon) : string
    {
      // Sanitize inputs
      $lat = filter_var($lat, FILTER_SANITIZE_NUMBER_FLOAT, FILTER_FLAG_ALLOW_FRACTION);
      $lon = filter_var($lon, FILTER_SANITIZE_NUMBER_FLOAT, FILTER_FLAG_ALLOW_FRACTION);

      Log::debug(sprintf('lat: %s | lon: %s', $lat, $lon));

      // Create a client with a base URI
      $client = new Client([
        'base_uri' => env('OPEN_WEATHER_URL')
      ]);
      $params = [
         'query' => [
            'lat' => $lat,
            'lon' => $lon,
            'appid' => env('OPEN_WEATHER_APP_ID'),
         ]
      ];

      $response = $client->request('GET', 'data/2.5/forecast', $params);

      // Return JSON response
      return $response->getBody()->getContents();
    }

    //
}
