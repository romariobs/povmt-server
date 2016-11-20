# povmt-server

Web server to provide storage and Restful API for client applications, locally
on development environment we're using MySQL database and in the production 
Environment we're connectiong with MongoDB database.

We're using mocha and supertest to perform automated tests 


## Creating the user database and grant permissions
- CREATE USER 'povmt'@'localhost' IDENTIFIED BY 'povmt';
- GRANT ALL PRIVILEGES ON * . * TO 'povmt'@'localhost';
- CREATE DATABASE povmt_server_db;

## Running test cases
Only type: npm test

## Sails cli commands
- Generate api (sails generate api EntityName)

## Development change log

- 19/11/2016 Create new Sailjs project and sent to repository
- 18/11/2016 Started project creating repository

## Installed Libraries

- sailsjs v0.12 (http://sailsjs.org/get-started) 
- bcrypt (https://www.npmjs.com/package/bcrypt)
- sails-mongo (https://www.npmjs.com/package/sails-mongo)
- mocha (http://mochajs.org/)
- chaijs (http://chaijs.com/)
- q (https://www.npmjs.com/package/q)
- supertest (https://www.npmjs.com/package/supertest)
- mysql (https://www.npmjs.com/package/mysql)
