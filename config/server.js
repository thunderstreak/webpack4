const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const webpackMerge = require('webpack-merge');

process.env.NODE_ENV = 'development';
const base = require('./webpack.config.base.js');
let dev = require('./webpack.config.dev.js');
let config = webpackMerge(base,dev);

new WebpackDevServer(webpack(config), {
    publicPath: '/dist/',
    hot: true,
    historyApiFallback: true
}).listen(3200, 'localhost', (err, result) => {
    if (err) {
        console.log(err);
    }
    console.log('Listening at localhost:3200');
});
