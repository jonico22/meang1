angular.module('pokeApp.userService', [])
    .service('User', function($http, $q) {
      var _users = undefined;
      var _user = undefined;
      this.all = function() {
          if (!_users) {
              var deferred = $q.defer();
              $http.get("/api/users/")
                  .success(function(response) {
                      deferred.resolve(response);
                  })
                  .error(function(response) {
                      deferred.reject(response);
                  });
              _users = deferred.promise
          }
          return _users;
      }
      this.get = function(id){

      }
      this.create = function(id){

      }
      this.update = function(id){

      }
      this.delete = function(id){

      }
    })
