// Ionic Starter App
  

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic', 'angular-skycons'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });

})

.controller('weatherCtrl', function($http){

  var weather = this;
  var url = "http://api.wunderground.com/api/00ec06788f773d96/conditions/forecast/geolookup/q/autoip.json";
  weather.tenDay;

  $http.get(url).then(function (geoLookupData) {
    console.log(geoLookupData);
    // debugger;
    var city = geoLookupData.data.location.city;
    var state = geoLookupData.data.location.state;
    getWeather(city,state);
    var apikey = "47c1ab45a4a2f5d791799d2b9938fc8b";
    });

  var getWeather = function (city,state) {
    // console.log(geoLookupData);
    // debugger;
    var url = "http://api.wunderground.com/api/00ec06788f773d96/conditions/forecast/geolookup/forecast10day/q/" + state + "/" + city + ".json";
    
    $http.get(url).then(function (forecast) {
      console.log("forecast", forecast);
      weather.tenDay = forecast.data.forecast.simpleforecast.forecastday;
      
      console.log("weather.tenDay", weather.tenDay)
    });
  }
  weather.temp = '--';


  weather.search = function () {
    $http.get("http://api.wunderground.com/api/00ec06788f773d96/conditions/forecast/geolookup/q/" + weather.searchQuery + '.json')
    .then(function (weather) {
      console.log("weather", weather)
    var state = weather.data.location.state;
    var city = weather.data.location.city;
    getWeather(city,state);
    return weather;
    })
    .then(function (weather){
      var key = weather.data.location.city + ", " + weather.data.location.state;
      var value = weather.data.current_observation.station_id;
      var history = JSON.parse(localStorage.getItem('searchHistory')) || {};
      if (history.hasOwnProperty(key) === false) {
        history[key] = value;
        localStorage.setItem('searchHistory', JSON.stringify(history));
      }

      // console.log("geoLookupData", geoLookupData);
      // localStorage.setItem ('searchHistory', 'array of searches');
      //   weather.data.current_observation.station_id;

    });

    


    

    console.log(weather.searchQuery)
    console.log('Search!');
  }
});
















