/*
* @copyright 2016 - Samuel T. C. Santos
*/

/**
 * ActivityController
 *
 * @description :: Server-side logic for managing activities
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	

	/**
	* @method ActivityController#find
	* @desc API Route from 'GET /activity', to retrieve all activities.
	*/
	find : function(req, res){
		
		var query = Activity.find();

	    var limit = req.param('limit');
	    var sort = req.param('sort');
	    var skip = req.param('skip');

	    //Allowed filter by creator 
	    var creator = req.param('creator'); 

	    if (creator){
	    	query.where({ "creator" : creator });
	    }

	    if (limit){
	      query.limit(limit);
	    }

	    if (skip){
	      query.skip(skip);
	    }

	    if (sort){
	      query.sort(sort);
	    }

	    query.exec(function queryCallback(err, results){
	      var response = {};

	      if (err){
	        response.status = 500;
	        response.err = err;
	        return res.json(response);
	      }
	      else {

	      	var filter = {};

	      	if (creator) {
	      		filter = { creator : creator };
	      	}

	        Activity.count(filter).exec(function countCallback(err, totalOfUsers) {
	          if (err){
	            response.status = 500;
	            response.err = err;
	          }
	          else{
	            response.status = 200;
	            response.activities = results;
	            response.rowCount = totalOfUsers;
	          }
	          return res.json(response);
	        });

	      }

		});

	},

	/**
	* @method ActivityController#find
	* @desc API Route from 'GET /activity/:id', to retrieve one specific activity.
	*/
	findOne : function(req, res){
		
		var responseObject = {};

		Activity.findOne( req.param('id'), function foundActivity(err, user){
			
			if (err){
				responseObject = {
					status : 500,
					message : "error search activity with id " + req.param('id'),
					error : err
				}
				return res.json(responseObject);
			}

			if (!user){
				responseObject = {
					status : 404,
					message : "Activity doesn\'t exist."
				}
				return res.json(responseObject);
			}

			responseObject = {
				status : 200,
				user : user
			}
			return res.json(responseObject);
		});

	},
	
	/**
	* @method ActivityController#find
	* @desc API Route from 'POST /activity', to create a new activity.
	*/
	create : function(req, res){

		var creator = req.param('creator');

		var activity = {
			title : req.param('title'),
			description : req.param('description'),
			creator : creator
		};

		var responseObject = {};

	    User.findOne(creator, function foundUser(err, user){	

	    	if (!user){
	    		responseObject = {
	    			status : 404,
	    			message : "User not found, id = " + creator
	    		}
	    		return res.json(responseObject);
	    	}

	    	Activity.create(activity).exec(function createActivityCallback(err, newActivity){

	    		if (err){
	    			responseObject = {
	    				status : 500,
	    				message : "Error creating activity",
	    				error : err
	    			}	
	    			return res.json(responseObject);
	    		}

	    		responseObject = {
	    			status : 201,
	    			ativity : newActivity
	    		}

	    		return res.json(responseObject);
	    	});

	    });		

	},

	/**
	* @method ActivityController#find
	* @desc API Route from 'PUT /activity/:id', to update a specific activity.
	*/
	update : function(req, res){
		var responseObject = {};

		Activity.findOne(req.param('id'), function foundActivity(err, activity){

			if (err){
				responseObject  = {
		          status : 500,
		          message : 'Error retrieving activity',
		          error : err
		        };
		        return res.json(responseObject);
			}

			if (!activity){
			 	responseObject = {
		          status : 404,
		          message : 'Activity doesn\'t exist.'
		        }
		        return res.json(responseObject);
			}

			Activity.update(req.param('id'), req.params.all(), function activityUpdated(err){
		     
		      if(err){
		        responseObject = {
		          status : 500,
		          message : "Error updating activity",
		          err : err
		        };
		        return res.json(responseObject);
		      }

		      responseObject = {
		        status :  200,
		        message : "Activity updated successfully."
		      };

		      return res.json(responseObject);
		    });

		});

	    
	},

	/**
	* @method ActivityController#find
	* @desc API Route from 'DELETE /activity/:id', to delete a specific activity.
	*/
	destroy : function(req, res){
		var responseObject = {};

	    Activity.findOne(req.param('id'), function foundActivity(err, activity){

	      if (err){
	        responseObject  = {
	          status : 500,
	          message : 'Something wrong happened',
	          error : err
	        };
	        return res.json(responseObject);
	      }

	      if (!activity){
	        responseObject = {
	          status : 404,
	          message : 'Activity doesn\'t exist.'
	        }
	        return res.json(responseObject);
	      }


	      Activity.destroy(req.param('id'), function activityDestroyed(err){
	        if (err){
	          responseObject  = {
	            status : 500,
	            message : 'Error deleting activity',
	            error : err
	          };
	        }
	        else {
	          responseObject  = {
	            status : 200,
	            message : 'activity deleted successfully.'
	          };
	        }

	        return res.json(responseObject);
	      });

	    });		
	}

};

