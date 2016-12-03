/**
 * Copyright @ 2016 by Samuel T. C. Santos, All rights reserved.
 */

var path = require('path');

/**
 * Task to pull out specific files from bower packages.
 */
module.exports = function (grunt) {
  grunt.config.set('bower', {
    install: {
      options: {
        layout: 'byComponent',
        targetDir: './assets/resources',
        install: true,
        cleanTargetDir: false,
        cleanBowerDir: false
      }
    }
  });

  grunt.loadNpmTasks('grunt-bower-task');
};
