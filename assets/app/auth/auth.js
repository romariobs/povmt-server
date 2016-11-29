/**
 * Created by Samuel T. C. Santos on 27/11/2016.
 */

app.controller("Auth", ['$scope', '$timeout', 'Rest',
  function($scope, $timeout, Rest){

  $scope.email = "";
  $scope.password = "";

  $('.navbar').addClass('hidden');
  //$('body').css('background-color', '#eee');

  $scope.login = function(){

    var data = { email : $scope.email, password : $scope.password };

    Rest.post('/user/auth', data).then(function(response){
      console.log(response);

      if (response.status == HTTP_OK){

        alertify.success("Welcome, " + $scope.email.split('@')[0] );

        $timeout(function(){
          //$('.navbar').removeClass('hidden');
          $('body').css('background-color', '#fff');
          window.location.href = '#/users'
        },500, false);

      }
      else {
        alertify.error(response.message);
      }

    });

  };


}]);
