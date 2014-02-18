// *--------------------------------------------*\
//  ARTSLONDONDEV
//  Grunt File
//
//  Updated: Monday 2nd Feb 2014 11:00
//
//  Notes: To enable sublime text to open automatically when creating
//         prototypes or new blog posts you need to follow the steps
//         here https://gist.github.com/artero/1236170 to add a shortcut in terminal
// *--------------------------------------------*/


// var base_url = 'http://localhost:9000/';

// var path_to_open = 'http://localhost:9000/style-guide'; // default path to open in grunt server


// *--------------------------------------------------------------------------------*\
//
//              *******|  GRUNT init settings |**********
//
// *--------------------------------------------------------------------------------*/

module.exports = function (grunt) {

    // show elapsed time at the end of grunt tasks
    require('time-grunt')(grunt);

    // load all grunt tasks
    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
<<<<<<< HEAD
        aws: grunt.file.readJSON('grunt/config/grunt-aws.json'),
        fixturesPath: "fixtures"
=======

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
                files: ['*/**/*.html', '*.html', '*.md', '!node_modules'],
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
                    '_site/**/*.html' 
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
>>>>>>> 25b5c5003277e26ad62a19d84a838004a427cfaf
    });

    // Load per-task config from separate files.
    grunt.loadTasks('grunt');




// *--------------------------------------------------------------------------------*\
//         ==  Build task ==
//
//         To run type: 'grunt build' or 'grunt' and select from the options given
//
// *--------------------------------------------------------------------------------*/

    grunt.registerTask('build', [
                                'replace:github',
                                'coffee',
                                'copy:js',
                                'asciify',
                                'prompt:selectTask',
                                'build_options',
                                'server',
                                'replace:reset'
                                ]);

    grunt.registerTask('default', [
                                'replace:github',
                                'asciify',
                                'prompt:selectTask',
                                'build_options',
                                'replace:reset'
                                ]);



// *--------------------------------------------------------------------------------*\
//         ==  build_prototype task ==
//
//         Create a new prototype for developing and testing components or sections
//          -- task prompts the user to select name, college, with or without sidebar etc
//
// *--------------------------------------------------------------------------------*/

    grunt.registerTask('build_prototype', [
                                            'prompt:prototypeName',
                                            'prompt:college_name',
                                            'prompt:withSidebar',
                                            'prompt:withBanner',
                                            'create_prototype_files',
                                            'prompt:gruntserver',
                                            'confirm_gruntserver'
                                          ]);



// *--------------------------------------------------------------------------------*\
//         ==  new_blog_post task ==
//
//         Create a new blog post after a user enters a title and description
//
// *--------------------------------------------------------------------------------*/

    grunt.registerTask('new_blog_post', [ 'prompt:blogPostTitle',
                                          'prompt:blogPostDescription',
                                          'setup_blog_post',
                                          'prompt:gruntserver',
                                          'confirm_gruntserver'
                                        ]);


};







