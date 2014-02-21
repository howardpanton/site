// *---------------------------------------------------------------*\
//  concat : A task to combine script files into one file.
//           we use this to combine our scripts into one script file (combined.js) -
//           This file then gets minified, compressed and renamed to script-min.js with other tasks (see compress & uglify tasks)
// *---------------------------------------------------------------*/

module.exports = function(grunt) {
    grunt.config('concat', {
        options: {
            separator: '',
            stripBanners: true,
            process:true,
        },

        jslibs: {
            src: ['source/assets/js/plugins/classie.js','source/assets/js/plugins/fastclick.js', 'source/assets/js/plugins/jquery.review-1.0.0.js', 'source/assets/js/plugins/fitHeights.js', 'source/assets/js/plugins/megamenu.js'],
            dest: '.tmp/assets/js/compiled.plugins.js',
            nonull: true,
        },
        libs_and_built_scriptjs: {
            src: ['.tmp/assets/js/compiled.plugins.js', '.tmp/assets/js/script.min.js'],
            dest: '.tmp/assets/js/script.min.js',
            nonull: true,
        },
        hammerjs: {
            src: ['source/assets/js/plugins/hammer.js', '.tmp/assets/js/script.min.js'],
            dest: '.tmp/assets/js/script.min.js',
            nonull: true,
        }

    });
    grunt.loadNpmTasks('grunt-contrib-concat');
};
