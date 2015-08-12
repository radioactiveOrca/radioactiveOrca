module.exports = function(grunt) {
  // Project config
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    jshint: {
      files: [
        './client/App/**/*.js'
      ]
    }

    // uglify

    // concat

    // Karma tests

    // Protractor tests
  });


  // Load plugins
  grunt.loadNpmTasks('grunt-notify'); // notifies via OS X Notification system
  grunt.loadNpmTasks('grunt-contrib-jshint');

  // Declare Tasks
  grunt.registerTask('test', ['jshint']);

  // grunt.registerTask('build', ['test']);

  grunt.registerTask('default', ['test']);
};