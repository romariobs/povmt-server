/*
* @copyright 2016 - Samuel T. C. Santos All rights reserved.
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
      else {
        return res.json({ status : 400 , message  : "Bad Request, Missing parameter creator! "});
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

	        Activity.count(filter).exec(function countCallback(err, totalOfActivities) {
	          if (err){
	            response.status = 500;
	            response.err = err;
	          }
	          else{
	            response.status = 200;
	            response.activities = results;
	            response.rowCount = totalOfActivities;
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

		Activity.findOne( req.param('id'), function foundActivity(err, activity){

			if (err){
				responseObject = {
					status : 500,
					message : "error search activity with id " + req.param('id'),
					error : err
				};
				return res.json(responseObject);
			}

			if (!activity){
				responseObject = {
					status : 404,
					message : "Activity doesn\'t exist."
				};
				return res.json(responseObject);
			}

			responseObject = {
				status : 200,
				activity : activity
			};
			return res.json(responseObject);
		});

	},

	/**
	* @method ActivityController#find
	* @desc API Route from 'POST /activity', to create a new activity.
	*/
	create : function(req, res){
    var INDEX_NOT_FOUND = -1;
    var priorityValues = ["LOW", "MEDIUM", "HIGH"];
    var categoryValues = ["WORK", "LEISURE"];

		var creator = req.param('creator');
		var createdAt = req.param('createdAt');

    var priority  = req.param('priority');
    var category  = req.param('category');

    if (priority.indexOf(priority) == INDEX_NOT_FOUND){
      return res.json({status : 400, message : "Bed Request, Invalid parameter priority, values are " + priorityValues.join('') });
    }

    if(categoryValues.indexOf(category) == INDEX_NOT_FOUND){
      return res.json({status : 400, message : "Bed Request, Invalid parameter category, values are " + categoryValues.join('') });
    }

		var activity = {
			title : req.param('title'),
			description : req.param('description'),
			creator : creator,
      priority : priority
		};

		if (createdAt){
			activity["createdAt"] = createdAt;
		}

		var responseObject = {};

	    User.findOne(creator, function foundUser(err, user){

	    	if (!user){
	    		responseObject = {
	    			status : 404,
	    			message : "User not found, id = " + creator
	    		};
	    		return res.json(responseObject);
	    	}

	    	Activity.create(activity).exec(function createActivityCallback(err, newActivity){

	    		if (err){
	    			responseObject = {
	    				status : 500,
	    				message : "Error creating activity",
	    				error : err
	    			};
	    			return res.json(responseObject);
	    		}

	    		responseObject = {
	    			status : 201,
	    			activity : newActivity
	    		};

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
		        };
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
	          message : 'Error searching activity',
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
	},

  picture : function(req, res, next){

    var cloudinary = CloudinaryService.getInstance();

    var uploadFile = req.file('picture');

    if (!uploadFile){
      return res.json({ status : 400, message : "Bad Request, missing parameter picture or invalid file sent!"});
    }

    var activityId = req.param('activityId');

    if (!activityId){
      return res.json({ status : 400, message : "Bad Request, missing parameter usedId!"});
    }

    uploadFile.upload(function onUploadComplete(err, files){
      // Files will be uploaded to .tmp/uploads
      if (err) {
        return res.serverError(err);
      }

      //Upload image to Cloudinary server
      cloudinary.uploader.upload(files[0].fd, function(result){

        Activity.findOne(activityId, function foundUser(err, activity){

          if (err){
            return res.json({ status : 500, message : "Server Internal Error, problems searching activity!"});
          }

          if (!activity){
            return res.json({ status : 404, message : "Not Found, activity not found id =" + activityId });
          }

          activity.picture = result.url;

          Activity.update(activityId, activity , function updatedActivityPicture(err){

            if (err) {
              return res.json({ status : 500, message : "Internal Server Error, fail to update activity!" });
            }

            return res.json({status : 200, activity: activity });
          });
        });
      });

    });

  }


};

