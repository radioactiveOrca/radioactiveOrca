module.exports = function(grunt) {
  // Project config
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    nodemon: {
      dev: {
        script: "./server/server.js"
      }
    },

    jshint: {
      files: [
        './*.js',
        './client/App/**/*.js',
        './server/**/*.js',
        './test/**/*.js'
      ]
    },

    mochaTest: {
      test: {
        options: {
          reporter: 'spec'
        },
        src: ['./test/server/*.js']
      }
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

    watch: {
      scripts: {
        files: [
          './client/App/**/*.js',
          './server/**/*.js'
        ],
        tasks: [
          'jshint',
          'concat',
          'uglify'
        ]
      }
    },

    // karma: {
    //   unit: {
    //     configFile: './test/karma.conf.js'
    //   }
    // },

    shell: {
      prodServer: {
        command: 'git push heroku master',
        options: {
          stdout: true,
          strerr: true,
          failOnError: true
        }
      }
    }

    // Protractor tests
    // TODO
  });


  // Load plugins
  grunt.loadNpmTasks('grunt-notify'); // notifies via OS X Notification system
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-mocha-test');
  // grunt.loadNpmTasks('grunt-karma');
  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-nodemon');

  //////////////////
  // Declare Tasks
  //////////////////

  // Development Server
  grunt.registerTask('server-dev', function (target) {
    // Running nodejs in a different process and displaying output on the main console
    var nodemon = grunt.util.spawn({
         cmd: 'grunt',
         grunt: true,
         args: 'nodemon'
    });
    nodemon.stdout.pipe(process.stdout);
    nodemon.stderr.pipe(process.stderr);

    grunt.task.run([ 'watch' ]);
  });

  grunt.registerTask('test', [
    'jshint',
    'mochaTest'
    ]);

  grunt.registerTask('build', [
    'concat',
    'uglify'
    ]);

  grunt.registerTask('deploy', [
    'test',
    'build',
    'upload'
    ]);

  grunt.registerTask('upload', function(n) {
    if(grunt.option('prod')) {
      // grunt upload -prod will run the following
      grunt.task.run([ 'shell' ]);
    } else {
      grunt.task.run([ 'server-dev' ]);
    }
  });

  grunt.registerTask('default', ['server-dev']);
};