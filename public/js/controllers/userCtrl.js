angular.module('pokeApp.userCtrl', [])
    .controller('userCtrl', function(User,LxDialogService) {
        var vm = this;
        vm.message = "Este es el admin de usuario";
        User.all().then(function(response) {
            vm.users = response;
        })
        vm.openDialog = function()
        {
            LxDialogService.open('modal');
        }
        vm.submitForm = function(form){
          User.create(form).then(function(response) {
              console.log(response);
          })
        }
    })
