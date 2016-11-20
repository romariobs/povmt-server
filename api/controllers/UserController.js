/*
* @copyright 2016 - Samuel T. C. Santos
*/

var bcrypt = require('bcrypt');

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

		var query = User.find();

	    var limit = req.param('limit');
	    var sort = req.param('sort');
	    var skip = req.param('skip');
	    var where = req.param('where');

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
	        User.count({}).exec(function countCallback(err, totalOfUsers) {
	          if (err){
	            response.status = 500;
	            response.err = err;
	          }
	          else{
	            response.status = 200;
	            response.users = results;
	            response.rowCount = totalOfUsers;
	          }
	          return res.json(response);
	        });

	      }

		});

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

		var newUser = req.params.all();

		bcrypt.genSalt(10, function (err, salt) {
	      if(err) return next(err);
	      bcrypt.hash(newUser.password, salt, function (err, hash) {
	        if(err) return next(err);

	        newUser.password = hash;

	        User.create(newUser, function userCreated(err, user){
	          var responseObject = {};
	          //If there's an error
	          if(err){
	            responseObject = {
	              status : 500,
	              message : 'Something wrong happened',
	              error: err
	            };
	            //If error return a JSON with error details
	            return res.json(responseObject);
	          }

	          responseObject = { status : 201, user : user };

	          return res.json(responseObject);
	        });

	      });
	    });
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

