/**
 * Copyright @ 2015 by Samuel T. C. Santos, All rights reserved.
 */

/**
 * @ngservice
 * @class Rest
 * @desc RestService to perform ajax call to the Web Service.
 * @author Samuel T. C. Santos
 */
app.service('Rest', ['$q', '$http', function($q, $http) {

  /**
   * @method Rest#get
   * @desc Perform a GET request to server.
   *
   * @param {string} url - the endpoint to call.
   */
  this.get = function(url){
    var deferred  = $q.defer();

    var request = {
      method : "GET",
      url: url
    };

    $http(request).then(function(response){
      deferred.resolve(response.data);
    }, function(err){
      deferred.reject(err);
    });

    return deferred.promise;
  };

  /**
   * @method Rest#post
   * @desc Perform a POST request to server.
   *
   * @param {string} url - The endpoint to call.
   * @param {object} data - The data to send.
   */
  this.post = function(url, data){

    var deferred  = $q.defer();

    var request = {
      method : "POST",
      url: url,
      data : data
    };

    $http(request).then(function(response){
      deferred.resolve(response.data);
    }, function(err){
      deferred.reject(err);
    });

    return deferred.promise;
  };

  /**
   * @method Rest#put
   * @desc Doing a PUT call to Luemas REST API.
   *
   * @param {string} url - The endpoint to call.
   * @param {object} data - The data to send.
   */
  this.put = function(url, data){
     // TODO ... implementation
  };

  /**
   * @method Rest#delete
   * @desc Doing a DELETE call to Luemas REST API.
   *
   * @param {string} url - The endpoint to call.
   * @param {object} id - The resource id to send.
   */
  this.delete = function(url, id){
    // TODO ... implementation
  };


}]);
