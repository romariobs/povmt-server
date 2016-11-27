/**
 * Created by Samuel T. C. Santos on 27/11/2016.
 */

app.controller("Auth", ['$scope', 'Rest', function($scope, Rest){

  $scope.email = "";
  $scope.password = "";

  $scope.login = function(){

    var data = { email : $scope.email, password : $scope.password };

    Rest.post('/user/auth', data).then(function(response){
      console.log(response);
    });

  };

  console.log('auth works');
}]);
