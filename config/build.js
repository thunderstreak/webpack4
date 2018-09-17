const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const webpackMerge = require('webpack-merge');

const env = process.env.NODE_ENV;
const base = require('./webpack.config.base.js');

let config;

if(env === 'development'){
    let dev = require('./webpack.config.dev.js');
    config = webpackMerge(base,dev);
}else if(env === 'production'){
    let pro = require('./webpack.config.pro.js');
    config = webpackMerge(base,pro);
}else{
    console.log(process.env.NODE_ENV);
}

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
