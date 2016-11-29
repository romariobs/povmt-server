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
            var dataset = buildDataSet(response.activities);
            var options = {
              data : dataset,
              columns: getColumns(),
              iDisplayLength: 10,
              aLengthMenu : [[5, 10, 25, 50, -1], [5, 10, 25, 50, "All"]]
            };

            $('#activitiesTable').DataTable(options);
	      	}, 0, true);
	      }
	      else {
	        alertify.error(response.message);
	      }

	    });
    };

	$scope.openActivityModal = function(){
		$('#activityModal').modal('show');
	};

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
          addRow(response.activity);
	      }
	      else {
	        alertify.error(response.message);
	       	$('#activityModal').modal('hide');
	      }
        $scope.title = "";
        $scope.description = "";
        $scope.createdAt = "";
      });

	};

  var addRow = function(activity){
    var data = [
      activity.id,
      '<a href="#/its/'+activity.id+'">' +activity.title+'</a>',
      activity.description,
      getTime(activity.createdAt),
      getTime(activity.updatedAt)
    ];
    $("#activitiesTable").dataTable().fnAddData(data);
  };


  var buildDataSet = function(activities){
    var dataset = [];
    for (var i=0; i < activities.length; i++){
      var row = [];
      row.push(activities[i].id);
      row.push('<a href="#/its/'+activities[i].id+'">' +activities[i].title+'</a>');
      row.push(activities[i].description);
      row.push(getTime(activities[i].createdAt));
      row.push(getTime(activities[i].updatedAt));
      dataset.push(row);
    }
    return dataset;
  };

  var getColumns = function(){
    var columns = [
      {title : "ID"},
      {title : "Activity Title" },
      {title : "Description"},
      {title : "Created At"},
      {title : "Updated At"}
    ];
    return columns;
  };

  getActivities();

	var getTime = function(timestamp){
		return moment(timestamp).fromNow();
	};

}]);
