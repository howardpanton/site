// *---------------------------------------------------------------*\
//      Grunt-contrib-coffee:
//            This task uses compiles and concatenates our coffeescripts
//            and builds out a single javascript file .tmp/coffee.js
//            (we then combine this with other libs to build our script.js file)
// *---------------------------------------------------------------*\

module.exports = function(grunt) {
    grunt.config('coffee', {
        // compile and concat all coffeescript into a single file
        compile: {
            files: {
              '.tmp/assets/js/compiled.modules.js': ['source/assets/coffeescript/modules/**/*.coffee', 'source/assets/coffeescript/on_doc_ready/**/*.coffee', 'source/assets/coffeescript/on_window_load/**/*.coffee']
            }
        },
    });
    grunt.loadNpmTasks('grunt-contrib-coffee.js');
};

