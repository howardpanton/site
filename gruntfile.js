module.exports = function(grunt) {
require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);
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

      live: {
        options: {
          bucket: 'arts-live',
          differential: true, // Only uploads the files that have changed
          params: {
            ContentEncoding: 'gzip',
            CacheControl: '30000000000'  // how many days do we want to set this too?
          }
        },
        
      files: [
        {expand: true, cwd: '_site/assets/img/bx-slider', src: ['**'], dest: 'assets/img/bx-slider', action: 'upload'},
        {expand: true, cwd: '_site/assets/img/logos', src: ['**'], dest: 'assets/img/logos', action: 'upload'},
        {expand: true, cwd: '_site/assets/img/mediaelement', src: ['**'], dest: 'assets/img/mediaelement', action: 'upload'},
        {expand: true, cwd: '_site/assets/img/royalslider', src: ['**'], dest: 'assets/img/royalslider', action: 'upload'},
        {expand: true, cwd: '_site/assets/img/sprite', src: ['**'], dest: 'assets/img/sprite', action: 'upload'},
        {expand: true, cwd: '_site/assets/img/svg', src: ['**'], dest: 'assets/img/svg', action: 'upload'},
        {expand: true, cwd: '_site/assets/css', src: ['**'], dest: 'assets/css/', action: 'upload'},
        {expand: true, cwd: '_site/assets/js', src: ['t4/script.js'], dest: 'assets/js/', action: 'upload'},
      ]
      },
      staging: {
        options: {
          bucket: 'arts-staging',
          differential: true, // Only uploads the files that have changed
          params: {
            ContentEncoding: 'gzip',
            CacheControl: '30000000000'  // how many days do we want to set this too?
          }
        },
        
      files: [
        {expand: true, cwd: '_site/assets/img/bx-slider', src: ['**'], dest: 'assets/img/bx-slider', action: 'upload'},
        {expand: true, cwd: '_site/assets/img/logos', src: ['**'], dest: 'assets/img/logos', action: 'upload'},
        {expand: true, cwd: '_site/assets/img/mediaelement', src: ['**'], dest: 'assets/img/mediaelement', action: 'upload'},
        {expand: true, cwd: '_site/assets/img/royalslider', src: ['**'], dest: 'assets/img/royalslider', action: 'upload'},
        {expand: true, cwd: '_site/assets/img/sprite', src: ['**'], dest: 'assets/img/sprite', action: 'upload'},
        {expand: true, cwd: '_site/assets/img/svg', src: ['**'], dest: 'assets/img/svg', action: 'upload'},
        {expand: true, cwd: '_site/assets/css', src: ['**'], dest: 'assets/css/', action: 'upload'},
        // {expand: true, cwd: '_site/assets/js', src: ['script.js'], dest: 'assets/js/t4/', action: 'upload'},
        {expand: true, cwd: '_site/assets/js', src: ['script-min.js'], dest: 'assets/js/t4/', action: 'upload'},
      ]
      },
    },

    // invalidate cloudfront (clear cache) 
    cloudfront_clear: {
      invalidateIndex: {
        // resourcePaths: ["/assets/css/screen.css", "/assets/js/t4/script.js", ],
        // resourcePaths: ["/assets/css/screen.css", "/assets/js/t4/script.js", "/assets/js/script.js", "/assets/js/t4/script-expanded.js", ],
        resourcePaths: ["/assets/css/**/*.*", "/assets/js/t4/*.js", "/assets/js/*.js" ],
        secret_key: "<%= aws.AWSSecretKey %>",
        access_key: "<%= aws.AWSAccessKeyId %>",
        dist: "<%= aws.AWSStaging %>"
        // dist: "<%= aws.AWSLive %>"
      }
      
    },
    
    compass: {
      production: {
        options: {
          config: 'config_live.rb',
          force: true
        }
      },
      staging: {
        options: {
          config: 'config_staging.rb',
          force: true
        }
      },

      local: {
        options: {
          config: 'config.rb',
          force: true
        }
      }
    },

    // Jekyl task to watch files (uses _config_local.yml)
    jekyll: {                             // Task
        options: {                          // Universal options
            src : '<%= app %>'
        },
        dist: {                             // Target
          options: {                        // Target options
            dest: '<%= dist %>',
            config: '_config_local.yml',
            watch: true 
          }
        },
    },

    jshint: {
      // define the files to lint
      files: ['_site/assets/js/script.js'],
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

    htmlhint: {
      build: {
          options: {
              'tag-pair': true,
              'tagname-lowercase': true,
              'attr-lowercase': true,
              'attr-value-double-quotes': true,
              'doctype-first': true,
              'spec-char-escape': true,
              'id-unique': true,
              'head-script-disabled': true,
              'style-disabled': true
          },
          src: ['_site/tests/*.html']
      }
    },

    csslint: {
      strict: {
        options: {
          import: 2
        },
        src: ['_site/assets/css/*.css']
      },
      lax: {
        options: {
          import: false
        },
        src: ['_site/assets/css/*.css']
      }
    },

    // minify css & and add banner at the top of the file to show the last update
    cssmin: {
      minify: {
        expand: true,
        cwd: '_site/assets/css/',
        src: ['*.css', '!*.min.css'],
        dest: '_site/assets/css/',
        ext: '.css',
        options: {
          banner: '/* Updated: <%= grunt.template.today("dd-mm-yyyy, h:MM:ss TT") %> */',
          report: 'gzip'
        },
      }
    },

    // task that prompts and requests an input from user
    prompt: {

      ask_build_type: {
        options: {
          questions: [
            {
              config: 'buildtype',
              type: 'list',
              message: '\n\nUAL Website Build Task \nSelect build type:',
              default: 'local', // default value if nothing is entered
              choices: ['local','staging','live']
            }
          ]
        }
      },

      confirm_live_build: {
        options: {
          questions: [
            {
              config: 'optionselected', // this is the name the boolean answer is stored in
              type: 'confirm',
              message: 'Are you sure you want to BUILD and UPLOAD asset files to the ** LIVE UAL bucket **?\n(this will affect the live website)',
              default: false
            }
          ]
        }
      },

      confirm_staging_build: {
        options: {
          questions: [
            {
              config: 'optionselected', // this is the name the boolean answer is stored in
              type: 'confirm',
              message: 'BUILD and UPLOAD asset files to ** STAGING bucket ** ?',
              default: false
            }
          ]
        }
      }
    },


    // Task to concatenate script files 
    // - files will be combined starting with the first file in the list
    concat: {
      options: {
        separator: '',
      },
      dist: {
        src: ['assets/js/libs/fastclick.js', 'assets/js/libs/jquery.review.js', 'assets/js/libs/hoverintent.js','assets/js/libs/hammer.js', 'assets/js/libs/megamenu.js', 'assets/js/script.js'],
        dest: 'temp/js/combined.js',
      },
    },

    uglify: {
      options: {
        mangle: false,  // mangle will not change/minify variable and function names
        // the banner that is inserted at the top of the output
        banner: '/*!Updated: <%= grunt.template.today("dd-mm-yyyy, h:MM:ss TT") %> */\n'
      },

      my_target: {
        files: {
          'assets/js/script-min.js': ['temp/js/combined.js']
        }
      },

    },

    // terminal commands to execute with grunt
    exec: {
        buildlive: {
          cmd: 'rm -rf _site/; jekyll build --destination _site/ --config _config_live.yml',
        },
        buildstaging: {
          cmd: 'rm -rf _site/; jekyll build --destination _site/ --config _config_staging.yml',
        },
        buildlocal: {
          cmd: 'rm -rf _site/; jekyll build --destination _site/ --config _config.yml',
        },
        version: {
          cmd: 'mv _site/assets/css/screen.css  _site/assets/css/screen.css?version=$(date +"%Y%m%d%H%M"); mv _site/assets/js/script.js  _site/assets/js/script.js?version=$(date +"%Y%m%d%H%M"); rm -rf _site/assets/css/screen.css; rm -rf  _site/assets/js/script.js',
        },
        compasswatch: {
          cmd: 'compass watch',
        },
        jekyllwatch: {
          cmd: 'jekyll build -w',
        }
    },
  
    // copy /style-guide to /download folder
    copy: {
      style_guide: {
        src: '_site/style-guide',
        dest: '_site/download/style-guide/',
      },

      minified_assets: {
        files: [
          {expand: true, flatten: true, src: ['temp/js/**'], dest: '_site/assets/js/', filter: 'isFile'},
          {expand: true, flatten: true, src: ['temp/js/t4/**'], dest: '_site/assets/js/', filter: 'isFile'}, // flattens results to a single level
          {expand: true, flatten: true, src: ['temp/css/**'], dest: '_site/assets/css/', filter: 'isFile'}
        ]
      },

      minified_fonts: {
        files: [
          {expand: true, flatten: true, src: ['temp/fonts/**'], dest: '_site/assets/fonts/', filter: 'isFile'}
        ]
      }
    },

    compress: {
      main: {
        options: {
          archive: 'ual-bootstrap.zip'
        },
        files: [
          {src: ['download/**'], dest: ''}
        ]
      },

      js: {
        options: {
          mode: 'gzip'
        },
        files: [
          {expand: true, flatten: true, src: ['_site/assets/js/script-min.js'], dest: 'temp/js/', ext: '.js'}
          // {expand: true, flatten: true, src: ['temp/js/combined.js'], dest: 'temp/js/', ext: '.js'}
        ]
      },

      css: {
        options: {
          mode: 'gzip'
        },
        files: [
          {expand: true, flatten: true, src: ['_site/assets/css/*.css'], dest: 'temp/css/', ext: '.css'}
        ]
      },

      fonts: {
        options: {
          mode: 'gzip'
        },
        files: [
          {expand: true, flatten: true, src: ['_site/assets/fonts/*.eot'], dest: 'temp/fonts/', ext: '.eot'},
          {expand: true, flatten: true, src: ['_site/assets/fonts/*.svg'], dest: 'temp/fonts/', ext: '.svg'},
          {expand: true, flatten: true, src: ['_site/assets/fonts/*.ttf'], dest: 'temp/fonts/', ext: '.ttf'},
          {expand: true, flatten: true, src: ['_site/assets/fonts/*.woff'], dest: 'temp/fonts/', ext: '.woff'}
        ]
      }
    },

    asciify: {
      banner:{
        text: 'artsdevlondon',

        // Add the awesome to the console, and use the best font.
        options:{
          font:'banner3',
          log:true
        }
      }
    },

    // cleanup temporary files after concat and build
    clean: {
      build: {
        src: ['temp', '_site/node_modules', '_site/temp', '_site/ual-beta.sublime-workspace', '_site/package.json', '_site/gruntfile.js','_site/prod_config.rb']
      }
    },
    
    // watch files and run compass and jekyll build if files are changed
    watch: {
      
      scripts: {
        files: ['assets/styles/**/*.scss'],
        tasks: ['compass:local'],
        options: {
          debounceDelay: 250,
          spawn: false,
          interrupt: true,
        },
      },

      sass: {
        files: ['assets/styles/**/*.scss'],
        tasks: ['compass:local'],
      },

      jekyll: {
        files: ['*.html'],
        tasks: ['jekyll'],
      },
     
    },
   

    concurrent: {
      options: {
        logConcurrentOutput: true
      },
      watchlocal: {
        tasks: ['watch:jekyll']
      }
      // dev: {
      //   tasks: ["watch:B", "watch:C"]
      // }
    }

  });

  // * Note
  // when running for the first time on your machine,
  // you need to run 'npm install' from inside the root /beta folder.
  // This will install all the plugins that you need for this project to your machine (see below)

  // Register Grunt Tasks

  // default grunt watch task
  // To run type: 'grunt' or 'grunt watch'
  grunt.registerTask('default', 'watch');

  grunt.registerTask('watch', 'concurrent:watchlocal');

  // test Javascript (script.js)
  // To run type: 'grunt testjs'
  grunt.registerTask('testjs', 'newer:jshint');


  grunt.registerTask('testHTML', 'htmlhint');


  // compress script libraries
  grunt.registerTask('compress_libs', 'compress:libs');

  // 
  grunt.registerTask('build', [ 'asciify',
                                'prompt:ask_build_type',
                                'handle_build_type'
                              ]);

  grunt.registerTask('buildlive', [ 'prompt:confirm_live_build', 'confirm_live_build'] ); 
                                    
  // Do live build
  grunt.registerTask('go_build_live', [ 'compass:production',
                                        'concat:dist',
                                        'any-newer:uglify',
                                        'compress:main',
                                        'exec:buildlive',
                                        'cssmin:minify',
                                        'compress:css',
                                        'compress:js',
                                        'copy:minified_assets',
                                        'clean:build',
                                        'any-newer:aws_s3:live',
                                        'cloudfront_clear'
                                      ]);
  // build staging tasks
  grunt.registerTask('buildstaging', ['prompt:confirm_staging_build', 'confirm_staging_build']);

  grunt.registerTask('go_build_staging', [ 'compass:staging',
                                          'concat:dist',
                                           'any-newer:uglify',
                                          'compress:main',
                                          'exec:buildstaging',
                                          'cssmin:minify',
                                          'compress:css',
                                          'compress:js',
                                          'copy:minified_assets',
                                          'clean:build',
                                          'any-newer:aws_s3:staging',
                                          'cloudfront_clear' ]);

  // build for local github 
  // To run type: 'grunt buildlocal'
  grunt.registerTask('buildlocal', [ 'compass:local',
                                     'exec:buildlocal',
                                     //'newer:jshint'
                                    ]);

  // combine script assets
  grunt.registerTask('concat_js', ['concat:dist']);

 
  grunt.registerTask('handle_build_type', 'runs build task based on the option user selects', function() {
    
    var buildtype = grunt.config('buildtype');
    switch (buildtype) {
      case 'local':
        grunt.log.writeln('Building files for local testing in GitHub....');
        grunt.task.run(['buildlocal']);
        break;
      case 'staging':
        grunt.task.run('buildstaging');
        break;
      case 'live':
        // grunt.task.run('buildlive');
        grunt.log.writeln('We haven\'t tested this yet... try build staging first');
        grunt.task.run(['build']);  // go back to question prompt
        break;
      default:
        grunt.task.run(['buildlocal']);
        break;
    }

  });

  grunt.registerTask('confirm_staging_build', 'Build runs if user selected YES from the prompt task', function() {
    
    var buildconfirmed = grunt.config('optionselected');  // get boolean value user selected from prompt:confirm_staging_build task
    if (buildconfirmed) {
         grunt.log.writeln('you selected YES... \n Building & uploading to staging bucket...');
         grunt.task.run(['go_build_staging']);
    }
    else {
       grunt.log.writeln('You selected NO..... Exiting without making changes.');
    }
  
  });

  
  grunt.registerTask('confirm_live_build', 'Build only runs if user selected YES from the prompt task', function() {

    var buildconfirmed = grunt.config('optionselected');  // get boolean value user selected from prompt:confirm_live_build task
    if (buildconfirmed) {
         grunt.log.writeln('you selected YES... \n Now building and uploading to artslive bucket...');
         grunt.task.run(['go_build_live']);
    }
    else {
       grunt.log.writeln('You selected NO..... Exiting without making changes.');
    }
   
  });

};