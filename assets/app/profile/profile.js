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

    $scope.getUploadAddress = function(userId){
      return "user/picture/" + userId;
    };

    $scope.getPictureUrl = function(picture){

      if (picture){
        return picture;
      }
      else {
        return "http://placehold.it/80x80";
      }

    };

    $scope.uploadFile = function () {

      var blobFile = $('#picture-uploader')[0].files[0];

      console.log(blobFile);

      var formData = new FormData();
      formData.append("picture", blobFile);
      formData.append("userId", $scope.user.id);

      $.ajax({
        url: "/user/picture",
        type: "POST",
        data: formData,
        processData: false,
        contentType: false,
        success: function(response) {
          $('#uploadModal').modal('hide');

          $timeout(function(){
            $('#picture-profile').attr('src', response.user.picture);
          },0,true);

        },
        error: function(jqXHR, textStatus, errorMessage) {
          console.log(errorMessage); // Optional
        }
      });
    };

    var readURL = function(input) {
      if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
          $('#preview').attr('src', e.target.result);
        };
        reader.readAsDataURL(input.files[0]);
      }
    };

    $scope.openUploadModal = function(){
      $('#uploadModal').modal('show');
    };

    // register listener
    $timeout(function(){
      $("#picture-uploader").change(function(){
        readURL(this);
      });
    }, 500, false);

    if(userId){
      getUser();
    }

  }]);
