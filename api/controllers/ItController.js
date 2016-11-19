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

		res.json("{status :'Getting by find' }");	
	},

	/**
	* @method ItController#findOne
	* @desc API Route from 'GET it/:id', to one specific IT.
	*/
	findOne : function(req, res){
		res.json("{status :'Getting by findOne' "+req.param('id')+" }");	
	},
	
	/**
	* @method ItController#create
	* @desc API Route from 'POST /it' , to one create a new  IT.
	*/
	create : function(req, res){
		res.json("{status :'posting' }");
	},

	/**
	* @method ItController#update
	* @desc API Route from 'UPDATE it/:id', to update specific IT.
	*/
	update : function(req, res){

		res.json("{ status :'updating' }");
	},

	/**
	* @method ItController#destroy
	* @desc API Route from 'DELETE /it/:id', to remove a specific IT.
	*/
	destroy : function(req, res){
		res.json("{ status :'deleting' }");
	}

};

