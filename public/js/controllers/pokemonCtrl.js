angular.module('pokeApp.pokemonCtrl', [])
    .controller('pokemonCtrl', function($http, pokemonServices,LxDialogService) {
        var vm = this;
        vm.message = "Este es el admin de pokemon";
        pokemonServices.all().then(function(response) {
            vm.pokemons = response;
        });
        vm.openDialog = function()
        {
            LxDialogService.open('modal');
        }
        vm.getpokemons = function(id){
          pokemonServices.get(id).then(function(response) {
              console.log(response);
          });
        }
        vm.submitForm = function(form){
          pokemonServices.create(form).then(function(response) {
              if(response.success){
                LxDialogService.close('modal');
              }
          })
        }
        vm.deletePokemon = function(id){
          pokemonServices.delete(id).then(function(response) {
              if(response.success){
                console.log('se ha eliminado');
              }
          })
        }
    })
