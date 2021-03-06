/**
 * Copyright @ 2016 by Samuel T. C. Santos, All rights reserved.
 */

app.controller("SignUp", ['$scope', 'Rest','$timeout',
  function($scope, Rest, $timeout){

  $scope.name = "";
  $scope.email = "";
  $scope.password = "";

  $scope.signup = function(){

    var data = { name: $scope.name, email : $scope.email, password : $scope.password };

    Rest.post('/user', data).then(function(response){
      console.log(response);
      if (response.status == HTTP_CREATED ){

        alertify.success("New user created : " + $scope.name );

        $timeout(function(){
          window.location.href = '#/auth'
        },500, false);

      }
      else {
        alertify.error(response.message);
      }
    });

  };

  console.log('sign up works');
}]);
