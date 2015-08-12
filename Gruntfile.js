module.exports = function(grunt) {
  // Project config
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    jshint: {
      files: [
        './*.js',
        './client/App/**/*.js',
        './server/**/*.js'
      ]
    },

    concat: {
      dist: {
        src: ['./client/App/**/*.js'],
        dest: './client/build/scripts/moviedash.js'
      }
    },

    uglify: {
      targets: {
        files: {
          // syntax: dest : [src files]
          './client/build/scripts/moviedash.min.js' : ['./client/build/scripts/moviedash.js']
        }
      }
    },


    karma: {
      unit: {
        configFile: './test/karma.conf.js'
      }
    }

    // Protractor tests
  });


  // Load plugins
  grunt.loadNpmTasks('grunt-notify'); // notifies via OS X Notification system
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-karma');

  ////////////////
  // Declare Tasks
  ////////////////

  grunt.registerTask('test', ['jshint']);

  grunt.registerTask('build', [
    'test',
    'concat',
    'uglify'
    ]);

  grunt.registerTask('deploy', [
    'build'
    ]);

  grunt.registerTask('default', ['test', 'build']);
};