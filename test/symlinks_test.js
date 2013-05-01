var grunt = require('grunt');
var fs = require('fs');

exports.symlink = {
  single: function(test) {
    'use strict';

    test.expect(1);

    var actual = grunt.file.read('tmp/test/fixtures/single.js');
    var expected = grunt.file.read('test/fixtures/single.js');
    test.equal(expected, actual, 'should allow for a single file symlink to be created');

    test.done();
  },
  directory: function(test) {
    'use strict';

    test.expect(1);

    var actual = fs.readdirSync('tmp/test/fixtures/folder_one').sort();
    var expected = fs.readdirSync('test/fixtures/folder_one').sort();
    test.deepEqual(expected, actual, 'should allow for a directory symlink to be created');

    test.done();
  },
  flatten: function(test) {
    'use strict';

    test.expect(2);

    var single = grunt.file.read('tmp/single.js');
    var singleExpected = grunt.file.read('test/fixtures/single.js');
    var one = grunt.file.read('tmp/one.js');
    var oneExpected = grunt.file.read('test/fixtures/folder_one/one.js');
    test.equal(single, singleExpected, 'should allow for a single file symlink to be created');
    test.equal(one, oneExpected, 'should allow for a single file symlink to be created');

    test.done();
  },
  relativeTo: function(test) {
    'use strict';

    test.expect(1);

    var actual = grunt.file.read('tmp/single.js');
    var expected = grunt.file.read('test/fixtures/single.js');
    test.equal(expected, actual, 'should allow for a single file symlink to be created');

    test.done();
  },
};
