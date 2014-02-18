// *-----------------------------------------------------------------------------------------------*\
//  clean: Removes temporary files created in the temp/ directory by the concat and compress tasks
// *-----------------------------------------------------------------------------------------------*/

module.exports = function(grunt) {
    grunt.config('clean', {
            dist: {
                files: [{
                    dot: true,
                    src: [
                        '.tmp'
                    ]
                }]
            }
    });
    grunt.loadNpmTasks('grunt-contrib-clean');
};
