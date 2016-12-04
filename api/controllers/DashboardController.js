/**
 * DashboardController
 *
 * @description :: Server-side logic for managing dashboards
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  /**
   * @method DashboardController#find
   * @desc API Route from 'GET /it', to retrieve all dashboard information.
   */
  find : function(req, res){
    var responseObject = { status : 200 };

    var query = User.find();

    query.exec(function findUsers(err, users){

      if (err){
        return res.json({ status : 500, message : "Internal Server Error, fail retrieving users!"});
      }

      var appUsageInfo = [];

      var index=0;

      var getActivityUsageInfo = function(index){

        if (index < users.length) {
          var user = {name: users[index].name};

          Activity.count({creator: users[index].id}).exec(function countActivity(err, totalOfActivities) {
            if (err) {
              return res.json({status: 500, message: "Internal Server Error, fail counting activities!"});
            }
            user.activities = totalOfActivities;
            appUsageInfo.push(user);
            getActivityUsageInfo(++index);
          });

        }
        else {
          responseObject.users = appUsageInfo;
          return res.json(responseObject);
        }

      };

      getActivityUsageInfo(index);

    });

  }
};

