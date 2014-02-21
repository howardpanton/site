// *---------------------------------------------------------------*\
//  ASCIIFY task : adds a banner in ASCI art to our grunt output
// *---------------------------------------------------------------*/

module.exports = function(grunt) {
    grunt.config('asciify', {
        banner:{
            text: 'klunge',
            options:{
                font:'banner3',
                log:true
            }
        }
    });
    grunt.loadNpmTasks('grunt-asciify');
};
