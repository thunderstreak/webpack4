const ip = require('ip').address();
const webpackMerge = require('webpack-merge');

const env = process.env.NODE_ENV;
const base = require('./webpack.config.base.js');

if(env === 'development'){
    let dev = require('./webpack.config.dev.js');
    module.exports = webpackMerge(base,dev);
    console.log(`location:${ip}:${dev.devServer.port}`);
}else if(env === 'production'){
    let pro = require('./webpack.config.pro.js');
    module.exports = webpackMerge(base,pro);
}else{
    console.log(process.env.NODE_ENV);
}
