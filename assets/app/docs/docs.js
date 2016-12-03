/**
 * Copyright @ 2016 by Samuel T. C. Santos, All rights reserved.
 */

app.controller("Docs", ['$scope','$routeParams', function($scope, $routeParams) {

  var page = $routeParams.page;

  var apiContainer = $('#api-content');

  if (page){
    apiContainer.load('/app/docs/' + page);
  }
  else{
    apiContainer.load("Sorry, 404 Page not Found!");
  }

  console.log('page', page);

}]);

