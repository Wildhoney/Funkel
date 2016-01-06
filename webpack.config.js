require('babel-loader');

module.exports = {
    entry: './src/funkel.js',
    output: {
        path: __dirname + '/dist',
        filename: 'funkel.js',
	library: "funkel",
        libraryTarget: 'commonjs2'
    },
    module: {
        loaders: [
            { 
                test: /\.js$/,
                loader: 'babel-loader',
                query: {
                  presets: ['es2015', 'stage-0'],
                  cacheDirectory: true
                }
            }
        ]
    }
};

