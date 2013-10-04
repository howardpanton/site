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
            CacheControl: '3000'
          }
        },
        
        files: [
          {expand: true, cwd: '_site/assets/css', src: ['**'], dest: 'assets/css/', action: 'upload'},
          {expand: true, cwd: '_site/assets/js', src: ['**'], dest: 'assets/js/', action: 'upload'},
        ]
      },
    },
    compass: {
      dev: {
        options: {
          config: 'config.rb',
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
          'assets/js/script.js': ['temp/combined.js']

        }
      }
    },

    // build jekyll
    exec: {
        build: {
          cmd: 'rm -rf _site/; jekyll build --destination _site/',
        },
        gzip: {
           cmd: 'gzip -9 _site/assets/css/*.css',
        },
        mv_screen: {
           cmd: 'mv _site/assets/css/screen.css.gz _site/assets/css/screen.css',
        },
        mv_docs: {
           cmd: 'mv _site/assets/css/docs.css.gz _site/assets/css/docs.css',
        },
        mv_header: {
           cmd: 'mv _site/assets/css/header-only.css.gz _site/assets/css/header-only.css',
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

      sass: {
        files: ['assets/styles/**/*.scss','assets/js/*.js'],
        tasks: ['compass:dev', 
                'concat:dist', 
                'uglify', 
                'compress:main', 
                'clean:build', 
                'exec:build', 
                'exec:gzip', 
                'exec:mv_header',
                'exec:mv_screen',
                'exec:mv_docs',
                'aws_s3:staging']

      },

      /* watch and see if our javascript files change */
      // js: {
      //   files: ['assets/js/script.js', 'assets/js/*.js'],
      //   tasks: ['jshint', 
      //           'concat:dist', 
      //           'uglify',  
      //           'compress:main', 
      //           'clean:build', 
      //           'exec:build', 
      //           'exec:gzip',
      //           'exec:mv_header',
      //           'exec:mv_screen',
      //           'exec:mv_docs', 
      //           'aws_s3:staging']
      // }
      
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
  grunt.loadNpmTasks('grunt-exec');
  grunt.loadNpmTasks('grunt-contrib-compress');
  grunt.loadNpmTasks('grunt-contrib-clean');




  // Register Grunt Tasks


  // default grunt watch task
  // To run type: 'grunt' 
  grunt.registerTask('default', 'watch');

  // test Javascript (script.js)
  // To run type: 'grunt testjs'
  grunt.registerTask('testjs', 'jshint');

  // build for production. 
  // To run type: 'grunt buildprod'
  grunt.registerTask('buildprod', 'jshint');

  // build for github
  // To run type: 'grunt buildlocal'
  grunt.registerTask('buildlocal', 'jshint');



};