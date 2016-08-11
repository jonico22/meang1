angular.module('pokeApp.userCtrl', [])
    .controller('userCtrl', function(User,LxDialogService) {
        var vm = this;
        vm.message = "Este es el admin de usuario";
        User.all().then(function(response) {
            vm.users = response;
        });
        vm.openDialog = function()
        {
            LxDialogService.open('modal');
        }
        vm.submitForm = function(form){
          User.create(form).then(function(response) {
              if(response.success){
                LxDialogService.close('modal');
              }
          })
        }
        vm.deleteUser = function(id){
          User.delete(id).then(function(response) {
              if(response.success){
                console.log('se ha eliminado');
              }
          })
        }
    })
