# povmt-server

Web server to provide storage and Restful API for client applications, locally
on development environment we're using MySQL database and in the production
Environment we're connectiong with MongoDB database.

We're using mocha and supertest to perform automated tests


## Creating the user database and grant permissions (MySQL Running Locally)

- CREATE USER 'povmt'@'localhost' IDENTIFIED BY 'povmt';
- GRANT ALL PRIVILEGES ON * . * TO 'povmt'@'localhost';
- CREATE DATABASE povmt_server_db;

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

- 27/11/2016 alertify.js (https://alertifyjs.org/#getting-started)

## Installed Libraries Backend

- sailsjs v0.12 (http://sailsjs.org/get-started)
- bcrypt (https://www.npmjs.com/package/bcrypt)
- sails-mongo (https://www.npmjs.com/package/sails-mongo)
- mocha (http://mochajs.org/)
- chaijs (http://chaijs.com/)
- q (https://www.npmjs.com/package/q)
- supertest (https://www.npmjs.com/package/supertest)
- mysql (https://www.npmjs.com/package/mysql)

## Deployment Server Address
-

## Remote Databases

-  mongodb://<dbuser>:<dbpassword>@ds159237.mlab.com:59237/povmt_server_db
