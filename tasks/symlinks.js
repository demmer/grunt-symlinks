/*
 * grunt-symlinks
 * https://github.com/cbonnissent/grunt-symlinks
 *
 * Copyright (c) 2013 Charles Bonnissent
 * Licensed under the MIT license.
 */

'use strict';

var fs = require('fs'), path = require('path');

module.exports = function(grunt) {

  var path = require('path');

  grunt.registerMultiTask('symlinks', 'Create symlink', function() {
    var kindOf = grunt.util.kindOf;

    var options = this.options({
      relativeTo: false,
      createDir : false
    });

    grunt.verbose.writeflags(options, 'Options');

    var dest;
    var isExpandedPair;
    var tally = {
      dirs: 0,
      files: 0
    };

    this.files.forEach(function(filePair) {
      isExpandedPair = filePair.orig.expand || false;

      filePair.src.forEach(function(src) {
        if (detectDestType(filePair.dest) === 'directory') {
          dest = (isExpandedPair) ? filePair.dest : unixifyPath(path.join(filePair.dest, src));
        } else {
          dest = filePair.dest;
        }
        if (options.relativeTo) {
          src = path.relative(options.relativeTo, src);
        } else {
          src = path.relative(path.dirname(dest), src);
        }
        grunt.verbose.writeln('Symlink ' + src.cyan + ' -> ' + dest.cyan);
        if (options.createDir && !grunt.file.exists(path.dirname(dest))) {
          grunt.verbose.writeln('Creating ' + path.dirname(dest).cyan);
          grunt.file.mkdir(path.dirname(dest));
          tally.dirs++;
        }
        fs.symlinkSync(src, dest, options.type || 'file');
        tally.files++;
      });
    });

    if (tally.dirs) {
      grunt.log.write('Created ' + tally.dirs.toString().cyan + ' directories');
    }

    if (tally.files) {
      grunt.log.write((tally.dirs ? ', symlink ' : 'Symlink ') + tally.files.toString().cyan + ' files');
    }

    grunt.log.writeln();
  });

  var detectDestType = function(dest) {
    if (grunt.util._.endsWith(dest, path.sep)) {
      return 'directory';
    } else {
      return 'file';
    }
  };

  var unixifyPath = function(filepath) {
    if (process.platform === 'win32') {
      return filepath.replace(/\\/g, '/');
    } else {
      return filepath;
    }
  };
};