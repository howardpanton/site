// *---------------------------------------------------------------*\
//  Build Gh-Pages task -
// *---------------------------------------------------------------*\

module.exports = function(grunt) {
		grunt.config('gh-pages', {
						'pushToBuild': {
								options: {
									base: 'build/',
									repo: 'https://github.com/artslondon/site.git',
									branch: 'gh-pages',
									add: true,
									message: 'TEST: Wednesday auto-generated commit message from grunt task',
									push: true
								},
								src: '**/*'
						}
		});
		grunt.loadNpmTasks('grunt-gh-pages');
};




