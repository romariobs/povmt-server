/**
 * Activity.js - An activity may only belong to a single User
 *
 * @description :: An activity is any task performed by user during the week.
 */

module.exports = {

  attributes: {

  	title : {
  		type : 'string'
  	},

  	description : {
  		type : 'string'
  	},

  	//Add a reference to User
  	creator : {
  		model : 'user'
  	}

  }
};

