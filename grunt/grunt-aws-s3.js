// *---------------------------------------------------------------*\
//  aws_s3 :  uploads files to amazonS3
// *---------------------------------------------------------------*/


module.exports = function(grunt) {

		// get today's date
		todaysDate = new Date();

		// function to add days to a date
		function addDaysToDate(date, daysToAdd) {
      date.setDate(date.getDate() + daysToAdd);
      return date;
		}

    grunt.config('aws_s3', {
        options: {
          accessKeyId: '<%= aws.AWSAccessKeyId %>', // Use the variables
          secretAccessKey: '<%= aws.AWSSecretKey %>', // You can also use env variables
          region: 'eu-west-1',
          uploadConcurrency: 5,
          // 5 simultaneous uploads
          downloadConcurrency: 5 // 5 simultaneous downloads
        },

        live: {
          options: {
              bucket: 'arts-live',
              differential: true, // Only uploads the files that have changed
              params: {
                  ContentEncoding: 'gzip',
                  CacheControl: 'max-age=155520000, public',
                  Expires: addDaysToDate(todaysDate, 1000)
              }
          },

          files: [
              {expand: true, cwd: 'build/assets/images/', src: ['**/**'], dest: 'assets/img/', action: 'upload'},
              {expand: true, cwd: 'build/assets/css', src: ['**'], dest: 'assets/css/', action: 'upload'},
              {expand: true, cwd: 'build/assets/js', src: ['**'], dest: 'assets/js/', action: 'upload'},
              {expand: true, cwd: 'build/assets/js/ie', src: ['**'], dest: 'assets/js/ie', action: 'upload'}
          ]
        },

        staging: {
          options: {
              bucket: 'arts-staging',
              differential: true, // Only uploads the files that have changed
              params: {
                  ContentEncoding: 'gzip',
                  CacheControl: 'max-age=155520000, public',
                  Expires: addDaysToDate(todaysDate, 1000)
              }
          },

          files: [
              {expand: true, cwd: 'build/assets/images/', src: ['**/**'], dest: 'assets/img/', action: 'upload'},
              {expand: true, cwd: 'build/assets/css', src: ['**'], dest: 'assets/css/', action: 'upload'},
              {expand: true, cwd: 'build/assets/js', src: ['**'], dest: 'assets/js/', action: 'upload'},
              {expand: true, cwd: 'build/assets/js/ie', src: ['**'], dest: 'assets/js/ie', action: 'upload'}
          ]
        },

        staging_folder_on_live_bucket: {
      		options: {
              bucket: 'arts-live',
              differential: true, // Only uploads the files that have changed
              params: {
                  ContentEncoding: 'gzip',
                  CacheControl: 'max-age=155520000, public',
                  Expires: addDaysToDate(todaysDate, 1000)
              }
          },

          files: [
              {expand: true, cwd: 'build/assets/css', src: ['**'], dest: 'assets/css/staging/', action: 'upload'},
              {expand: true, cwd: 'build/assets/js', src: ['**'], dest: 'assets/js/staging', action: 'upload'}
          ]
        }

    });
    grunt.loadNpmTasks('grunt-aws-s3');
};

