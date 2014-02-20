// *--------------------------------------------------------------------------------------------------*\
//      grunt-text-replace
//        Grunt task for replace text inside files
// *--------------------------------------------------------------------------------------------------*/

module.exports = function(grunt) {
    grunt.config('replace', {
        siteurl: {
            src: ['source/_layout/_base.jade'],
            overwrite: true, // overwrite matched source files
            replacements: [{
              from: "localhost:9000",
              to: "artslondon.github.io/"
            }]
        },
        local: {
            src: ['source/_layout/_base.jade'],
            overwrite: true, // overwrite matched source files
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
            src: ['source/_layout/_base.jade'],
            overwrite: true, // overwrite matched source files
            replacements: [{
              from: "{{site.url}}",
              to: "http://artslondon.github.io/"
            },
            {
              from: "http://localhost:9000",
              to: "http://artslondon.github.io/"
            }
            ]
        },
      sprite: {
            src: ['.tmp/assets/css/screen.css'],
            overwrite: true, // overwrite matched source files
            replacements: [{
              from: "source/assets/",
              to: "assets/"
            }
            ]
        },
        reset: {
            src: ['source/_layout/_base.jade'],
            overwrite: true, // overwrite matched source files
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

