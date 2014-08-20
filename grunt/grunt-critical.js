// *-----------------------------------------------------------------------------------------------*\
//  critical css: inline important styles
// *-----------------------------------------------------------------------------------------------*/

module.exports = function(grunt) {
    grunt.config('criticalcss', {
			custom_options: {
				options: {
					url: "http://localhost:9000/",
					width: 1200,
					height: 900,
					outputfile: "tmp/dist.css"
				}
			}
	});
	grunt.loadNpmTasks('grunt-criticalcss');
};
