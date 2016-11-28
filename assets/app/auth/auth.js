/**
 * Created by Samuel T. C. Santos on 27/11/2016.
 */

app.controller("Auth", ['$scope', '$timeout', 'Rest',
  function($scope, $timeout, Rest){

  $scope.email = "";
  $scope.password = "";

  $scope.login = function(){

    var data = { email : $scope.email, password : $scope.password };

    Rest.post('/user/auth', data).then(function(response){
      console.log(response);

      if (response.status == HTTP_OK){

        alertify.success("Welcome, " + $scope.email.split('@')[0] );

        $timeout(function(){
          window.location.href = '#/users'
        },500, false);

      }
      else {
        alertify.error(response.message);
      }

    });

  };

  console.log('auth works');
}]);
