/*
 * grunt-symlinks
 * https://github.com/cbonnissent/grunt-symlinks
 *
 * Copyright (c) 2013 Charles Bonnissent
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js',
        '<%= nodeunit.tests %>', ],
      options: {
        jshintrc: '.jshintrc',
      },
    },

    // Before generating any new files, remove any previously-created files.
    clean: {
      tests: ['tmp'],
    },

    // Configuration to be run (and then tested).
    symlinks: {

      single: {
        files: [{
          src: ['test/fixtures/single.js'],
          dest: 'tmp/'
        }],
        options: {
          createDir: true
        }
      },
      folder: {
        files: [{
          src : ['test/fixtures/folder_one'],
          dest : 'tmp/'
        }],
        options: {
          createDir: true,
          type : "dir"
        }
      },
      flatten: {
        files: [{
          expand : true,
          flatten : true,
          src : ['test/fixtures/**/*.js'],
          dest : 'tmp/'
        }],
        options: {
          createDir: true
        }
      },
      relativeTo : {
        files: [{
          expand : true,
          flatten : true,
          src: ['test/fixtures/single.js'],
          dest: 'tmp/test'
        }],
        options: {
          createDir: true,
          relativeTo : 'tmp/test'
        }
      }
    },

    // Unit tests.
    nodeunit: {
      tests: ['test/*_test.js'],
    },

  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('test', ['clean', 'symlinks', 'nodeunit']);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint', 'test']);

};