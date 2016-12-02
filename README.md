# povmt-server

Web server to provide storage and Restful API for client applications, locally
on development environment we're using MySQL database and in the production
Environment we're connecting with MongoDB database.

This API provide endpoint for users, activities, invested time and history data.

Our model is organization as following:

* User has a collection of activities
* Each activity belong to single user
* An Activity has as collection of invested time
* Activity and Invested times are items for historical data.

We're using mocha and supertest to perform automated tests

## Running test cases
Only type: npm test (Still not implemented)

## Sails cli commands
- Generate api (sails generate api EntityName)

## Development change log

- 27/11/2016 Started Web Admin application
- 26/11/2016 Started historical endpoint to access old data from user activities and invested time.
- 20/11/2016 Configured new mLab account and created remote databases
- 20/11/2016 Installed sails-mongo driver
- 20/11/2016 Installed sails-mysql driver
- 20/11/2016 Integrated database locally (MySQL)
- 20/11/2016 Complete Basic REST API version 1.0
- 19/11/2016 Create new Sailjs project and sent to repository
- 18/11/2016 Started project creating repository

## Installed Libraries Front-end

- 2016/12/02 highcharts (http://www.highcharts.com/docs/getting-started/install-from-bower)
- 2016/12/02 angular-route (https://github.com/angular/bower-angular-route)
- 2016/12/02 alertifyjs (https://alertifyjs.org/)
- 2016/12/02 moment (http://momentjs.com/)
- 2016/12/02 datatables (https://datatables.net/download/bower)
- 2016/12/02 angularjs (https://angularjs.org/)
- 2016/12/02 bootstrap 4 (https://v4-alpha.getbootstrap.com/getting-started/download/)
- 2016/11/27 alertify.js (https://alertifyjs.org/#getting-started)

## Installed Libraries Backend

- sailsjs v0.12 (http://sailsjs.org/get-started)
- bcrypt (https://www.npmjs.com/package/bcrypt)
- sails-mongo (https://www.npmjs.com/package/sails-mongo)
- mocha (http://mochajs.org/)
- chaijs (http://chaijs.com/)
- q (https://www.npmjs.com/package/q)
- supertest (https://www.npmjs.com/package/supertest)
- mysql (https://www.npmjs.com/package/mysql)

## Deployment Server Address (production deploy)
- https://povmt.herokuapp.com

## Remote Databases

-  mongodb://<dbuser>:<dbpassword>@ds159237.mlab.com:59237/povmt_server_db
