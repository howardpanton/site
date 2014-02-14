// *--------------------------------------------------------------------------------*\
//         ==  Compile CSS task ==
//
//         set staging or live url for css based on user choice
// *--------------------------------------------------------------------------------*/
module.exports = function(grunt) {


    grunt.registerTask('compilecss', 'compile css based on either staging or live', function() {
        var deployTo = grunt.config('deployTo');

        if(deployTo) {

	        grunt.task.run([
	                        'compass:' + deployTo,
	                        'cssmin:minify',
	                        'copy:css',

	                        ]);
	    } else {
	    	grunt.task.run([
	                        'compass:server',
	                        'cssmin:minify',
	                        'copy:css',

	                        ]);

	    }

    });

};
