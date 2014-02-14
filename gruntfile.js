// *--------------------------------------------*\
//  ARTSLONDONDEV
//  Grunt File
//
//  Updated: Monday 2nd Feb 2014 11:00
//
//  Notes: To enable sublime text to open automatically when creating
//         prototypes or new blog posts you need to follow the steps
//         here https://gist.github.com/artero/1236170 to add a shortcut in terminal
// *--------------------------------------------*/


// var base_url = 'http://localhost:9000/';

// var path_to_open = 'http://localhost:9000/style-guide'; // default path to open in grunt server


// *--------------------------------------------------------------------------------*\
//
//              *******|  GRUNT init settings |**********
//
// *--------------------------------------------------------------------------------*/

module.exports = function (grunt) {

    // show elapsed time at the end of grunt tasks
    require('time-grunt')(grunt);

    // load all grunt tasks
    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        aws: grunt.file.readJSON('grunt/config/grunt-aws.json'),
        fixturesPath: "fixtures"
    });

    // Load per-task config from separate files.
    grunt.loadTasks('grunt');




// *--------------------------------------------------------------------------------*\
//         ==  Build task ==
//
//         To run type: 'grunt build' or 'grunt' and select from the options given
//
// *--------------------------------------------------------------------------------*/

    grunt.registerTask('build', [
                                'replace:github',
                                'coffee',
                                'copy:js',
                                'asciify',
                                'prompt:selectTask',
                                'build_options',
                                'server',
                                'replace:reset'
                                ]);

    grunt.registerTask('default', [
                                'replace:github',
                                'asciify',
                                'prompt:selectTask',
                                'build_options',
                                'replace:reset'
                                ]);



// *--------------------------------------------------------------------------------*\
//         ==  build_prototype task ==
//
//         Create a new prototype for developing and testing components or sections
//          -- task prompts the user to select name, college, with or without sidebar etc
//
// *--------------------------------------------------------------------------------*/

    grunt.registerTask('build_prototype', [
                                            'prompt:prototypeName',
                                            'prompt:college_name',
                                            'prompt:withSidebar',
                                            'prompt:withBanner',
                                            'create_prototype_files',
                                            'prompt:gruntserver',
                                            'confirm_gruntserver'
                                          ]);



// *--------------------------------------------------------------------------------*\
//         ==  new_blog_post task ==
//
//         Create a new blog post after a user enters a title and description
//
// *--------------------------------------------------------------------------------*/

    grunt.registerTask('new_blog_post', [ 'prompt:blogPostTitle',
                                          'prompt:blogPostDescription',
                                          'setup_blog_post',
                                          'prompt:gruntserver',
                                          'confirm_gruntserver'
                                        ]);


};







