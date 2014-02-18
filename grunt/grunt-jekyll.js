// *---------------------------------------------------------------*\
//  Jekyll task to watch files (uses _config_local.yml)
//  Use jekyll
//
// *---------------------------------------------------------------*/

module.exports = function(grunt) {
    grunt.config('jekyll', {
        options: {
            src : '<%= app %>'
        },
        dist: {
            options: {
                dest: '<%= dist %>',
                config: '_config.yml',
                exlude: ['Gemfile', 'node_modules', 'temp', 'grunt-aws.json', 'styles', 'config.rb', 'config_live.rb', 'config_local.rb', 'config_staging.rb', 'gruntfile.js', 'package.json', 'Gemfile.lock', 'Guardfile', 'README.md', 'Rakefile', 'old_gruntfile'],
                watch: true
            }
        },
    });
    grunt.loadNpmTasks('grunt-jekyll');
};
