angular.module('pokeApp.pokemonCtrl', [])
    .controller('pokemonCtrl', function($http, pokemonServices) {
        var vm = this;
        vm.message = "Este es el admin de pokemon";
        pokemonServices.getPokemons().then(function(response) {
            vm.pokemons = response;
        })
    })
