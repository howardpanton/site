module.exports = function(grunt) {

  grunt.initConfig({
    
    pkg: grunt.file.readJSON('package.json'),
    // we store the grunt-aws.json outside of our repo so that it never gets pushed to git
    aws: grunt.file.readJSON('grunt-aws.json'),

    // sync our assets with amazon s3 after build
    's3-sync': {
      options: {
          key: '<%= aws.key %>'
        , secret: '<%= aws.secret %>'
        , bucket: '<%= aws.bucket %>'
      },
      your_target: {
          files: [
              {
                  root: "."
                , src:  '_site/assets'
                , dest: 'assets/'
                , gzip: true
              }
              // {
              //     root: 'dist'
              //   , src: ['dist/**', '!dist/img/**']  // Don't compress images!
              //   , dest: '/<%= pkg.version %>/'
              //   , gzip: true
              //   , compressionLevel: 9  // Max compression
              // },
              // {
              //     root: __dirname
              //   , src:  'Gruntfile.js'
              //   , dest: 'Gruntfile.js'
              // }
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
          //'test/assets/js/script.js': ['assets/js/script.js']
          'temp/script-minified.js': ['temp/combined.js']

        }
      }
    },

    // build jekyll
    exec: {
        build: {
          cmd: 'jekyll build --destination _site/'
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
        files: ['assets/styles/**/*.scss'],
        tasks: ['compass:dev', 'exec:build', 'compress:main', 'clean:build']
      },

      /* watch and see if our javascript files change */
      js: {
        files: ['assets/js/script.js', 'assets/js/*.js'],
        tasks: ['jshint', 'concat:dist', 'uglify', 'exec:build', 'compress:main', 'clean:build', 's3-sync:your_target']
      }
      
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
  grunt.loadNpmTasks('grunt-s3-sync');
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