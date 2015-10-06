module.exports = function(config) {

    config.set({

        frameworks: ['jasmine', 'browserify'],
        files: [
            'src/funkel.js',
            'tests/*.test.js'
        ],
        preprocessors: {
            'src/*.js': ['browserify'],
            'tests/*.js': ['browserify']
        },
        reporters: ['spec'],
        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: false,
        browsers: ['Firefox'],
        singleRun: false,
        browserify: {
            debug: true,
            transform: [["babelify", { stage: 0 }]]
        }

    });

};
