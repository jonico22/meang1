angular.module('myApp.services', [])
  .service('cityService',function(){
    this.getCity = function(abr){
      //buscar la ciudad
      return "San Francisco";
    }
  })
  .service('getCity',function(){
    var city = [
      {
        city : 'ALMEIRA',
        abrev : 'LEI'
      },
      {
        city : 'AREQUIPA',
        abrev : 'AQP'
      },
      {
        city : 'ATENAS',
        abrev : 'ARH'
      },
      {
        city : 'ATLANTA',
        abrev : 'ATL'
      },
      {
        city : 'BARCELONA',
        abrev : 'BCN'
      },
      {
        city : 'BEIJING',
        abrev : 'BJS'
      },
      {
        city : 'BRASILIA',
        abrev : 'BSB'
      },
      {
        city : 'BREMEN',
        abrev : 'BRE'
      },
      {
        city : 'BRUSELAS',
        abrev : 'BRU'
      },
      {
        city : 'BUENOS AIRES',
        abrev : 'BUE'
      }
    ];
    return city;
  })
