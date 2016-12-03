/**
 * Copyright @ 2016 by Samuel T. C. Santos, All rights reserved.
 */

app.controller("Dashboard", ['$scope','$timeout', 'Rest', function($scope, $timeout, Rest) {

  var myChart = Highcharts.chart('chartUserVsActivity', {
    chart: {
      type: 'bar'
    },
    title: {
      text: 'Frequency of activity creation by users'
    },
    xAxis: {
      categories: ['Samuel Santos', 'Luana Santos', 'Ludmila Guedes' , 'Maisa Lins']
    },
    yAxis: {
      title: {
        text: 'Fruit eaten'
      }
    },
    series: [{
      name: 'Activity',
      data: [1, 1, 4, 8]
    }, {
      name: 'It',
      data: [5, 7, 3, 9]
    }]
  });


}]);
