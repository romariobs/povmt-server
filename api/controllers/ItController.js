/**
 * ItController - Controller to manager request addressed to /it route.
 *
 * @description :: Server-side logic for managing its
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {


	/**
	* @method ItController#find
	* @desc API Route from 'GET /it', to retrieve all IT.
	*/
	find : function(req, res){

      var investedTimeAt = req.param('investedTimeAt');

      if (!investedTimeAt){
        return res.json({ status : 400, message : "Bad Request, missing parameter investedTimeAt!"});
      }
    
		  var query = It.find();

	    var limit = req.param('limit');
	    var sort = req.param('sort');
	    var skip = req.param('skip');

	    //Allowed filter by Activity
	    var activityId = req.param('investedTimeAt');

	    if (activityId){
	    	query.where({ "investedTimeAt" : activityId });
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

	      	if (activityId) {
	      		filter = { investedTimeAt : activityId };
	      	}

	        It.count(filter).exec(function countCallback(err, totalOfIt) {
	          if (err){
	            response.status = 500;
	            response.err = err;
	          }
	          else{
	            response.status = 200;
	            response.its = results;
	            response.rowCount = totalOfIt;
	          }
	          return res.json(response);
	        });

	      }

		});
	},

	/**
	* @method ItController#findOne
	* @desc API Route from 'GET it/:id', to one specific IT.
	*/
	findOne : function(req, res){

		var responseObject = {};

		It.findOne( req.param('id'), function foundIt(err, it){

			if (err){
				responseObject = {
					status : 500,
					message : "error search It with id " + req.param('id'),
					error : err
				};
				return res.json(responseObject);
			}

			if (!it){
				responseObject = {
					status : 404,
					message : "It doesn\'t exist."
				};
				return res.json(responseObject);
			}

			responseObject = {
				status : 200,
				it : it
			};
			return res.json(responseObject);
		});

	},

	/**
	* @method ItController#create
	* @desc API Route from 'POST /it' , to one create a new  IT.
	*/
	create : function(req, res){

		var ativityId = req.param('investedTimeAt');
		var createdAt = req.param('createdAt');

		var responseObject = {};

		var it = {
			duration : req.param('duration'),
			investedTimeAt : ativityId
		};

		if (createdAt){
			it["createdAt"] = createdAt;
		}

	    Activity.findOne(ativityId, function foundActivity(err, activity){

	    	if (!activity){
	    		responseObject = {
	    			status : 404,
	    			message : "Activity not found, id = " + ativityId
	    		}
	    		return res.json(responseObject);
	    	}

	    	It.create(it).exec(function createItCallback(err, newIt){

	    		if (err){
	    			responseObject = {
	    				status : 500,
	    				message : "Error creating It (Invested Time)",
	    				error : err
	    			}
	    			return res.json(responseObject);
	    		}

	    		responseObject = {
	    			status : 201,
	    			it : newIt
	    		}

	    		return res.json(responseObject);
	    	});

	    });
	},

	/**
	* @method ItController#update
	* @desc API Route from 'UPDATE it/:id', to update specific IT.
	*/
	update : function(req, res){

		var responseObject = {};

		It.findOne(req.param('id'), function foundIt(err, it){

			if (err){
				responseObject  = {
		          status : 500,
		          message : 'Error retrieving it',
		          error : err
		        };
		        return res.json(responseObject);
			}

			if (!it){
			 	responseObject = {
		          status : 404,
		          message : 'It doesn\'t exist.'
		        }
		        return res.json(responseObject);
			}

			It.update(req.param('id'), req.params.all(), function itUpdated(err){

		      if(err){
		        responseObject = {
		          status : 500,
		          message : "Error updating it",
		          err : err
		        };
		        return res.json(responseObject);
		      }

		      responseObject = {
		        status :  200,
		        message : "It updated successfully."
		      };

		      return res.json(responseObject);
		    });

		});
	},

	/**
	* @method ItController#destroy
	* @desc API Route from 'DELETE /it/:id', to remove a specific IT.
	*/
	destroy : function(req, res){
		var responseObject = {};

	    It.findOne(req.param('id'), function foundIt(err, it){

	      if (err){
	        responseObject  = {
	          status : 500,
	          message : 'Error searching it ',
	          error : err
	        };
	        return res.json(responseObject);
	      }

	      if (!it){
	        responseObject = {
	          status : 404,
	          message : 'It doesn\'t exist.'
	        }
	        return res.json(responseObject);
	      }


	      It.destroy(req.param('id'), function activityDestroyed(err){
	        if (err){
	          responseObject  = {
	            status : 500,
	            message : 'Error deleting it',
	            error : err
	          };
	        }
	        else {
	          responseObject  = {
	            status : 200,
	            message : 'It deleted successfully.'
	          };
	        }

	        return res.json(responseObject);
	      });

	    });

	}

};

