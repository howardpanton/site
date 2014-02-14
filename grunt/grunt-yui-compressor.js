// *--------------------------------------------------------------------------------*\
//         ==  yuicompressor task ==
//
// *--------------------------------------------------------------------------------*/
module.exports = function(grunt) {

      grunt.registerTask('yuicompressor', function() {

            var compressor = require('yuicompressor');

            compressor.compress(['.tmp/assets/js/script.js', '.tmp/assets/js/script.min.js'], {
                //Compressor Options:
                charset: 'utf8',
                type: 'js',
                nomunge: true,
                'line-break': 80
            }, function(err, data, extra) {
                //err   If compressor encounters an error, it's stderr will be here
                //data  The compressed string, you write it out where you want it
                //extra The stderr (warnings are printed here in case you want to echo them
            });
      });
};







