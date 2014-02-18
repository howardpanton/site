// *--------------------------------------------------------------------------------------------------*\
//  Copy: (grunt-copy plugin)  -- Copy /style-guide to /download folder
// *--------------------------------------------------------------------------------------------------*/

module.exports = function(grunt) {
    grunt.config('copy', {

        css: {
            files: [
                // {expand: true, flatten: true, src:  dest: 'build/assets/css/', filter: 'isFile'},
                {expand: true, flatten: true, src: [
                    'source/assets/css/print.css',
                    '.tmp/assets/css/**/*.css',
                    'source/assets/amazon-s3/css/*.css'
                    ],
                    dest: 'build/assets/css/',
                    filter: 'isFile'
                },
            ]
        },
        gzipped_css: {
            files: [
                // {expand: true, flatten: true, src:  dest: 'build/assets/css/', filter: 'isFile'},
                {expand: true, flatten: true, src: '.tmp/assets/css/gzip/*.css', dest: 'build/assets/css/', filter: 'isFile'},
            ]
        },
        js: {
            files: [
                {expand: true, flatten: true, src: [
                    '.tmp/assets/js/script.js',
                    '.tmp/assets/js/script.min.js',
                    'source/assets/amazon-s3/js/debug.js'
                    ],
                    dest: 'build/assets/js/',
                    filter: 'isFile'
                }
                // {expand: true, flatten: true, src: [
                //     'source/assets/amazon-s3/js/ie/*.*'
                //     ],
                //     dest: 'build/assets/js/ie/',
                //     filter: 'isFile'
                // },
            ]
        },
        gzipped_js: {
            files: [
                {expand: true, flatten: true, src: ['.tmp/assets/js/gzip/*.js'], dest: 'build/assets/js/', filter: 'isFile'},
                {expand: true, flatten: true, src: ['.tmp/assets/js/gzip/ie/*.*'], dest: 'build/assets/js/ie/', filter: 'isFile'}
            ]
        },

        image_assets: {
            files: [
                {expand: true, cwd: 'source/assets/images/', flatten: false, src: ['**/*.*'], dest: 'build/assets/images/', filter: 'isFile'},
            ]
        },

        gzipped_image_assets: {
            files: [
                {expand: true, cwd: '.tmp/assets/images/gzip/', flatten: false, src: ['**/*.*'], dest: 'build/assets/images/', filter: 'isFile'},
            ]
        },

        oldstyleguide: {
            files: [
                {expand: true, cwd: 'source/style-guide/', flatten: false, src: ['**/*.*'], dest: 'build/style-guide/', filter: 'isFile'},
            ]
        }


    });
    grunt.loadNpmTasks('grunt-contrib-copy');
};

