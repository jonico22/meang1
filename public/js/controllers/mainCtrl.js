angular.module('pokeApp.mainCtrl', [])
    .controller('mainCtrl', function($location,authService,$rootScope) {
        var vm = this;
        vm.loggeIn = authService.isLoggedIn();
        $rootScope.$on('$routeChangeStart',function(){
          vm.loggeIn = authService.isLoggedIn();
        })
        vm.clickLogin = function(data){
          authService.login(data.username,data.password);
        }
        vm.clickLogout = function(){
          authService.logout();
        }
        vm.goTo = function(route) {
            $location.path(route)
        }
    })
