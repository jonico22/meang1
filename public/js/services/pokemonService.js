angular.module('pokeApp.pokemonService', [])
    .service('pokemonServices', function($http,$q) {
        var _pokemons = undefined;
        var _pokemon = undefined;
        this.all = function() {
            if (!_pokemons) {
                var deferred = $q.defer();
                $http.get("/api/pokemons/")
                    .success(function(response) {
                        deferred.resolve(response);
                    })
                    .error(function(response) {
                        deferred.reject(response);
                    });
                _pokemons = deferred.promise
            }
            return _pokemons;
        }
        this.get = function(id) {
            return _user;
        }
        this.create = function(data) {
            var deferred = $q.defer();
            var res;
            $http.post("/api/pokemons/", data)
                .success(function(response) {
                    deferred.resolve(response);
                })
                .error(function(response) {
                    deferred.reject(response);
                });
            res = deferred.promise;
            return res;
        }
        this.update = function(id,data) {
          var deferred = $q.defer();
          var res;
          $http.post("/api/pokemons/" + id, data)
              .success(function(response) {
                  deferred.resolve(response);
              })
              .error(function(response) {
                  deferred.reject(response);
              });
          res = deferred.promise;
          return res;
        }
        this.delete = function(id) {
          var deferred = $q.defer();
          var res;
          $http.delete("/api/pokemons/" + id)
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
