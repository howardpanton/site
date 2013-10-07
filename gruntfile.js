module.exports = function(grunt) {

  grunt.initConfig({
    
    pkg: grunt.file.readJSON('package.json'),
    // we store the grunt-aws.json outside of our repo so that it never gets pushed to git
    aws: grunt.file.readJSON('grunt-aws.json'), // Read the file

    aws_s3: {
      options: {
        accessKeyId: '<%= aws.AWSAccessKeyId %>', // Use the variables
        secretAccessKey: '<%= aws.AWSSecretKey %>', // You can also use env variables
        region: 'eu-west-1',
        uploadConcurrency: 5,
         // 5 simultaneous uploads
        downloadConcurrency: 5 // 5 simultaneous downloads
      },
      staging: {
        options: {
          bucket: 'ual-staging',
          differential: true, // Only uploads the files that have changed
          params: {
            ContentEncoding: 'gzip',
            CacheControl: '30000000000'  // how many days do we want to set this too?
          }
        },
        
        files: [
          {expand: true, cwd: '_site/assets/css', src: ['**'], dest: 'assets/css/', action: 'upload'},
          {expand: true, cwd: '_site/assets/js', src: ['**'], dest: 'assets/js/', action: 'upload'},
        ]
      },

      live: {
        options: {
          bucket: 'ual-live',
          differential: true, // Only uploads the files that have changed
          params: {
            ContentEncoding: 'gzip',
            CacheControl: '30000000000'  // how many days do we want to set this too?
          }
        },
        
        files: [
          {expand: true, cwd: '_site/assets/css', src: ['**'], dest: 'assets/css/', action: 'upload'},
          {expand: true, cwd: '_site/assets/js', src: ['**'], dest: 'assets/js/', action: 'upload'},
        ]
      },
    },

    invalidate_cloudfront: {
      options: {
        key: '<%= aws.AWSAccessKeyId %>',
        secret: '<%= aws.AWSSecretKey %>',
        distribution: '<%= aws.AWSDist %>'
      },
      production: {
        files: [{
          expand: true,
          cwd: 'assets/.',
          src: ['**/*'],
          filter: 'isFile',
          dest: ''
        }]
      }
    },

    invalidate_cloudfront_staging: {
      options: {
        key: '<%= aws.AWSAccessKeyId %>',
        secret: '<%= aws.AWSSecretKey %>',
        distribution: '<%= aws.AWSStage %>'
      },
      production: {
        files: [{
          expand: true,
          cwd: 'assets/.',
          src: ['**/*'],
          filter: 'isFile',
          dest: ''
        }]
      }
    },

    compass: {
      production: {
        options: {
          config: 'config_live.rb',
          force: true
        }
      },

      local: {
        options: {
          config: 'config_local.rb',
          force: true
        }
      }
    },

    jshint: {
      // define the files to lint
      files: ['assets/js/script.js'],
      // configure JSHint (documented at http://www.jshint.com/docs/)
      options: {
          // more options here if you want to override JSHint defaults
        globals: {
          jQuery: true,
          console: true,
          module: true
        }
      }
    },

    concat: {
      options: {
        separator: '',
      },

      dist: {
        src: ['assets/js/libs/fastclick.js', 'assets/js/libs/jquery.review.js', 'assets/js/libs/megamenu_plugins.js', 'assets/js/libs/megamenu.js', 'assets/js/script.js'],
        dest: 'temp/combined.js',
      },
    },

    uglify: {
      options: {
        mangle: false,  // mangle will not change/minify variable and function names
        report: 'gzip',
        // the banner that is inserted at the top of the output
        banner: '/*!Updated: <%= grunt.template.today("dd-mm-yyyy") %> */\n'
      },

      my_target: {
        files: {
          'assets/js/script-min.js': ['temp/combined.js']

        }
      }
    },

    // terminal commands to execute with grunt
    exec: {
        build: {
          cmd: 'rm -rf _site/; jekyll build --destination _site/',
        }
    },
  
    // copy /style-guide to /download folder
    copy: {
      style_guide: {
        src: '_site/style-guide',
        dest: '_site/download/style-guide/',
      },
    },

    // make a zipfile of the /downloads/ directory
    compress: {
      main: {
        options: {
          archive: 'ual-bootstrap.zip'
        },
        files: [
          {src: ['download/**'], dest: ''}
        ]
      },
      css: {
        options: {
          mode: 'gzip'
        },
        files: [
          {expand: true, src: ['_site/assets/css/*.css'], dest: '_site/assets/css/', ext: '.css'}
        ]
      },
      js: {
        options: {
          mode: 'gzip'
        },
        files: [
          {expand: true, src: ['_site/assets/js/script.js'], dest: '_site/assets/js/', ext: '.js'}
        ]
      }
    },

    // cleanup temporary files after concat and build
    clean: {
      build: {
        src: ['temp', '_site/node_modules', '_site/temp', '_site/ual-beta.sublime-workspace', '_site/package.json', '_site/gruntfile.js','_site/prod_config.rb' ]
      }


    },

    // need to setup Amazon S3 sync here https://npmjs.org/package/grunt-s3-sync
    watch: {

      sass_js: {
        files: ['assets/styles/**/*.scss','assets/js/*.js'],
        tasks: ['compass:local',
                'concat:dist',
                'uglify',
                'clean:build',
                'exec:build',
                ]

      },      
    }

  });

  // * Note
  // when running for the first time on your machine,
  // you need to run 'npm install' from inside the root /beta folder.
  // This will install all the plugins that you need for this project to your machine (see below)

  // load npmTasks as listed in package.json
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-jekyll');
  grunt.loadNpmTasks('grunt-aws-s3');
  grunt.loadNpmTasks('grunt-invalidate-cloudfront');
  grunt.loadNpmTasks('grunt-exec');
  grunt.loadNpmTasks('grunt-contrib-compress');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-bower-task');




  // Register Grunt Tasks


  // default grunt watch task
  // To run type: 'grunt' 
  grunt.registerTask('default', 'watch:sass_js');

  // test Javascript (script.js)
  // To run type: 'grunt testjs'
  grunt.registerTask('testjs', 'jshint');

  // build for production. 
  // To run type: 'grunt buildlive'
  grunt.registerTask('buildlive', ['compass:production',
                                    'concat:dist',
                                    'uglify',
                                    'compress:main',
                                    'exec:build',
                                    'clean:buildlivebuild',
                                    'compress:css',
                                    'compress:js',
                                    'aws_s3:live',
                                    'invalidate_cloudfront:production'
                                    ]);

  grunt.registerTask('buildstaging', ['compass:production',
                                    'concat:dist',
                                    'uglify',
                                    'compress:main',
                                    'exec:build',
                                    'clean:buildlivebuild',
                                    'compress:css',
                                    'compress:js',
                                    'aws_s3:staging',
                                    'invalidate_cloudfront:staging'
                                    ]);

  // build for local github 
  // To run type: 'grunt buildlocal'
  grunt.registerTask('buildlocal', ['jshint',
                                    'compass:local',
                                    'exec:build',
                                    'clean:build'
                                    ]);


  // grunt task to push to gitHub 



  // invalidate cloudfront -- we might want to keep this as a separate step?
  grunt.registerTask('invalidateCloudFront', 'invalidate_cloudfront:production');

};