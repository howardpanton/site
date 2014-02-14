// *--------------------------------------------------------------------------------*\
//         ==  setup_blog_post task ==
//
//         Create a new blog post file with todays date and settings entered by user
//
// *--------------------------------------------------------------------------------*/
module.exports = function(grunt) {

    // get and set todays date for naming files
    var d = new Date();
    var curr_date = d.getDate();
    var curr_month = d.getMonth() + 1; //Months are zero based
    var curr_year = d.getFullYear();
    var curr_time = d.getTime();

    var todays_date = curr_year + "-" + curr_date + "-" + curr_month;
    var date_for_file = curr_year + "_" + curr_date + "_" + curr_month + "_" + curr_time;
    grunt.registerTask('setup_blog_post', 'Create new blog file from user input', function() {

        var blog_post_title = grunt.config('blog_post_title'); // get value from input prompt field (also sets page title)
        var blog_post_description = grunt.config('blog_post_description');

        // var today = '<%= grunt.template.today("ddmmyyyy") %>';

        var file_name = 'blog_post' + date_for_file + '.md';

        var blog_content = '{' +
                        '\n"title" : "' + blog_post_title + '",' +
                        '\n"date" : "' + todays_date + '",' +
                        '\n"description" : "' + blog_post_description + '"' +
                        '\n}';

        // write new blog post to file
        grunt.file.write('source/blog/posts/' + file_name, blog_content);

        // open file for editing in Sublime Text
        var execString = 'exec:editPost:' + file_name;
        grunt.task.run(execString);


        // update config.JSON with path to blog post

        // get config.json
        var json = grunt.file.readJSON('grunt/config/config.json');
        // read baseURL
        var base_url = json.baseURL;

        if (base_url.length < 1) { base_url = "http://localhost:9000/";}

        var postFolderName = file_name.replace(".md", "");
        // setup path to blog post
        var blogPostPath = base_url + 'blog/posts/' + postFolderName + '/';

        var JSONcontent = '{' +
                        '\n"baseURL" : "' + base_url + '",' +
                        '\n"postName" : "' + blog_post_title + '",' +
                        '\n"postURL" : "' + blogPostPath + '",' +
                        '\n"lastEditedURL" : "' + blogPostPath + '"' +
                        '\n}';

        // update config.json file with the path to the prototype you are creating
        grunt.file.write('grunt/config/config.json', JSONcontent);

    });
};







