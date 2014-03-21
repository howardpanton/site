// *--------------------------------------------------------------------------------*\
//         ==  create_prototype_files task ==
//
//         Create a new prototype for developing and testing components or sections
//
// *--------------------------------------------------------------------------------*/

module.exports = function(grunt) {
		grunt.registerTask('create_prototype_files', 'Create folders and files', function() {

				var file_name = grunt.config('file_name'); // get filename from input field (also sets page title)
				var page_title = file_name;

				// replace spaces with flags for the filename (titles remain as spaces)
				file_name = file_name.replace(/ /g, '-');

				// get config.json
				var json = grunt.file.readJSON('grunt/config/config.json');
				// read baseURL
				var base_url = json.baseURL;

				if (base_url.length < 1) { base_url = "http://localhost:9000/";}

				// setup path to prototype
				var prototypePath = base_url + 'prototypes/' + file_name;

				var JSONcontent = '{' +
												'\n"baseURL" : "' + base_url + '",' +
												'\n"prototypeName" : "' + file_name + '",' +
												'\n"prototypeURL" : "' + prototypePath + '",' +
												'\n"lastEditedURL" : "' + prototypePath + '"' +
												'\n}';

				// update config.json file with the path to the prototype you are creating
				grunt.file.write('grunt/config/config.json', JSONcontent);


				// set path to prototype for loading in server task
				grunt.config.set('prototype_name', prototypePath);

				// Get college name for testpage body class
				var college_name = grunt.config('college_name');

				// Get sidebar choice from prompt
				var with_sidebar = grunt.config('withSidebar');

				// Get page banner choice from prompt
				var with_banner = grunt.config('withBanner');

				var header_content = 'extends ../../_layout/_base' +
															'\nblock vars' +
															'\n\t- var bodyClass = "'+  college_name + '";' +
															'\n\t- var Title = "'+ page_title + '";' +
															'\n\t- var Sidebar = '+ with_sidebar + ';' +
															'\n\t- var Banner = '+ with_banner + ';' +
															'\nblock content';

				grunt.file.write('source/prototypes/' + file_name + '/index.jade', header_content);



				// open file for editing in Sublime Text
				 var execString = 'open:dev';
				 grunt.task.run(execString);

		});
};







