// *--------------------------------------------------------------------------------*\
//         == build_options task ==
//
//          runs build tasks based on the option user selects from the prompt:selectTask
//
//
// *--------------------------------------------------------------------------------*/

module.exports = function(grunt) {



		grunt.registerTask('build_options', 'runs build tasks based on the option user selects', function() {

				var taskType = grunt.config('taskType');
				switch (taskType) {

						case 'local-build':
								grunt.task.run(['server']);
						break;

						case 'build-github':
								grunt.log.writeln('building out for github....');
								grunt.task.run('clean:before_build');
								grunt.task.run(['build-github']);
								grunt.task.run('prompt:buildFileType');
								grunt.task.run('handle_build_type');
								grunt.task.run('gh-pages:pushToBuild');
						break;

						case 'prototype':
								grunt.task.run(['build_prototype']);
								grunt.task.run(['build']);  // go back to question prompt
						break;

						case 'blog':
								grunt.task.run('new_blog_post');
								grunt.task.run(['build']);  // go back to question prompt
						break;

						case 'test':
								grunt.task.run('testjs');
								grunt.task.run(['build']);  // go back to question prompt
						break;

						case 'build-deploy':
								grunt.task.run('clean:before_build');
								grunt.task.run('prompt:buildFileType');
								grunt.task.run('prompt:deployTo');
								grunt.task.run('handle_build_type');
						break;

						default:
						//grunt.task.run(['buildlocal']);
						grunt.log.writeln('not working');
						break;
		}

		});
};
