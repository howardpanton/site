// *---------------------------------------------------------------*\
//  Sass:  (grunt-contrib-sass plugin)
//
// *---------------------------------------------------------------*/

module.exports = function(grunt) {
    grunt.config('sass', {
        local: {
            options: {
                compass: true,
                banner: '/* Updated: <%= grunt.template.today("dd-mm-yyyy, h:MM:ss TT") %> */',
                spawn:　false
            },
            files: [{
                expand: true,
                cwd: 'source',
                src: ['assets/sass/**/*.scss'],
                dest: '.tmp',
                ext: '.css'
            }]
        },

        // TO DO set up linking to different _config.rb files for staging and live
        // staging: {
        //     options: {
        //         compass: true,
        //         banner: '/* Updated: <%= grunt.template.today("dd-mm-yyyy, h:MM:ss TT") %> */'
        //     },
        //     files: [{
        //         expand: true,
        //         cwd: 'source',
        //         src: ['assets/sass/**/*.scss'],
        //         dest: '.tmp',
        //         ext: '.css'
        //     }]
        // },

        // live: {
        //     options: {
        //         compass: true,
        //         banner: '/* Updated: <%= grunt.template.today("dd-mm-yyyy, h:MM:ss TT") %> */'
        //     },
        //     files: [{
        //         expand: true,
        //         cwd: 'source',
        //         src: ['assets/sass/**/*.scss'],
        //         dest: '.tmp',
        //         ext: '.css'
        //     }]
        // }
    });
    grunt.loadNpmTasks('grunt-contrib-sass');
};
