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

  $http.get(url).then(function (res) {
    console.log(res);
    // debugger;
    var city = res.data.location.city;
    var state = res.data.location.state;
    var url = "http://api.wunderground.com/api/00ec06788f773d96/forecast10day/q/" + state + "/" + city + ".json";
    
    $http.get(url).then(function (forecast) {
      console.log("forecast", forecast);
      weather.tenDay = forecast.data.forecast.simpleforecast.forecastday;
      
      console.log("weather.tenDay", weather.tenDay)
    navigator.geolocation.getCurrentPosition(function (geopos){
      var lat = geopos.coords.latitude;
      var long = geopos.coords.longitude;
      var apikey = "47c1ab45a4a2f5d791799d2b9938fc8b";
      });




      // weather.CurrentWeather = {
      //     forecast: {
      //         icon: res.data.currently.icon,
      //         iconSize: 100,
      //         color: "blue"
      //     }
      // };
  });
});

weather.temp = '--';

weather.search = function () {
  $http.get(url + weather.searchQuery + '.json') 
  .then();


  console.log(weather.searchQuery)
  console.log('Search!');
}

});



















