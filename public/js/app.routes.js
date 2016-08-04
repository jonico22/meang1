angular.module('pokeApp.routes', ['ngRoute'])
.config(function($routeProvider,$locationProvider){
  $routeProvider
    .when('/',{
      templateUrl: 'views/pages/login.html',
      controller: 'loginCtrl',
      controllerAs: 'login'
    })
    .when('/login',{
      templateUrl: 'views/pages/login.html',
      controller: 'loginCtrl',
      controllerAs: 'login'
    })
    .when('/users',{
      templateUrl: 'views/pages/login.html',
      controller: 'userCtrl',
      controllerAs: 'login'
    })
    .when('/pokemons',{
      templateUrl: 'views/pages/login.html',
      controller: 'pokemonCtrl',
      controllerAs: 'login'
    })
    .otherwise({
      redirectTo:"/"
    })

    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    });
})
