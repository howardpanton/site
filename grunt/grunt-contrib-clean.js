// *-----------------------------------------------------------------------------------------------*\
//  clean: Removes temporary files created in the temp/ directory by the concat and compress tasks
// *-----------------------------------------------------------------------------------------------*/

module.exports = function(grunt) {
    grunt.config('clean', {
            before_build: {
                files: [{
                    dot: true,
                    src: [
                        '.tmp',
                        'build'
                    ]
                }]
            }
    });
    grunt.loadNpmTasks('grunt-contrib-clean');
};
