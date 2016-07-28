angular.module('myApp.directives', [])
  .directive('bio',function(){
      return {
        restrict: 'A',
        template: '<h1>Hola directiva attribute</h1>'
      }
  })
  .directive('bioelem',function(){
      return {
        restrict: 'E',
        template: '<h1>Hola directiva element</h1>'
      }
  })
  .directive('clock',function(){
      return {
        restrict: 'A',
        templateUrl: '../angular_sample/clock.html'
      }
  })
