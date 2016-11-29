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
    .when('/auth',
    {
      controller : 'Auth',
      templateUrl: 'app/auth/auth.html'
    })
    .when('/signup',
      {
        controller : 'SignUp',
        templateUrl: 'app/signup/signup.html'
      })
    .when('/users',
    {
      controller : 'User',
      templateUrl: 'app/users/user.html'
    })
    .when('/activities/:userId',
    {
      controller : 'Activity',
      templateUrl: 'app/activities/activity.html'
    })
    .when('/its/:activityId',
    {
      controller : 'It',
      templateUrl: 'app/its/it.html'
    })
    .when('/history',
    {
      controller : 'History',
      templateUrl: 'app/history/history.html'
    })
    .when('/dashboard',
    {
      controller : 'Dashboard',
      templateUrl: 'app/dashboard/dashboard.html'
    })
    .when('/docs',
    {
      controller : 'Docs',
      templateUrl: 'app/docs/index.html'
    })
    .when('/docs/:page',
    {
      controller : 'Docs',
      templateUrl: 'app/docs/index.html'
    })
    .otherwise({
      redirectTo: '/'
    });
});
