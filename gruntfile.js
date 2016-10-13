module.exports = function (grunt) {

    grunt.initConfig({
        watch: {
            jade: {
                files: ['views/**'],
                options: {
                    livereload: true
                }
            },
            js: {
                files: ['public/js/**', 'models/**/*.js', 'schemas/**/*.js'],
                //tasks: ['jshint'],
                options: {
                    livereload: true
                }
            },
        },

        nodemon: {
            dev: {
                options: {
                    file: 'app.js',
                    args: [],
                    ignoredFiles: ['README.md', 'node_modules/**', '.DS_Store'],
                    watchedExtensions: ['js'],
                    watchedFolders: ['./'],
                    debug: true,
                    delayTime: 1,
                    env: {
                        PORT: 3000
                    },
                    cwd: __dirname
                }
            }
        },

        concurrent: {
            tasks: ['nodemon', 'watch'],
            options: {
                logConcurrentOutput: true
            }
        }
    });

    //Run predefined tasks whenever watched file patterns are added, changed or deleted
    grunt.loadNpmTasks('grunt-contrib-watch')

    //Grunt task to run a nodemon monitor of your node.js server
    grunt.loadNpmTasks('grunt-nodemon')

    //Run grunt tasks concurrently
    grunt.loadNpmTasks('grunt-concurrent')

    // grunt.loadNpmTasks('grunt-mocha-test')
    // grunt.loadNpmTasks('grunt-contrib-less')
    // grunt.loadNpmTasks('grunt-contrib-uglify')
    // grunt.loadNpmTasks('grunt-contrib-jshint')

    grunt.option('force', true)

    grunt.registerTask('default', ['concurrent'])

    // grunt.registerTask('test', ['mochaTest'])
}