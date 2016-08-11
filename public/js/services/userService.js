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
        this.get = function(id) {
            return _user;
        }
        this.create = function(data) {
            var deferred = $q.defer();
            var res;
            $http.post("/api/users/", data)
                .success(function(response) {
                    deferred.resolve(response);
                })
                .error(function(response) {
                    deferred.reject(response);
                });
            res = deferred.promise;
            return res;
        }
        this.update = function(id) {

        }
        this.delete = function(id) {
          var deferred = $q.defer();
          var res;
          $http.delete("/api/users/" + id)
              .success(function(response) {
                  deferred.resolve(response);
              })
              .error(function(response) {
                  deferred.reject(response);
              });
          res = deferred.promise;
          return res;
        }
    })
