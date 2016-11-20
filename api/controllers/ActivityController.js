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
		//TODO .. need implementation 
		res.json("{status :'Getting by find' }");	
	},

	/**
	* @method ActivityController#find
	* @desc API Route from 'GET /activity/:id', to retrieve one specific activity.
	*/
	findOne : function(req, res){
		//TODO .. need implementation 
		res.json("{status :'Getting by findOne' "+req.param('id')+" }");	
	},
	
	/**
	* @method ActivityController#find
	* @desc API Route from 'POST /activity', to create a new activity.
	*/
	create : function(req, res){
		//TODO .. need implementation 
		res.json("{status :'posting' }");
	},

	/**
	* @method ActivityController#find
	* @desc API Route from 'PUT /activity/:id', to update a specific activity.
	*/
	update : function(req, res){
		//TODO .. need implementation 
		res.json("{ status :'updating' }");
	},

	/**
	* @method ActivityController#find
	* @desc API Route from 'DELETE /activity/:id', to delete a specific activity.
	*/
	destroy : function(req, res){
		//TODO .. need implementation 
		res.json("{ status :'deleting' }");
	}

};

