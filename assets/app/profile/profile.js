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

    var sortByDate = function(a,b){
      return new Date(a).getTime() - new Date(b).getTime();
    };

    var getWeek = function(){
      var today = new Date();
      var days = 7;
      //8 days ago was???
      var eightDayAgo = new Date(today.getTime() - ( days * 24 * 60 * 60 * 1000));

      var weekStart =  getDateFormatted(eightDayAgo);
      var weekEnd = getDateFormatted(today);

      var url = "history?startDate=" + weekStart + "&endDate=" + weekEnd + "&creator=" + userId;

      Rest.get(url).then(function(response){

        if (response.status == HTTP_OK ){
          $timeout(function(){
            console.log(response);
            drawItHistoryChart(response.history.groupedHistory);
          }, 500,  true);
        }
        else {
          alertify.error(response.message);
        }
      });

    };

    var getDateFormatted = function(date) {
      var day = date.getDate();
      var month = date.getMonth() + 1;
      var year = date.getFullYear();

      if (day.toString().length == 1) day = "0"+day;

      if (month.toString().length == 1) month = "0"+month;

      return [year , month, day].join("/");
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

    var drawItHistoryChart = function(historyData){

      itMap = {};

      for (var j =0; j < historyData.length; j ++){

        var activity = historyData[j];

        for (var i =0 ; i < activity.its.length; i++){
          var keyDate = getDateFormatted(new Date(activity.its[i].createdAt));

          if (itMap.hasOwnProperty(keyDate)){
            itMap[keyDate] += activity.its[i].duration;
          }
          else {
            itMap[keyDate] = activity.its[i].duration;
          }

          console.log(keyDate);
        }

      }

      var categories = Object.keys(itMap);

      categories.sort(sortByDate);

      var values = [];

      for(var i = 0; i < categories.length;i++){
        values.push(itMap[categories[i]]);
      }

      var itHistoryChart =  Highcharts.chart('chartItHistory', {
        title: {
          text: 'Invested Time',
          x: -20 //center
        },
        subtitle: {
          text: 'Source: povmt database',
          x: -20
        },
        xAxis: {
          categories: categories
        },
        yAxis: {
          title: {
            text: 'Time (min)'
          },
          plotLines: [{
            value: 0,
            width: 1,
            color: '#808080'
          }]
        },
        tooltip: {
          valueSuffix: 'Min'
        },
        legend: {
          layout: 'vertical',
          align: 'right',
          verticalAlign: 'middle',
          borderWidth: 0
        },
        series: [{
          name: 'Total of Invested Time',
          data: values
        }]
      });

    };

    $scope.uploadFile = function () {

      var blobFile = $('#picture-uploader')[0].files[0];

      var formData = new FormData();
      formData.append("picture", blobFile);
      formData.append("userId", $scope.user.id);

      $.ajax({
        url: "/user/picture",
        type: "POST",
        data: formData,
        headers : {
          Authorization : 'Bearer ' + Rest.getToken()
        },
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
      getWeek();
    }


  }]);
