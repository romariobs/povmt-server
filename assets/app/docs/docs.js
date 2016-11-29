/**
 * Created by Samuel T. C. Santos on 27/11/2016.
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

