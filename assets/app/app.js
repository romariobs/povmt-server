/**
 * Application for Manager the Clients data
 *
 * Created by Samuel T. C. Santos on 27/08/2015.
 *
 */

var app = angular.module('PovMTWebAdmin', ['ngRoute'])


app.config(function($routeProvider){

  $routeProvider.when('/',
    {
      controller : 'Auth',
      templateUrl: 'app/auth/auth.html'
    })
    .otherwise({
      redirectTo: '/'
    });
});
