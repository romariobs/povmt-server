/**
 * Created by Samuel T. C. Santos on 27/11/2016.
 */

app.controller("User", ['$scope','$timeout', 'Rest', function($scope, $timeout, Rest){

	$scope.name = "";
	$scope.email = "";
	$scope.password = "";

  $scope.userSelectedId = undefined;

	var getUsers = function(){

		Rest.get('/user').then(function(response){

	      if (response.status == HTTP_OK ){

          $timeout(function(){
            var dataset = buildDataSet(response.users);

            var options = {
              data : dataset,
              columns: getColumns(),
              iDisplayLength: 10,
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

	$scope.openUserModal = function(){
		$('#userModal').modal('show');
	};

	$scope.register = function(){

		var data = { name: $scope.name, email : $scope.email, password : $scope.password };

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
        '<a href="#/activities/'+user.id+'">' +user.name+'</a>',
        user.email,
        '<a><i class="fa fa-trash"></i></i></a>'
      ];
      $("#usersTable").dataTable().fnAddData(data);
  };

  var buildDataSet = function(users){

    var dataset = [];

    for (var i=0; i < users.length; i++){
      var row = [];
      row.push(users[i].id);
      row.push('<i class="fa fa-user-circle fa-2x"></i> <a href="#/activities/'+users[i].id+'">' +users[i].name+'</a>');
      row.push(users[i].email);
      row.push('<a class="delete-user-action"><i  id="'+users[i].id+'"class="fa fa-trash"></i></i></a>');
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
        // user clicked "ok"
        Rest.delete('/user/'+$scope.userSelectedId).then(function(response){

          if (response.status == HTTP_OK){
            alertify.success("Deleted user!");
          }
          else {
            alertify.error(response.message);
          }

        });
      }, function() {
        // user clicked "cancel"
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
