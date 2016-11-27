/**
 * HistoryController
 *
 * @description :: Server-side logic for managing histories
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

	/**
	* @method HistoryController#history
	* @desc Create a Response with grouped data created between a period of time be a sepecific user.
	*/
	find : function(req, res, next){

		var INVALID_DATE = "Invalid Date";
		var responseObject = {};

		var start = req.param('startDate');
		var end = req.param('endDate');
		var  creator = req.param('creator');

		var startDate = new Date(start);
		var endDate	= new Date(end);

		if (!start){
		
			responseObject = {
				status : 400,
				message : "Bed Request, missing startDate!"
			}

		}
		else if (!end){
			
			responseObject = {
				status : 400,
				message : "Bed Request, missing endDate!"
			}

		}
		else if (!creator){

			responseObject = {
				status : 400,
				message : "Bed Request, missing creator!"
			}

		}
		else if (startDate == INVALID_DATE || endDate == INVALID_DATE){
			
			responseObject = {
				status : 400,
				message : "Bed Request, Invalid date received!"
			}

		}
		else if (startDate.getTime() > endDate.getTime()){
			responseObject = {
				status : 400,
				message : "Bed Request, The start the should be less than end date!"
			}			
		}
		else {

			responseObject = {
				status : 200,
				creator : creator,
				startDate : start,
				endDate : end,
				history : []
			};

		}

		console.log("start ", start , " end ", end , " user ", creator);
		
		return res.json(responseObject);
	}	
	
};

