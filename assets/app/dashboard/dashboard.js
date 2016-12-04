/**
 * Copyright @ 2016 by Samuel T. C. Santos, All rights reserved.
 */

app.controller("Dashboard", ['$scope','$timeout', 'Rest', function($scope, $timeout, Rest) {


  var drawActivityChart = function(usage){

    var categories = [];
    var values = [];

    for (var i=0; i < usage.users.length; i++){
      categories.push(usage.users[i].name);
      values.push(usage.users[i].activities);
    }

    var activityChart = Highcharts.chart('chartUserVsActivity', {
      chart: {
        type: 'bar'
      },
      title: {
        text: 'Activities by User'
      },
      xAxis: {
        categories: categories
      },
      yAxis: {
        title: {
          text: 'Quantity'
        }
      },
      series: [{
        name: 'Number of Activities',
        data: values
      }]
    });

  };

  var getDashboard = function(){

    Rest.get('/dashboard').then(function(response){

      if (response.status == HTTP_OK ){
        $timeout(function(){
          drawActivityChart(response);
        }, 500, true);
      }
      else {
        alertify.error(response.message);
      }
    });

  };

  getDashboard();

}]);
