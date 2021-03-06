/**
 * Activity.js - An activity may only belong to a single User
 *
 * An Activity may have many its (Invested times)
 *
 * @description :: An activity is any task performed by user during the week.
 */

module.exports = {

  schema : true,

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
  	},

    //LOW, MEDIUM, HIGH
    priority : {
      type : 'string'
    },

    category : {
      type : 'string'
    },

    // Add a reference to It
    its : {
      collection : 'it',
      via : 'investedTimeAt'
    }


  }
};

