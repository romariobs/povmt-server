/**
 * Copyright @ 2016 by Samuel T. C. Santos, All rights reserved.
 */

app.controller("Auth", ['$scope', '$timeout', 'Rest',
  function($scope, $timeout, Rest){

  $scope.email = "";
  $scope.password = "";

  $('.navbar-nav').hide();
  $('body').css('background-color', '#2e2e30');

  $scope.login = function(){

    var data = { email : $scope.email, password : $scope.password };

    Rest.post('/user/auth', data).then(function(response){

      if (response.status == HTTP_OK){

        alertify.success("Welcome, " + $scope.email.split('@')[0] );

        $timeout(function(){
          $('.navbar-nav').show();
          $('body').css('background-color', '#fff');
          window.location.href = '#/dashboard'
        },500, false);

      }
      else {
        alertify.error(response.message);
      }

    });

  };


}]);
