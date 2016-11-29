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

        $timeout(function(){
          var dataset = buildDataSet(response.its);

          var options = {
            data : dataset,
            columns: getColumns(),
            iDisplayLength: 10,
            aLengthMenu : [[5, 10, 25, 50, -1], [5, 10, 25, 50, "All"]]
          };

          $('#itsTable').DataTable(options);
        }, 0, true);
      }
      else {
        alertify.error(response.message);
      }
    });
  };

	$scope.openItModal = function(){
		$('#itModal').modal('show');
	};

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
            addRow(response.it);
          }, 0, true);
	      }
	      else {
	        alertify.error(response.message);
	       	$('#itModal').modal('hide');
	      }
	    });

	};

  var getTime = function(timestamp){
    return moment(timestamp).fromNow();
  };

  var addRow = function(it){
    var data = [
      it.id,
      it.duration,
      getTime(it.createdAt),
      getTime(it.updatedAt)
    ];
    $("#itsTable").dataTable().fnAddData(data);
  };

  var buildDataSet = function(its){
    var dataset = [];
    for (var i=0; i < its.length; i++){
      var row = [];
      row.push(its[i].id);
      row.push(its[i].duration);
      row.push(getTime(its[i].createdAt));
      row.push(getTime(its[i].updatedAt));
      dataset.push(row);
    }
    return dataset;
  };

  var getColumns = function(){
    var columns = [
      {title : "ID"},
      {title : "Duration" },
      {title : "Created At"},
      {title : "Updated At"}
    ];
    return columns;
  };

	getIts();

  	console.log('it for activity ', activityId );
}]);
