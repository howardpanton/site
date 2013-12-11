// *--------------------------------------------*\
//      ARTSLONDONDEV
//      Grunt File
//
//      Updated: Friday 29 November 2013 17:00
//
// *--------------------------------------------*/


'use strict';
var LIVERELOAD_PORT = 35729;
var lrSnippet = require('connect-livereload')({port: LIVERELOAD_PORT});
var mountFolder = function (connect, dir) {
    return connect.static(require('path').resolve(dir));
};

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to match all subfolders:
// 'test/spec/**/*.js'

module.exports = function (grunt) {

    // show elapsed time at the end
    require('time-grunt')(grunt);

    // load all grunt tasks
    require('load-grunt-tasks')(grunt);

    // configurable paths,
    var ualConfig = {
        app: '_site',
        dist: '_site'
    };

    grunt.initConfig({

        //  We store our AWS connection settings in a grunt-aws.json file which is
        //  listed in the .gitignore file so that it never gets pushed to GitHub
        aws: grunt.file.readJSON('grunt-aws.json'),

        ual: ualConfig,


        // *---------------------------------------------------------------*\
        //  watch : a grunt plugin to watch files for changes and
        //          then run a task after a change is detected
        // *---------------------------------------------------------------*/
        watch: {

            // compass watch
            sass: {
                files: ['assets/styles/**/*.scss',  '!node_modules'],
                tasks: ['compass:local']
            },
            // jekyll watch
            jekyll: {
                files: ['*.html', '*.md', '!node_modules'],
                tasks: ['jekyll']
            },

            // files to watch for livereload
            // set to our _site folder so it picks up compiled file changes after sass and jekyll have run
            livereload: {
                options: {
                    livereload: '<%= connect.options.livereload %>',
                    vent: ['changed'],
                     debounceDelay: 4000
                },
                files: [
                    '_site/index.html'
                ]
            }
        },

        // *---------------------------------------------------------------*\
        //  connect : grunt-contrib-connect plugin
        //            Starts a grunt server to preview files in the browser
        // *---------------------------------------------------------------*/
        connect: {

            options: {
                port: 9000,
                // change this to '0.0.0.0' to access the server from outside
                hostname: 'localhost'
            },

            // the livereload task puts script at the bottom of each file to handle the livereloading in the browser
            // it uses the lrSnippet settings which we set at the top of this file.
            livereload: {
                options: {
                    middleware: function (connect) {
                        return [
                            lrSnippet,
                            mountFolder(connect, ualConfig.app)
                        ];
                    }
                }
            },
        },

        open: {
            server: {
                path: 'http://localhost:<%= connect.options.port %>'
            }
        },




        // *---------------------------------------------------------------*\
        //  aws_s3 :  uploads files to amazonS3
        // *---------------------------------------------------------------*/
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
                        CacheControl: '30000000000'
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
                    {expand: true, cwd: '_site/assets/js', src: ['script-min.js'], dest: 'assets/js/t4/', action: 'upload'},
                ]
            },
            staging: {
                options: {
                    bucket: 'arts-staging',
                    differential: true, // Only uploads the files that have changed
                    params: {
                        ContentEncoding: 'gzip',
                        CacheControl: '30000000000'
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
                    {expand: true, cwd: '_site/assets/js', src: ['script-min.js'], dest: 'assets/js/t4/', action: 'upload'},
                ]
            },
        },


    // *---------------------------------------------------------------*\
    //  Invalidate cloudfront:  (clear cache on ual-live bucket)
    //                      - this runs at the end of the buildlive task
    // *---------------------------------------------------------------*/
    cloudfront_clear: {
        invalidateIndex: {
            resourcePaths: ["/assets/css/**/*.*", "/assets/js/t4/*.js", "/assets/js/*.js" ],
            secret_key: "<%= aws.AWSSecretKey %>",
            access_key: "<%= aws.AWSAccessKeyId %>",
            dist: "<%= aws.AWSLive %>"
        }

    },

    // *---------------------------------------------------------------*\
    //  Compass:  (grunt-contrib-compass plugin)
    //            This task uses different compass config files for each build type
    //            to set correct file paths in css
    // *---------------------------------------------------------------*\
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

    // Jekyll task to watch files (uses _config_local.yml)
    jekyll: {                             // Task
        options: {                          // Universal options
            src : '<%= app %>'
        },
        dist: {                             // Target
          options: {                        // Target options
            dest: '<%= dist %>',
            config: '_config.yml',
            exlude: ['Gemfile', 'node_modules', 'temp', 'grunt-aws.json', 'styles', 'config.rb', 'config_live.rb', 'config_local.rb', 'config_staging.rb', 'gruntfile.js', 'package.json', 'Gemfile.lock', 'Guardfile', 'README.md', 'Rakefile', 'old_gruntfile'],
            watch: true
          }
        },
    },





    // *---------------------------------------------------------------*\
    //  cssmin : minify css & and add a banner at the top of the file to show when last updated
    // *---------------------------------------------------------------*/
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





    // *---------------------------------------------------------------*\
    //  Prompt : (grunt-prompt plugin)
    //           Task that prompts and requests an input from user,
    //           then executes tasks based on what the user selected.
    // *---------------------------------------------------------------*/
    prompt: {

      ask_build_type: {
        options: {
          questions: [
            {
              config: 'buildtype',
              type: 'list',
              message: '\n\nUAL Website Build Task \nSelect build type:',
              default: 'local',
              choices: ['local','staging','live']
            }
          ]
        }
      },

      confirm_live_build: {
        options: {
          questions: [
            {
              config: 'optionselected',
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
              config: 'optionselected',
              type: 'confirm',
              message: 'BUILD and UPLOAD asset files to ** STAGING bucket ** ?',
              default: false
            }
          ]
        }
      }
    },

    // *---------------------------------------------------------------*\
    //  concat : A task to comobine script files into one file.
    //           we use this to combine our scripts into one script file (combined.js) -
    //           This file then gets minified, compressed and renamed to script-min.js with other tasks (see compress & uglify tasks)
    // *---------------------------------------------------------------*/

    concat: {
      options: {
        separator: '',
      },
      dist: {
        src: ['assets/js/libs/fastclick.js', 'assets/js/libs/jquery.review.js', 'assets/js/libs/hoverintent.js','assets/js/libs/hammer.js', 'assets/js/libs/megamenu.js', 'assets/js/script.js'],
        dest: 'temp/js/combined.js',
      },
    },


    // *--------------------------------------------------------------------------------------------------*\
    //  Uglify: (Grunt-contrib-uglify plugin)
    //
    //          We use this task to minify js, rename combined.js to script-min.js
    //          and add a banner to show when last updated.
    // *--------------------------------------------------------------------------------------------------*/

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


    // *--------------------------------------------------------------------------------------------------*\
    //  Exec: (grunt-exec plugin)  -- A task to run terminal commands within a grunt task
    // *--------------------------------------------------------------------------------------------------*/
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
        }
    },

    // copy /style-guide to /download folder for
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

    // *-------------------------------------------------------------------------------------------------------------*\
    //  Compress: gzip files - this task can gzip files and also remove the .gz extension after compressing the file
    // *-------------------------------------------------------------------------------------------------------------*/
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
          {expand: true, flatten: true, src: ['_site/assets/js/script-min.js'], dest: 'temp/js/', ext: '.js'},

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


    // *---------------------------------------------------------------*\
    //  ASCIIFY task : adds a banner in ASCI art to our grunt output
    // *---------------------------------------------------------------*/

    asciify: {
        banner:{
            text: 'artsdevlondon',
            options:{
                font:'banner3',
                log:true
            }
        }
    },


    // *-----------------------------------------------------------------------------------------------*\
    //  clean: Removes temporary files created in the temp/ directory by the concat and compress tasks
    // *-----------------------------------------------------------------------------------------------*/

    clean: {
        build: {
            src: ['temp', '_site/node_modules', '_site/temp', '_site/ual-beta.sublime-workspace', '_site/package.json', '_site/gruntfile.js','_site/prod_config.rb']
        }
    },


    // *--------------------------------------------------------------------------------*\
    //  concurrent: This allows tasks to at the same time.
    //  We use this to do compass watch and jekyll watch at the same time
    // *--------------------------------------------------------------------------------*/

    concurrent: {
        options: {
          logConcurrentOutput: true
        },
        local: ['watch:sass','watch:jekyll', 'watch:livereload']

    },
});







    // *--------------------------------------------------------------------------------*\
    //
    //              *******|  Register Grunt Tasks  |**********
    //
    // *--------------------------------------------------------------------------------*/

    // *--------------------------------------------------------------------------------*\
    //         == Default grunt watch task ==
    //
    //         To run type: 'grunt server' which will set up a server,
    //                       and run compass watch and jekyll watch
    //
    // *--------------------------------------------------------------------------------*/

    grunt.registerTask('server', function (target) {

        grunt.task.run([
        'clean',
        'connect:livereload',
        'open:server',
        'watch'
        ]);
    });


    // *--------------------------------------------------------------------------------*\
    //         ==  Build task ==
    //
    //         To run type: 'grunt build' and select your build type (local, staging, live)
    //
    // *--------------------------------------------------------------------------------*/

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

    grunt.registerTask('go_build_staging', ['compass:staging',
                                          'concat:dist',
                                          'any-newer:uglify',
                                          'compress:main',
                                          'exec:buildstaging',
                                          'cssmin:minify',
                                          'compress:css',
                                          'compress:js',
                                          'copy:minified_assets',
                                          //'clean:build',
                                          'any-newer:aws_s3:staging'
                                         ]);

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
        grunt.task.run('buildlive');
        //grunt.task.run(['build']);  // go back to question prompt
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





