# grunt-symlinks

> Create symlinks

## Getting Started
This plugin requires Grunt `~0.4.1`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-symlinks --save-dev
```

One the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-symlinks');
```

## The "symlinks" task

### Overview
In your project's Gruntfile, add a section named `symlinks` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  symlinks: {
    options: {
      'createDir' : true,
      'relativeTo' : 'path/to',
      'type' : 'file'
    },
    createLinks: {
      files : [{
        expand : true,
        flatten : true,
        src : ['test/fixtures/**/*.js'],
        dest : 'tmp/'
      }]
    },
  },
})
```

### Options

#### options.createDir
Type: `Boolean`
Default value: `False`

A boolean indicate if the dir are auto created or not

#### options.relativeTo
Type: `String`
Default value: `''`

A path from where the symbolic links are relatives

#### options.type
Type: `String`
Default value: `'dir|file'`


To specifically set the type of symlink to be created, default type will be inferred from
the target type. Values can be 'dir', 'file', or 'junction'. see [node.js - fs][node_symlink] for more info

### Usage Examples

#### Default Options

```js
grunt.initConfig({
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
    }
})
```

Single : create in a single file with all the path 
Folder : create a link to a folder
Flatten : create links flatten

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
1.0 : first version

[node_symlink]: http://nodejs.org/api/fs.html#fs_fs_symlink_srcpath_dstpath_type_callback