const webpack = require('webpack');
const path = require('path');

const root = path.resolve(__dirname, '../');
const dist = path.resolve(root, 'dist');
const src = path.resolve(root, 'src');

const autoprefixer = require('autoprefixer');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");//清空文件夹
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: process.env.NODE_ENV,
    entry:{
        app     : './src/index.js',
        // vendors : './src/vendors.js'
    },
    output: {
        filename    : 'js/[name].js',
        path        : dist,
        // publicPath  : 'https://www.baidu.com',//CDN
    },
    module:{
        rules:[
            {
                test:/\.css|less$/,
                use:[MiniCssExtractPlugin.loader,"css-loader",{
                    loader: "postcss-loader",
                    options: {
                        plugins: () => [require('autoprefixer')],
                    }
                },'less-loader']
            },
            {
                test: /\.(js|jsx)$/,
                use: 'babel-loader'
            }
        ]
    },
    plugins: [

        new CleanWebpackPlugin(['dist'], {
            root    : root,
            verbose : false,
        }),

        new MiniCssExtractPlugin({
            filename: "css/[name].[chunkhash:8].css",
            chunkFilename: "[id].css"
        }),

        new webpack.LoaderOptionsPlugin({
            options: {
                context: '/',
                minimize: true,
                postcss: [autoprefixer({
                    browsers: [
                        'ie >= 8',
                        'ie_mob >= 10',
                        'ff >= 30',
                        'chrome >= 34',
                        'safari >= 7',
                        'opera >= 23',
                        'ios >= 7',
                        'android >= 4.4',
                        'bb >= 10'
                    ],
                    cascade : true,
                    remove  : true
                })]
            }
        }),

        new HtmlWebpackPlugin({
            title:'ReactDome',
            filename : 'index.html', //输出入口文件
            minify:{
                removeComments      : true, //移除HTML中的注释
                collapseWhitespace  : true, //删除空白符与换行符
                minifyJS:true,
                minifyCSS:true,
            },
            template: path.resolve(src, 'templates/index.html')
        })
    ],
};
