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
    });
    grunt.loadNpmTasks('grunt-contrib-compress');
};
