// *---------------------------------------------------------------*\
//  aws_s3 :  uploads files to amazonS3
// *---------------------------------------------------------------*/


module.exports = function(grunt) {
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
                    CacheControl: '30000000000'
                }
            },

            // files: [
            //     {expand: true, cwd: 'build/assets/images/bx-slider', src: ['**'], dest: 'assets/img/bx-slider', action: 'upload'},
            //     {expand: true, cwd: 'build/assets/images/logos', src: ['**'], dest: 'assets/img/logos', action: 'upload'},
            //     {expand: true, cwd: 'build/assets/images/mediaelement', src: ['**'], dest: 'assets/img/mediaelement', action: 'upload'},
            //     {expand: true, cwd: 'build/assets/images/royalslider', src: ['**'], dest: 'assets/img/royalslider', action: 'upload'},
            //     {expand: true, cwd: 'build/assets/images/sprite', src: ['**'], dest: 'assets/img/sprite', action: 'upload'},
            //     {expand: true, cwd: 'build/assets/images/svg', src: ['**'], dest: 'assets/img/svg', action: 'upload'},
            //     {expand: true, cwd: 'build/assets/css', src: ['**'], dest: 'assets/css/', action: 'upload'},
            //     {expand: true, cwd: 'build/assets/js', src: ['script-min.js'], dest: 'assets/js/t4/', action: 'upload'},
            // ]
        },
        staging: {
            options: {
                bucket: 'arts-staging',
                differential: true, // Only uploads the files that have changed
                params: {
                    ContentEncoding: 'gzip',
                    CacheControl: '30000000000'
                }
            },

            files: [
                {expand: true, cwd: 'build/assets/images/', src: ['**'], dest: 'assets/img/', action: 'upload'},
                {expand: true, cwd: 'build/assets/css', src: ['**'], dest: 'assets/css/', action: 'upload'},
                {expand: true, cwd: 'build/assets/js', src: ['**'], dest: 'assets/js/', action: 'upload'},
            ]
        },
    });
    grunt.loadNpmTasks('grunt-aws-s3');
};

