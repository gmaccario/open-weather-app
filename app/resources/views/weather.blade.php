<html>
<head>
    <title>Weather app and widget</title>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">
    <link href="{{ url('css/style.css') }}" rel="stylesheet">
</head>
<body>
  <div class="container-fluid">
    <header class="header">
      <h1>Open Weather Widget</h1>
      <h2>{{ $app_version }}</h2>
      <h3>Vue.js v2.6.11</h3>
    </header>

    <section>
      <div id="weather-wrapper">
        <div class="container">
          <div class="row">
            <div class="col-md-4 col-md-offset-4">
              <div class="weather">
                <w-condition :coords="coords" :geolocation_enabled="geolocation_enabled"></w-condition>
                <w-forecast :coords="coords" :geolocation_enabled="geolocation_enabled"></w-forecast>
              </div>
            </div>
          </div>
      </div>
    </section>
  </div>

  <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
  <script src="{{ url('js/vue-weather.js')}}"></script>
</body>
</html>
