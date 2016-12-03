/**
 * Copyright @ 2016 by Samuel T. C. Santos, All rights reserved.
 */

app.controller("Profile", ['$scope','$timeout', 'Rest' , '$routeParams',
  function($scope, $timeout, Rest, $routeParams) {

    $scope.user = {};
    var userId = $routeParams.userId;

    var getUser = function(){

      Rest.get('/user/'+userId).then(function(response){

        if (response.status == HTTP_OK ){
          $timeout(function(){
            $scope.user = response.user;
            console.log(response);
          },0, true);
        }
        else {
          alertify.error(response.message);
        }
      });
    };

    $scope.getTime = function(timestamp){
      return moment(timestamp).fromNow();
    };


    if(userId){
      getUser();
    }

  }]);
