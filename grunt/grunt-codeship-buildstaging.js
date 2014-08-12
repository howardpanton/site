// *--------------------------------------------------------------------------------*\
//         == build_options task ==
//
//          grunt-codeship-buildstaging  -- builds files to staging without any prompts
//
//
// *--------------------------------------------------------------------------------*/

module.exports = function(grunt) {



		grunt.registerTask('codeship_build_staging', 'builds CSS and JS files to staging without any prompts', function() {

			// grunt.config('deployTo').set("staging");

			// clear out /build/
			grunt.task.run('clean:before_build');

			// set Amazon s3 ID
			grunt.option("AWS_id", grunt.config.get('AWS_staging_id'));

			// compile CSS
			grunt.task.run([
	                        'compass:staging',
	                        'cssmin:minify',
	                        'copy:image_assets',
	                        'copy:css',
	                        ]);

			// compile JS
			grunt.task.run('compilejs');


			// builstaging

			grunt.log.writeln('Uploading files to AWS staging....');
			// grunt.task.run('go_build_staging');

			grunt.task.run([  'replace:spritePath',
												'compress:gzip_css',
												'compress:gzip_js',
												'copy:gzipped_css',
												'copy:gzipped_js',
												'compress:gzip_image_assets',
												'copy:gzipped_image_assets:',
												'aws_s3:staging',
												'cloudfront_clear'
				]);
		});
};
