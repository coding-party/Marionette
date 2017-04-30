var request = require('request');

module.exports = function(grunt){

    require('time-grunt')(grunt);
    require('load-grunt-tasks')(grunt);

    //change project name from path.
    var path = 'projectOne';

    //configure grunt
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        // dir
        meta: {
            base: './',
            deployPath: './public/' + path + '/',
            deployPathJs: './public/' + path + '/js/',
            deployPathCss: './public/' + path + '/css/',
            deployPathImg: './public/' + path + '/img/',
            devPathJs: './private/' + path + '/js/',
            devPathSass: './private/' + path + '/sass/',
            devPathImg: './private/' + path + '/images/',
            devPathTpl: './private/' + path + '/templates/'

        },

        // Bannar
        banner: '/*! <%= pkg.name %> - v<%= pkg.version %> -' +
        '<%= grunt.template.today("dd-mm-yyyy") %>\n' +
        '* Copyright (c) <%= grunt.template.today("yyyy") %>',

        // Browser-Sync
        browserSync: {
            bsFiles: {
                src: [
                    '<%= meta.devPathTpl %>*',
                    '<%= meta.deployPathCss %>*.css',
                    '<%= meta.deployPath %>*.js'
                ]
            },
            options: {
                watchTask: true,
                open: 'external',
                server: {
                    baseDir: '<%= meta.base %>',
                    index: '<%= meta.deployPath %>index.html'
                }
            }
        },

        // Concat
        concat: {
            js: {
                src: [
                    '<%= meta.devPathJs %>**/*.js' //modules
                    //'<%= meta.devPathJs %>main.js'
                ],
                dest: '<%= meta.deployPathJs %>main.js'
            },

            css: {
                src: [
                    // '<%= meta.devPathSass %>*.css'
                    '<%= meta.devPathSass %>main.css'
                ],
                dest: '<%= meta.deployPathCss %>main.css'
            }
        },

        // Sass
        sass: {
            dist: {
                options:{
                    style: 'compressed'
                },
                files: [
                    {
                        expand: true,
                        cwd: '<%= meta.devPathSass %>',
                        src: 'main.scss',
                        dest: '<%= meta.deployPathCss %>',
                        ext: '.css'
                    }
                ]
            }
        },
        cssmin: {
            target: {
                files: [{
                    expand: true,
                    cwd: '<%= meta.deployPathCss %>',
                    src: ['*.css', '!*.min.css'],
                    dest: '<%= meta.deployPathCss %>',
                    ext: '.min.css'
                }]
            }
        },

        // Template - Engine
        tasty_swig: {
            options: {
                extension: '.tpl'
            },
            index: {
                src: ['<%= meta.devPathTpl %>*.tpl'],
                dest: '<%= meta.deployPath %>'
            }
        },

        // watch
        watch: {
            js: {
                files: ['<%= meta.devPathJs %>**/*.js'],
                tasks: ['concat']
            },
            css: {
                files: '<%= meta.devPathSass %>**/*.{scss,sass}',
                tasks: ['sass']
            },
            tpl: {
                files: '<%= meta.devPathTpl %>**/*.tpl',
                tasks: [
                    'tasty_swig'
                ]
            }
        }
    });

    // load Tasks
    grunt.loadNpmTasks('grunt-browser-sync');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-tasty-swig');
    grunt.loadNpmTasks('grunt-contrib-cssmin');


    // Register
    grunt.registerTask('project', ['sass', 'cssmin', 'concat', 'tasty_swig', 'browserSync', 'watch']);
};
