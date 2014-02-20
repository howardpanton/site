// *---------------------------------------------------------------*\
//  Prompt : (grunt-prompt plugin)
//           Task that prompts and requests an input from user,
//           then executes tasks based on what the user selected.
// *---------------------------------------------------------------*/

module.exports = function(grunt) {
    grunt.config('prompt', {
        // ask_build_type: {
        //     options: {
        //         questions: [
        //             {
        //                 config: 'buildtype',
        //                 type: 'list',
        //                 message: '\n\nUAL Website Build Task \nSelect build type:',
        //                 default: 'local',
        //                 choices: ['local','staging','live']
        //             }
        //         ]
        //     }
        // },

        confirm_live_build: {
            options: {
                questions: [
                    {
                        config: 'optionselected',
                        type: 'confirm',
                        message: 'Are you sure you want to UPLOAD asset files to the ** LIVE UAL bucket **?\n(this will affect the live website)',
                        default: false
                    }
                ]
            }
        },

        confirm_staging_build: {
            options: {
                questions: [
                    {
                        config: 'optionselected',
                        type: 'confirm',
                        message: 'Upload asset files to ** STAGING ** ?',
                        default: false
                    }
                ]
            }
        },

        gruntserver: {
            options: {
                questions: [
                    {
                        config: 'gruntServer',
                        type: 'confirm',
                        message: 'Do you want to run grunt server to preview locally in your default web browser?',
                        default: true
                    }
                ]
            }
        },

        checkJS: {
            options: {
                questions: [
                    {
                        config: 'lintJS',
                        type: 'confirm',
                        message: 'Do you want to check your built script.js file with jshint?',
                        default: true
                    }
                ]
            }
        },

        selectTask: {
            options: {
                questions: [
                    {
                        config: 'taskType',
                        type: 'list',
                        message: 'Welcome, what would you like to do?',
                        choices: [
                                    { name: 'Build Locally', value: 'local-build' },
                                    { name: 'Build Prototype' , value: 'prototype'},
                                    { name: 'Build & Deploy', value: 'build-deploy' }
                                    // { name: 'Run a test', value: 'test' },
                                    // { name: 'Create a new blog entry', value: 'blog' },


                                    //  { name: 'Build CSS', value: 'build-css' },
                                    // { name: 'Build JS', value: 'build-js' },
                        ],
                        default: ''
                    }
                ]
            }
        },

        buildFileType: {
            options: {
                questions: [
                    {
                        config: 'buildFileType',
                        type: 'list',
                        message: 'What file(s) do you want to build?',
                        choices: [
                                    { name: 'CSS only', value: 'css-only' },
                                    { name: 'JS only' , value: 'js-only'},
                                    { name: 'Both', value: 'js-and-css' }

                        ],
                        default: ''
                    }
                ]
            }
        },

        deployTo: {
            options: {
                questions: [
                    {
                        config: 'deployTo',
                        type: 'list',
                        message: 'Deploy to....?',
                        choices: [
                                    { name: 'staging', value: 'staging' },
                                    { name: 'live' , value: 'live'}
                        ],
                        default: ''
                    }
                ]
            }
        },


        college_name: {
            options: {
                questions: [
                    {
                        config: 'college_name',
                        type: 'list',
                        message: 'What college is the test page for?',
                        choices: [
                                { name: 'UAL (central services)', value: 'ual' },
                                { name: 'Camberwell' , value: 'camberwell'},
                                { name: 'CSM', value: 'csm' },
                                { name: 'Chelsea', value: 'csm' },
                                { name: 'LCC', value: 'lcc' },
                                { name: 'LCF', value: 'lcf' },
                                { name: 'Wimbledon', value: 'wimbledon' }
                        ],
                        default: 'ual'
                    }
                ]
            }
        },

        withSidebar: {
            options: {
                questions: [
                    {
                        config: 'withSidebar',
                        type: 'confirm',
                        message: 'Do you want a left sidebar menu?',
                        default: true
                    }
                ]
            }
        },

        withBanner: {
            options: {
                questions: [
                    {
                        config: 'withBanner',
                        type: 'confirm',
                        message: 'Show page title and breadcrumbs?',
                        default: true
                    }
                ]
            }
        },

        prototypeName: {
            options: {
                questions: [
                    {
                        config: 'file_name',
                        type: 'input',
                        message: 'What name would you like to use for your prototype?',
                        default: false
                    }
                ]
            }
        },

        blogPostTitle: {
            options: {
                questions: [
                    {
                        config: 'blog_post_title',
                        type: 'input',
                        message: 'Enter Blog Post Title',
                        default: 'new blog'
                    }
                ]
            }
        },

        blogPostDescription: {
            options: {
                questions: [
                    {
                        config: 'blog_post_description',
                        type: 'input',
                        message: 'Enter Blog Post Description',
                        default: 'new blog post description'
                    }
                ]
            }
        },




    });
    grunt.loadNpmTasks('grunt-prompt');
};


