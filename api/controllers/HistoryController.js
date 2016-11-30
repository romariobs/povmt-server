/**
 * HistoryController - Build a history data for mobile application.
 *
 * Resources:
 *  * http://stackoverflow.com/questions/27371398/sails-mongo-get-result-between-two-dates
 *
 * Query Language documentation
 *   * https://github.com/balderdashy/waterline-docs/blob/master/queries/query-language.md
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
        var INDEX_NOT_FOUND = -1;

		var responseObject = {};
        var buildHistoryResponse = null;

		var start = req.param('startDate');
		var end = req.param('endDate');
		var  creator = req.param('creator');

		var startDate = new Date(start);
		var endDate	= new Date(end);

		if (!start){
			responseObject = { status : 400,  message : "Bad Request, missing startDate!"};
			return res.json(responseObject);
		}
		else if (!end){
			responseObject = { status : 400,	message : "Bad Request, missing endDate!" };
			return res.json(responseObject);
		}
		else if (!creator){
			responseObject =  { status : 400, message : "Bad Request, missing creator!"};
			return res.json(responseObject);
		}
		else if (startDate == INVALID_DATE || endDate == INVALID_DATE){
			responseObject = {	status : 400,  message : "Bad Request, Invalid date received!"};
			return res.json(responseObject);
		}
		else if (startDate.getTime() > endDate.getTime()){
      responseObject = { status : 400,  message : "Bad Request, The start the should be less than end date!" };
			return res.json(responseObject);
		}
		else {

			var query = It.find();

			var filter = { 	"createdAt" : { ">" : startDate,"<" : endDate } };

			query.where(filter).exec(function(err , its){

				if (err){
					responseObject = {	status : 500,	message : "Internal Server Error, fail executing query into history!" };
					return res.json(responseObject);
				}
				else {

          if (its.length > 0){
            var activityIds = [];

            its.forEach(function(it){
              if (activityIds.indexOf(it.investedTimeAt) == INDEX_NOT_FOUND) {
                activityIds.push(it.investedTimeAt);
              }
            });

            Activity.find({ "id" : activityIds}, function foundActivity(err, activities){

              if (err){
                responseObject = {status : 500,	message : "Internal Server Error, fail executing query into activities!"};
                return json(responseObject);
              }

              if (!activities){
                responseObject = {status : 400,	message : "Not Found, activity not found! ID's =" + activityIds.join(',') };
                return json(responseObject);
              }

              var groupedHistory = [];

              for (var i=0 ; i < activities.length; i++){
                var activityHistory = activities[i];

	                var historyItem = {};
	                var groupedIts = [];
	                for (var j=0; j < its.length; j++){
	                  var itHistory = its[j];
	                  if (itHistory.investedTimeAt == activityHistory.id){
	                    groupedIts.push(itHistory);
	                  }
	                }

                  if (activityHistory.creator == creator){
                    console.log('creator ', creator, 'activity createor ', activityHistory.creator);
	                  historyItem["activity"] = activityHistory;
	                  historyItem["its"] = groupedIts;
	                  groupedHistory.push(historyItem);
            	    }
              }
              //build the response object
              responseObject = {
                status : 200,
                creator : creator,
                startDate : start,
                endDate : end,
                history : {
                  groupedHistory : groupedHistory
                }
              };
              return res.json(responseObject);
            });

          }

				}

			});
		}

		console.log("start ", start , " end ", end , " user ", creator);

	}

};

