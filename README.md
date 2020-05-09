# Open Weather App (dockerized)

## Lumen (7.1.1) (Laravel Components ^7.0)
### Vue.js v2.6.11

### Description
Open Weather App consumes Open Weather Map APIs in order to show the current weather condition and the forecast (today and tomorrow) based on the device geolocation. You must enable your device geolocation to allow the script make a request for the right position.

### Installation
```
git clone https://github.com/gmaccario/open_weather_app.git open-weather-app
cd open-weather-app
docker-compose up -d
```

### Get your app id
Open https://openweathermap.org/appid and get you APPID. Then:
```
cd app
cp .env.example .env
```
Edit .env and add you openweathermap APPID.

Open http://localhost on your browser.

### Todo
* Add fontawesome

### Notes
api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={your api key}
api.openweathermap.org/data/2.5/forecast?lat=52.3728583&lon=4.938827799999999&appid=<app-id>
https:openweathermap.org/price
https:maps.owm.io/map/wind_new/13/52.3728583/4.938827799999999&.png?appid=<app-id>

https://www.php.net/manual/en/features.http-auth.php
https://stackoverflow.com/questions/3323245/is-basic-access-authentication-secure
