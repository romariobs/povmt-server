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
    .when('/users',
    {
      controller : 'User',
      templateUrl: 'app/users/user.html'
    })
    .when('/activities',
    {
      controller : 'Activity',
      templateUrl: 'app/activities/activity.html'
    })
    .when('/its',
    {
      controller : 'It',
      templateUrl: 'app/its/it.html'
    })
    .when('/history',
    {
      controller : 'History',
      templateUrl: 'app/history/history.html'
    })
    .otherwise({
      redirectTo: '/'
    });
});
