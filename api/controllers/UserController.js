/*
* @Copyright 2016 - Samuel T. C. Santos, All rights reserved.
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

		var responseObject = {};

		User.findOne( req.param('id'), function foundUser(err, user){

			if (err){
				responseObject = {
					status : 500,
					message : "error search user with id " + req.param('id'),
					error : err
				}
				return res.json(responseObject);
			}

			if (!user){
				responseObject = {
					status : 404,
					message : "User doesn\'t exist."
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

	          responseObject = { status : 201, user : user,  token: jwToken.issue({id: user.id}) };

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
    	var responseObject = {};

    	User.findOne(req.param('id'), function foundUser(err, user){

 	       if (err){
	        responseObject  = {
	          status : 500,
	          message : 'Something wrong happened',
	          error : err
	        };
	        return res.json(responseObject);
	      }

	      if (!user){
	        responseObject = {
	          status : 404,
	          message : 'User doesn\'t exist.'
	        }
	        return res.json(responseObject);
	      }

	      User.update(req.param('id'), req.params.all(), function userUpdated(err){
		      if(err){

		        responseObject = {
		          status : 500,
		          message : "Error updating account",
		          err : err
		        };
		        return res.json(responseObject);
		      }

		      responseObject = {
		        status :  200,
		        message : "Account updated successfully."
		      };

		      return res.json(responseObject);
		    });

		});

	},

	/**
	* @method UseController#delete
	* @desc API Route from 'DELETE /user/:id', to delete a specific user.
	*/
	destroy : function(req, res){
		var responseObject = {};

	    User.findOne(req.param('id'), function foundUser(err, user){

	      if (err){
	        responseObject  = {
	          status : 500,
	          message : 'Something wrong happened',
	          error : err
	        };
	        return res.json(responseObject);
	      }

	      if (!user){
	        responseObject = {
	          status : 404,
	          message : 'User doesn\'t exist.'
	        }
	        return res.json(responseObject);
	      }


	      User.destroy(req.param('id'), function userDestroyed(err){
	        if (err){
	          responseObject  = {
	            status : 500,
	            message : 'Error deleting account',
	            error : err
	          };
	        }
	        else {
	          responseObject  = {
	            status : 200,
	            message : 'Account deleted successfully.'
	          };
	        }

	        return res.json(responseObject);
	      });

	    });
	},

	/**
	* @method UseController#auth
	* @desc API Route from 'POST /user/auth', to authenticate an user.
	*/
	auth : function(req, res, next){

		var responseObject = {};

	    //Check for email and password in params sent via the request
	    if (!req.param('email') || !req.param('password')){
	      responseObject = {
	        status : 400,
	        message : "You must enter both a email and password."
	      };

	      return res.json(responseObject);
	    }

	    //Try to find the user by there email address
	    User.findOne( { email : req.param('email') } ).exec(function(err, user){

	      if (err) {
	        responseObject = {
	          status : 500,
	          message : "Error finding account",
	          error : error
	        };
	        return res.json(responseObject);
	      }

	      //if no user is found...
	      if (!user){
	        responseObject = {
	          status : 404,
	          message : 'The email address ' + req.param('email') + ' not found.'
	        };
	        return res.json(responseObject);
	      }

	      bcrypt.compare(req.param('password'), user.password, function (err, match) {

	        if(err){
	          responseObject = {
	            status : 500,
	            message : 'Password decryption error.',
	            error : err
	          }
	        }

	        if(match) {
	          responseObject = {
	            status : 200,
	            user : user,
              token: jwToken.issue({id : user.id })
	          };

	        } else {
	          responseObject = {
	            status : 401,
	            message : 'Unauthorized, Invalid email and password combination.'
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

    var userId = req.param('userId');

    if (!userId){
      return res.json({ status : 400, message : "Bad Request, missing parameter usedId!"});
    }

    uploadFile.upload(function onUploadComplete(err, files){
      // Files will be uploaded to .tmp/uploads
      if (err) {
        return res.serverError(err);
      }

      //Upload image to Cloudinary server
      cloudinary.uploader.upload(files[0].fd, function(result){

        User.findOne(userId, function foundUser(err, user){

          if (err){
            return res.json({ status : 500, message : "Server Internal Error, problems searching user!"});
          }

          if (!user){
            return res.json({ status : 404, message : "Not Found, user not found id =" + userId });
          }

          user.picture = result.url;

          User.update(userId, user , function updatedUserPicture(err){

            if (err) {
              return res.json({ status : 500, message : "Internal Server Error, fail to update user!" });
            }

            return res.json({status : 200, user: user });
          });
        });
      });

    });

  }


};

