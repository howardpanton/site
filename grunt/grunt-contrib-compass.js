// *---------------------------------------------------------------*\
//  Compass:  (grunt-contrib-compass plugin)
//            This task uses different compass config files for each build type
//            to set correct file paths in css
// *---------------------------------------------------------------*\

module.exports = function(grunt) {
    grunt.config('compass', {
        server: {
            options: {
                config: 'config.rb',
                cssDir: '.tmp/assets/css',
                force: true
            },
        },

        staging: {
            options: {
                config: 'config_staging.rb',
                cssDir: '.tmp/assets/css',
                force: true
            },
        },

        live: {
            options: {
                config: 'config_live.rb',
                cssDir: '.tmp/assets/css',
                force: true
            },
        },

    });
    grunt.loadNpmTasks('grunt-contrib-compass');
};

