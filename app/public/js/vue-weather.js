const Forecast = Vue.component('w-forecast',{
	props: {
		coords: {
			type: Object,
			required: true
		},
		geolocation_enabled: {
			type: Boolean,
			required: true
		}
	},
	data(){
		return {
			items: [],
			language: window.navigator.userLanguage || window.navigator.language,
		}
	},
	watch: {
    geolocation_enabled: {
      // the callback will be called immediately after the start of the observation
      immediate: true,
      handler (val, oldVal) {
				if(val)
        {
          this.setForecast();
        }
      }
    }
  },
	methods: {
		/**
    	 * @name convertUnixTimestamp
    	 * @description
    	 */
		convertUnixTimestamp(unixTimestap) {
			return new Date(unixTimestap * 1000);
		},
		/**
    	 * @name getFriendlyDate
    	 * @description
    	 */
		getFriendlyDate(date) {
			let options = {
				month: 'short',
				day: 'numeric',
				hour: '2-digit',
				minute: '2-digit',
				hour12: false
			};

			return date.toLocaleTimeString([this.language], options);
		},
		/**
    	 * @name setForecast
    	 * @description
    	 */
		setForecast() {

      let params = {
        lat: this.coords.latitude,
        lon: this.coords.longitude,
      };

			fetch('/get-forecast/lat/' + params.lat + '/lon/' + params.lon)
			  .then(response => response.json())
			  .then(data => {
					// List of forecast
					let items = data.list;

					// Set a time limit
					let timeLimitStart = new Date();
					timeLimitStart.setDate(timeLimitStart.getDate());

					let timeLimitEnd = new Date();
					timeLimitEnd.setDate(timeLimitEnd.getDate() + 1 );

					// Get only the items until the time limit
					for(let i=0; i<=items.length - 1; i++)
					{
						let item = items[i];

						let dt = this.convertUnixTimestamp(item.dt);

						if(dt > timeLimitStart && dt < timeLimitEnd)
						{
							item.dt = this.getFriendlyDate(dt);

							this.items.push(item);
						}
					}
			});
    }
  },
	template:`
	<div class="container weather-forecast">
		<div class="row">
			<div class="col" v-for="item in items" :key="item.dt">
				<span>{{ item.dt }}</span>
				<span>{{ item.weather[0].main }}</span>
				<img :src="'http://openweathermap.org/img/wn/' + item.weather[0].icon + '.png'" :alt="item.weather[0].main"/>
			</div>
		</div>
	</div>`
});

const Condition = Vue.component('w-condition',{
  props: {
		coords: {
			type: Object,
			required: true
		},
		geolocation_enabled: {
			type: Boolean,
			required: true
		}
	},
  data(){
		return {
			condition: '',
      condition_icon: '',
      temperature: 0,
			city: '',
			currentDate: new Date(),
			language: window.navigator.userLanguage || window.navigator.language,
		}
	},
  watch: {
    geolocation_enabled: {
      // the callback will be called immediately after the start of the observation
      immediate: true,
      handler (val, oldVal) {
				if(val)
        {
          this.setCondition();
        }
      }
    }
  },
  created() {

  },
  methods: {
		/**
    	 * @name getFriendlyDate
    	 * @description
    	 */
		getFriendlyDate(date) {
				let options = {
					timeZoneName: 'short',
					weekday: 'long',
					year: 'numeric',
					month: 'long',
					day: 'numeric',
					hour12: false
				};

				return date.toLocaleDateString([this.language], options);
		},
		/**
    	 * @name setCondition
    	 * @description
    	 */
		setCondition() {

      let params = {
        lat: this.coords.latitude,
        lon: this.coords.longitude,
      };

			fetch('/get-condition/lat/' + params.lat + '/lon/' + params.lon)
			  .then(response => response.json())
			  .then(data => {
					this.condition = data.weather[0].main;
          this.condition_icon = data.weather[0].icon;
          this.temperature = (Math.round((parseFloat(data.main.temp) - 273.15) * 100) / 100).toLocaleString(this.language);
					this.city = data.name;
			});
    }
  },
	template:`
	<div class="container weather-condition" v-bind:class="[condition_icon]">
		<div class="row">
			<div class="col">
				<div class="city">
					<span>{{ city }}</span>
				</div>
				<div class="temperature">
					<span class="value">{{ temperature }}</span>
					<span class="symbol">&deg;</span>
					<span class="centigrade">C</span>
				</div>
				<div class="currentDate">
					<span>{{ getFriendlyDate(currentDate) }}</span>
				</div>
			</div>
			<div class="col">
				<div class="span4"></div>
				<div class="span4">
					<img class="center-block" :src="'http://openweathermap.org/img/wn/' + condition_icon + '@2x.png'" :alt="condition"/>
					<div class="condition">
						<span>{{ condition }}</span>
					</div>
				</div>
				<div class="span4"></div>
			</div>
		</div>
	</div>`
});

/**
* Main Vue
*/
const vm = new Vue({
    el: '#weather-wrapper',
    components: {
      'w-condition': Condition,
			'w-forecast': Forecast,
    },
    data: {
    	coords: {
    		latitude: 0,
    		longitude: 0,
    		accuracy: 0
    	},

    	geolocation_enabled: false
    },
    created(){
				this.getCurrentPosition();
	  },
    methods: {
    	/**
    	 * @name getCurrentPosition
    	 * @description Get the current position of the user and set up config variable if user geolocation is enabled.
    	 */
    	getCurrentPosition() {
				let options = {
						enableHighAccuracy: true,
						timeout: 5000,
						maximumAge: 0
					};
				return navigator.geolocation.getCurrentPosition(
					this.getCurrentPositionSuccess,
					this.getCurrentPositionError,
	        options
				);
			},
		/**
    	 * @name getCurrentPositionSuccess
    	 * @description In case of geolocalization enabled.
    	 */
		getCurrentPositionSuccess(pos) {
			var crd = pos.coords;

			this.coords.latitude = crd.latitude;
			this.coords.longitude = crd.longitude;
			this.coords.accuracy = crd.accuracy;

			this.geolocation_enabled = true;
		},
		/**
    	 * @name getCurrentPositionError
    	 * @description In case of geolocalization disabled.
    	 */
		getCurrentPositionError(err) {

			this.geolocation_enabled = false;

			console.log("Geolocalization disabled!");
		}
  }
});
