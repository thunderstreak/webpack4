const webpack = require('webpack');
const path = require('path');
const root = path.resolve(__dirname, '../');

module.exports = {
    entry: {
        bundle: [
            'react',
            'react-dom',
            'react-router',
            'react-router-dom',
            'redux',
            'react-redux',
            //其他库
        ],
    },
    output: {
        path: path.resolve(root, 'build'),
        filename: '[name].js',
        library: '[name]_library'
    },
    plugins: [
        new webpack.DllPlugin({
            path: path.resolve(root, './build/bundle.manifest.json'),
            name: '[name]_library',
        })
    ]
};
