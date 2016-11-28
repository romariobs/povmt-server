/**
 * Created by Samuel T. C. santos on 27/11/2016.
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
      if (response.status == HTTP_OK){

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
