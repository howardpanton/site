// *--------------------------------------------------------------------------------*\
//  htmlhint: This can be used to test HTML files after build.
//
// *--------------------------------------------------------------------------------*/

module.exports = function(grunt) {
    grunt.config('htmlhint', {
        build: {
            options: {
                'tag-pair': true,
                'tagname-lowercase': true,
                'attr-lowercase': true,
                'attr-value-double-quotes': true,
                'doctype-first': true,
                'spec-char-escape': true,
                'id-unique': true,
                'head-script-disabled': true,
                'style-disabled': true
            },
            src: ['build/tests/**/*.html']
        }
    });
    grunt.loadNpmTasks('grunt-concurrent');
};

