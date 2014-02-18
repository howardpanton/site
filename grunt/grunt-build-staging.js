// *--------------------------------------------------------------------------------*\
//         ==  BUILD STAGING  ==
//
// *--------------------------------------------------------------------------------*/
module.exports = function(grunt) {

    // build staging tasks
    grunt.registerTask('buildstaging', ['prompt:confirm_staging_build','confirm_staging_build']);

    grunt.registerTask('go_build_staging', 
								    	[
								    		'gzip_assets', 
								    		'aws_s3:staging'
								    	]);
};







