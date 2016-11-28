/**
 * Created by Samuel T. C. Santos on 27/11/2016.
 */

app.controller("Activity", ['$scope', '$routeParams', 'Rest', '$timeout',
	function($scope, $routeParams, Rest, $timeout){

    var userId = $routeParams.userId;

    $scope.title = "";
    $scope.description = "";
    $scope.createdAt = "";

    $scope.activities = [];


    var getActivities = function(){

		Rest.get('/activity?creator=' + userId).then(function(response){
	     
	      if (response.status == HTTP_OK ){
	      	console.log(response)
	      	
	      	$timeout(function(){
				$scope.activities = response.activities;
				$('#activitiesTable').DataTable();
	      	}, 0, true);
	      }
	      else {
	        alertify.error(response.message);
	      }
	    });
    }

	$scope.openActivityModal = function(){
		$('#activityModal').modal('show');
	}


	$scope.createActivity = function(){

		var data = { 
			title: $scope.title, 
			createdAt : $scope.createdAt, 
			description : $scope.description, 
			creator : userId 
		};

	    Rest.post('/activity', data).then(function(response){
	      console.log(response);
	      if (response.status == HTTP_CREATED ){
	        alertify.success("Activity created :" + $scope.title );
	        $('#activityModal').modal('hide');

			$timeout(function(){
				$scope.activities.push(response.activity);
				$('#activitiesTable').DataTable();
			}, 0, true); 
	      }
	      else {
	        alertify.error(response.message);
	       	$('#activityModal').modal('hide'); 
	      }
	    });

	}

	$scope.openIt = function(activityId){
		window.location.href = "#/its/" + activityId;
	}

	getActivities();

	$scope.getTime = function(timestamp){
		return moment(timestamp).fromNow();
	}

    console.log('activities from user ', userId );

}]);
