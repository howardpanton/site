// *-------------------------------------------------------------------------------------------------------------*\
//  Compress: gzip files - this task can gzip files and also remove the .gz extension after compressing the file
// *-------------------------------------------------------------------------------------------------------------*/

module.exports = function(grunt) {
    grunt.config('compress', {
        main: {
            options: {
                archive: 'ual-bootstrap.zip'
            },
            files: [
                {src: ['download/**'], dest: ''}
            ]
        },

        gzip_js: {
            options: {
                mode: 'gzip'
            },
            files: [
                {expand: true, flatten: true, src: ['.tmp/assets/js/script.min.js'], dest: '.tmp/assets/js/gzip/', ext: '.min.js'},
                {expand: true, flatten: true, src: ['.tmp/assets/js/script.js'], dest: '.tmp/assets/js/gzip/', ext: '.js'},
                {expand: true, flatten: true, src: ['source/assets/amazon-s3/js/ie/*.js'], dest: '.tmp/assets/js/gzip/ie/', ext: '.js'},
                {expand: true, flatten: true, src: ['source/assets/amazon-s3/js/ie/*.html'], dest: '.tmp/assets/js/gzip/ie/', ext: '.html'}
            ]
        },

        gzip_css: {
            options: {
                mode: 'gzip'
            },
            files: [
                {expand: true, flatten: true, src: ['.tmp/assets/css/*.css'], dest: '.tmp/assets/css/gzip/', ext: '.min.css'},
                {expand: true, flatten: true, src: ['.tmp/assets/css/screen.css'], dest: '.tmp/assets/css/gzip/', ext: '.css'} 
            ]
        },

        gzip_image_assets: {
            options: {
                mode: 'gzip'
            },
            files: [
                // {expand: true, cwd: 'build/assets/images/', flatten: false, src: ['**/*.jpg'], dest: '.tmp/assets/images/gzip/', ext: '.jpg'},
                // {expand: true, cwd: 'build/assets/images/', flatten: false, src: ['**/*.svg'], dest: '.tmp/assets/images/gzip/', ext: '.svg'},
                // {expand: true, cwd: 'build/assets/images/', flatten: false, src: ['**/*.png'], dest: '.tmp/assets/images/gzip/', ext: '.png'},
                // {expand: true, cwd: 'build/assets/images/', flatten: false, src: ['**/*.gif'], dest: '.tmp/assets/images/gzip/', ext: '.gif'},
                {expand: true, cwd: 'build/assets/images/', flatten: false, src: ['favicon.ico'], dest: '.tmp/assets/images/gzip/', ext: '.ico'}
            ]
        }

        // fonts: {
        //     options: {
        //         mode: 'gzip'
        //     },
        //     files: [
        //         {expand: true, flatten: true, src: ['_site/assets/fonts/*.eot'], dest: 'temp/fonts/', ext: '.eot'},
        //         {expand: true, flatten: true, src: ['_site/assets/fonts/*.svg'], dest: 'temp/fonts/', ext: '.svg'},
        //         {expand: true, flatten: true, src: ['_site/assets/fonts/*.ttf'], dest: 'temp/fonts/', ext: '.ttf'},
        //         {expand: true, flatten: true, src: ['_site/assets/fonts/*.woff'], dest: 'temp/fonts/', ext: '.woff'}
        //     ]
        // }


    });
    grunt.loadNpmTasks('grunt-contrib-compress');
};
