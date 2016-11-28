/**
 * Created by Samuel T. C. Santos on 27/11/2016.
 */

app.controller("User", ['$scope','$timeout', 'Rest', function($scope, $timeout, Rest){

	$scope.users = [];
	$scope.name = "";
	$scope.email = "";
	$scope.password = "";

	var getUsers = function(){

		Rest.get('/user').then(function(response){
	      
	      if (response.status == HTTP_OK ){
	      	console.log(response)
	      	
	      	$timeout(function(){
				$scope.users = response.users;
				$('#usersTable').DataTable();
	      	}, 0, true);
	      }
	      else {
	        alertify.error(response.message);
	      }
	    });
	}

	$scope.openUserModal = function(){
		$('#userModal').modal('show');
	}

	$scope.register = function(){

		var data = { name: $scope.name, email : $scope.email, password : $scope.password };

	    Rest.post('/user', data).then(function(response){
	      console.log(response);
	      if (response.status == HTTP_CREATED ){
	        alertify.success("New user created : " + $scope.name );
	        $('#userModal').modal('hide');

			$timeout(function(){
				$scope.users.push(response.user);
				$('#usersTable').DataTable();
			}, 0, true); 
	      }
	      else {
	        alertify.error(response.message);
	       	$('#userModal').modal('hide'); 
	      }
	    });

	}

	$scope.openActivity = function(userId){
		window.location.href = "#/activities/" + userId;
	}

	getUsers();

}]);
