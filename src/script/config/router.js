'use strict';

angular.module('app',['ui.router']).config(['$stateProvider','$urlRouterProvider',function($stateProvider,$urlRouterProvider){
  $stateProvider.state('main',{
    url:'/main',
    templateUrl:'view/main.html',
    controller:'mainCtrl'
  });
  $urlRouterProvider.otherwise('main');


}])
