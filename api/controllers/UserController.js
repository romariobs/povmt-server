/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

	/**
	* @method UseController#find
	* @desc API Route from 'GET /user', to retrieve all users.
	*/
	find : function(req, res){
		//TODO .. need implementation 
		res.json("{status :'Getting by find' }");	
	},

	/**
	* @method UseController#find
	* @desc API Route from 'GET /user/:id', to retrieve only one specific user.
	*/
	findOne : function(req, res){
		//TODO .. need implementation 
		res.json("{status :'Getting by findOne' "+req.param('id')+" }");	
	},
	
	/**
	* @method UseController#create
	* @desc API Route from 'POST /user', to create a new user.
	*/
	create : function(req, res){
		//TODO .. need implementation 
		res.json("{status :'posting' }");
	},

	/**
	* @method UseController#update
	* @desc API Route from 'PUT /user/:id', to update a specific user.
	*/
	update : function(req, res){
		//TODO .. need implementation 
		res.json("{ status :'updating' }");
	},

	/**
	* @method UseController#delete
	* @desc API Route from 'DELETE /user/:id', to delete a specific user.
	*/
	destroy : function(req, res){
		//TODO .. need implementation 
		res.json("{ status :'deleting' }");
	}
	
};

