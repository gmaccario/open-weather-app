<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It is a breeze. Simply tell Lumen the URIs it should respond to
| and give it the Closure to call when that URI is requested.
|
*/

/**
 * Display a specific quote
 */
$router->get('/', function() use ($router) {
    return view('weather', [
      'app_version' => $router->app->version(),
      'app_id_exists' => ((!empty(env('OPEN_WEATHER_APP_ID')) && env('OPEN_WEATHER_APP_ID') != '<YOUR-APP-ID>') ? true : false),
    ]);
});

$router->get('/get-condition/lat/{lat}/lon/{lon}', [
  'uses' => 'OpenWeatherController@getConditionByCoords',
  'as' => 'conditionByCoords'
]);

$router->get('/get-forecast/lat/{lat}/lon/{lon}', [
  'uses' => 'OpenWeatherController@getForecastByCoords',
  'as' => 'forecastByCoords'
]);
