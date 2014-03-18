// *--------------------------------------------------------------------------------------------------*\
//      grunt-text-replace
//        Grunt task for replace text inside files
// *--------------------------------------------------------------------------------------------------*/

module.exports = function(grunt) {
		grunt.config('replace', {
				siteurl: {
						src: ['source/_layout/_base.jade', 'source/_includes/_layouts/_head.jade'],
						overwrite: true, // overwrite matched source files
						replacements: [{
							from: "localhost:9000",
							to: "artslondon.github.io/"
						}]
				},
				local: {
						src: ['source/_layout/_base.jade', 'source/_includes/_layouts/_head.jade'],
						overwrite: true,
						replacements: [{
							from: "{{site.url}}",
							to: "http://localhost:9000"
						},
						{
							from: "http://artslondon.github.io/",
							to: "http://localhost:9000"
						}
						]
				},
				github: {
						src: ['source/_layout/_base.jade', 'source/_includes/_layouts/_head.jade'],
						overwrite: true,
						replacements: [{
							from: "{{site.url}}",
							to: "http://artslondon.github.io/arts.ac.uk/build"
						},
						{
							from: "http://localhost:9000",
							to: "http://artslondon.github.io/arts.ac.uk/build"
						}
						]
				},
				spritePath: {
						src: ['.tmp/assets/css/screen.css', '.tmp/assets/css/screen.min.css'],
						overwrite: true,
						replacements: [{
							from: "source/assets/",
							to: "assets/"
						}
						]
				},
				reset: {
						src: ['source/_layout/_base.jade', 'source/_includes/_layouts/_head.jade'],
						overwrite: true,
						replacements: [{
							from: "http://artslondon.github.io/",
							to: "{{site.url}}"
						},
						{
							from: "http://localhost:9000",
							to: "{{site.url}}"
						}
						]
				},
		});
		grunt.loadNpmTasks('grunt-text-replace');
};

