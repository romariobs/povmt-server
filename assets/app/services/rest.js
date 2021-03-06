/**
 * Copyright @ 2016 by Samuel T. C. Santos, All rights reserved.
 */

/**
 * @ngservice
 * @class Rest
 * @desc RestService to perform ajax call to the Web Service.
 * @author Samuel T. C. Santos
 */
app.service('Rest', ['$q', '$http', function($q, $http) {

  this.token = undefined;

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
      url: url,
      headers : {
        'Authorization' : 'Bearer ' + this.token,
        'Content-Type': 'application/json'
      }
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
      data : data,
      headers : {
        'Authorization' : 'Bearer ' + this.token,
        'Content-Type': 'application/json'
      }
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

    var deferred  = $q.defer();

    var request = {
      method : "PUT",
      url: url,
      data : data,
      headers : {
        'Authorization' : 'Bearer ' + this.token,
        'Content-Type': 'application/json'
      }
    };

    $http(request).then(function(response){
      deferred.resolve(response.data);
    }, function(err){
      deferred.reject(err);
    });

    return deferred.promise;

  };

  /**
   * @method Rest#delete
   * @desc Doing a DELETE call to Luemas REST API.
   *
   * @param {string} url - The endpoint to call.
   */
  this.delete = function(url){
    var deferred  = $q.defer();

    var request = {
      method : "DELETE",
      url: url,
      headers : {
        'Authorization' : 'Bearer ' + this.token,
        'Content-Type': 'application/json'
      }
    };

    $http(request).then(function(response){
      deferred.resolve(response.data);
    }, function(err){
      deferred.reject(err);
    });

    return deferred.promise;
  };

  /**
   * Set the authorization token for perform api calls.
   *
   * @param token {string} - the token
   */
  this.setToken = function(token){
    this.token = token;
  };

  /**
   * Get the authentication token.
   *
   * @returns {undefined|*}
   */
  this.getToken = function(){
    return this.token;
  }

}]);
