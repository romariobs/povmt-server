/**
 * Created by Samuel T. C. santos on 27/11/2016.
 */
app.controller("SignUp", ['$scope', 'Rest', function($scope, Rest){

  $scope.name = "";
  $scope.email = "";
  $scope.password = "";

  $scope.signup = function(){

    var data = { name: $scope.name, email : $scope.email, password : $scope.password };

    Rest.post('/user', data).then(function(response){
      console.log(response);
    });

  };

  console.log('sign up works');
}]);