// *-----------------------------------------*\
//
//     TO DO TASKS & not currently being used
// *-----------------------------------------*/


 // jshint: {
    //   // define the files to lint
    //   files: ['_site/assets/js/script.js'],
    //   // configure JSHint (documented at http://www.jshint.com/docs/)
    //   options: {
    //       // more options here if you want to override JSHint defaults
    //     globals: {
    //       jQuery: true,
    //       console: true,
    //       module: true
    //     }
    //   }
    // },

    // htmlhint: {
    //   build: {
    //       options: {
    //           'tag-pair': true,
    //           'tagname-lowercase': true,
    //           'attr-lowercase': true,
    //           'attr-value-double-quotes': true,
    //           'doctype-first': true,
    //           'spec-char-escape': true,
    //           'id-unique': true,
    //           'head-script-disabled': true,
    //           'style-disabled': true
    //       },
    //       src: ['_site/tests/*.html']
    //   }
    // },

    // csslint: {
    //   strict: {
    //     options: {
    //       import: 2
    //     },
    //     src: ['_site/assets/css/*.css']
    //   },
    //   lax: {
    //     options: {
    //       import: false
    //     },
    //     src: ['_site/assets/css/*.css']
    //   }
    // },


    // test Javascript (script.js)
  // To run type: 'grunt testjs'
  // grunt.registerTask('testjs', 'newer:jshint');


  // grunt.registerTask('testHTML', 'htmlhint');
