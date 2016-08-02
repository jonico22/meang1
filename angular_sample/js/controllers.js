angular.module('myApp.controllers', [])

    .controller('mainCtrl', function($scope, $filter, cityService,getCity) {
        $scope.message = 'La aplicacion ha sido creada';
        $scope.name = "Jose Luis";
        $scope.toLowerCase = $filter('lowercase')($scope.name);
        $scope.citys = getCity;

        $scope.isCapatilized = function(str){
          return str[0] == str[0].toUpperCase();
        }

        $scope.getNameCity = function(city){
          $scope.result = city.city;
        }

    })
    .controller('clockCtrl', function($scope) {
        $scope.clock = {
            now: new Date()
        }
        var updateClock = function() {
            $scope.clock.now = new Date();
        }
        $scope.changeClock = function() {
            updateClock();
        }
        setInterval(function() {
            $scope.$apply(updateClock);
        }, 1000);
    })
    .controller('citiesCtrl', function($scope, cityService) {
      $scope.cities = cityService.getCities();
      $scope.myLink = "http://google.com";
      $scope.fields =[
        { placeholder: 'abbr' , isRequired : true },
        { placeholder: 'name' , isRequired : true }
      ]
      $scope.searchCity = function(cityAbbr){
        $scope.city = cityService.getCity(cityAbbr)[0];
      }
      $scope.calculate = function(){
        $scope.result = Number($scope.myNumber) * 5 ;
      }
      $scope.generateNumber = function(){
        return Math.floor((Math.random() * 10) + 1 );
      }
    })
