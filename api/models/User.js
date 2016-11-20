/*
* @copyright 2016 - Samuel T. C. Santos
*/

/**
 * User.js - A user may have many Activities.
 *
 * @description :: The person who can access the application to register Activities and IT (Invested Time).
 */

module.exports = {

  schema : true,

  attributes: {

  	name : {
  		type : 'string',
  		required : true
  	},

  	email : {
  		type : 'string',
  		email : true,
  		required : true,
  		unique: true
  	},

  	password : {
  		type : 'string'
  	},

    //Add a reference to Activity
    activities: {
      collection : 'activity',
      via : 'creator'
    },

    // We don't wan't to send back encrypted password either
    toJSON: function () {
      var obj = this.toObject();
      delete obj.password;
      return obj;
    }
	
  }
};

