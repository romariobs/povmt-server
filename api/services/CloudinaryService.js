/*
 * @Copyright 2016 - Samuel T. C. Santos, All rights reserved.
 */

var cloudinary = require('cloudinary');

/**
 * @author Samuel Santos
 *
 * @desc Service to provide integration to Cloudinary web service for host images.
 */
var CloudinaryService = {

  getInstance : function(){

    cloudinary.config({
      cloud_name : "dbynf4glv",
      api_key : "922718168294712",
      api_secret: "DUPz7sz_y9ITwYEFUfeY_nqKpLw"
    });

    return cloudinary;
  }

};

module.exports = CloudinaryService;
