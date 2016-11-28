/**
 * Created by Samuel T. C. Santos on 27/11/2016.
 */

app.controller("It", ['$scope' , '$routeParams', '$timeout', 'Rest',
 	function($scope, $routeParams, $timeout, Rest){

	var activityId = $routeParams.activityId;

	$scope.duration = "";
	$scope.createdAt = "";

	$scope.its = [];


    var getIts = function(){

		Rest.get('/it?investedTimeAt=' + activityId).then(function(response){
	     
	      if (response.status == HTTP_OK ){
	      	console.log(response)
	      	
	      	$timeout(function(){
				$scope.its = response.its;
				$('#itsTable').DataTable();
	      	}, 0, true);
	      }
	      else {
	        alertify.error(response.message);
	      }
	    });
    }



	$scope.openItModal = function(){
		$('#itModal').modal('show');
	}

	$scope.createIt = function(){

		var data = { 
			duration: $scope.duration, 
			createdAt : $scope.createdAt, 
			investedTimeAt : activityId
		};

	    Rest.post('/it', data).then(function(response){
	      console.log(response);
	      if (response.status == HTTP_CREATED ){
	        alertify.success("Invested Time created :" + $scope.duration );
	        $('#itModal').modal('hide');

			$timeout(function(){
				$scope.its.push(response.it);
				$('#itsTable').DataTable();
			}, 0, true); 
	      }
	      else {
	        alertify.error(response.message);
	       	$('#itModal').modal('hide'); 
	      }
	    });

	}

	$scope.getTime = function(timestamp){
		return moment(timestamp).fromNow();
	}

	getIts();

  	console.log('it for activity ', activityId );
}]);
