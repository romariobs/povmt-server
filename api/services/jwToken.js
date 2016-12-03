/*
 * @Copyright 2016 - Samuel T. C. Santos, All rights reserved.
 */

var jwt = require('jsonwebtoken');
var tokenSecret = "secretissecet";

/**
 * Service to provide Authorization by json web token.
 *
 */
// Generates a token from supplied payload
module.exports.issue = function(payload) {
  return jwt.sign(
    payload,
    tokenSecret, // Token Secret that we sign it with
    {
      expiresIn : "3 days" // Token Expire time
    }
  );
};

// Verifies token on a request
module.exports.verify = function(token, callback) {
  return jwt.verify(
    token, // The token to be verified
    tokenSecret, // Same token we used to sign
    {}, // No Option,
    callback //Pass errors or decoded token to callback
  );
};
