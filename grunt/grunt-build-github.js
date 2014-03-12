// *--------------------------------------------------------------------------------*\
//         ==  BUILD GITHUB - paths in build/ folder will be set to github url  ==
//					use this before pushing files to
// *--------------------------------------------------------------------------------*/
module.exports = function(grunt) {

		// build-github tasks
		grunt.registerTask('build-github', 	[
																						'replace:spritePath',
																						'replace:github',
																						'copy:prototype_assets',
												]);
};













