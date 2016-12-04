/**
 * Copyright @ 2016 by Samuel T. C. Santos, All rights reserved.
 */

app.controller("User", ['$scope','$timeout', 'Rest', function($scope, $timeout, Rest){

	$scope.name = "";
	$scope.email = "";
	$scope.password = "";
  $scope.role = "USER";

  $scope.userSelectedId = undefined;

	var getUsers = function(){

		Rest.get('/user').then(function(response){

	      if (response.status == HTTP_OK ){

          $timeout(function(){
            var dataset = buildDataSet(response.users);

            var options = {
              data : dataset,
              columns: getColumns(),
              iDisplayLength: 5,
              aLengthMenu : [[5, 10, 25, 50, -1], [5, 10, 25, 50, "All"]]
            };

            $('#usersTable').DataTable(options);
	      	  }, 0, true);
	      }
	      else {
	        alertify.error(response.message);
	      }
	    });
	};


  var getUserPicture = function (pictureUrl){
    return pictureUrl ? pictureUrl : "http://placehold.it/80x80";
  };

	$scope.openUserModal = function(){
		$('#userModal').modal('show');
	};

	$scope.register = function(){

		var data = { name: $scope.name, email : $scope.email, password : $scope.password , role : $scope.role };

	    Rest.post('/user', data).then(function(response){
	      console.log(response);
	      if (response.status == HTTP_CREATED ){
	        alertify.success("User created " + $scope.name );
	        $('#userModal').modal('hide');
          addRow(response.user);
	      }
	      else {
	        alertify.error(response.message);
	       	$('#userModal').modal('hide');
	      }
        $scope.name = "";
        $scope.email = "";
        $scope.password = "";
	    });

	};

  var addRow = function(user){
      var data = [
        user.id,
        '<img width="60" class="img-thumbnail" src="'+getUserPicture(user.picture)+'"/> <a href="#/profile/'+user.id+'">' +user.name+'</a>',
        user.email,
        '<a><i id="'+user.id+'" class="fa fa-trash"></i></a>'
      ];
      $("#usersTable").dataTable().fnAddData(data);
  };

  var buildDataSet = function(users){

    var dataset = [];

    for (var i=0; i < users.length; i++){
      var row = [];
      row.push(users[i].id);
      row.push('<img width="60" class="img-thumbnail" src="'+getUserPicture(users[i].picture)+'"/> <a href="#/profile/'+users[i].id+'">' +users[i].name+'</a>');
      row.push(users[i].email);
      row.push('<a><i  id="'+users[i].id+'" class="fa fa-trash"></i></i></a>');
      dataset.push(row);
    }
    return dataset;
  };

  var getColumns = function(){
    var columns = [ {title : "ID"},  {title : "Username" }, {title : "Email"}, {title : "Options" }];
    return columns;
  };

  var deleteUser = function(){

    if (typeof ($scope.userSelectedId) !== "undefined"){

      alertify.confirm("Do you want to delete this user?", function () {

        Rest.delete('/user/'+$scope.userSelectedId).then(function(response){
          if (response.status == HTTP_OK){
            alertify.success("Deleted user!");
          }
          else {
            alertify.error(response.message);
          }
        });
      }, function() {
        $scope.userSelectedId = undefined;
      });
    }
  };

  //register listeners
  $timeout(function(){

    $(".fa-trash").click(function(event) {
      $scope.userSelectedId = event.target.id;
      deleteUser();
    });

  }, 500, false);

	getUsers();

}]);
