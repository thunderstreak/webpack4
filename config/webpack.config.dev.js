const webpack = require('webpack');
const path = require('path');
const ip = require('ip').address();

const root = path.resolve(__dirname, '../');

const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');//优化 webpack 错误输出信息

module.exports = {
    context : path.resolve(root, 'src'),
    entry:{
        app:[
            path.resolve(root, 'src/index.js') // 入口文件
        ]
    },
    output: {
        filename        : 'js/[name].js',// 输出的打包文件
        path            : path.resolve(root, 'dist'),
        publicPath      : '/',// 对于热替换（HMR）是必须的，让webpack知道在哪里载入热更新的模块（chunk）
        chunkFilename   : 'js/[name].js',
    },

    module: {
        rules: [
            {
                test: /\.css|less$/,
                use: [
                    'style-loader',
                    { loader: 'css-loader', options: { importLoaders: 1 } },
                    'postcss-loader',
                    'less-loader'
                ]
            },
        ]
    },
    // 服务
    devServer:{
        hot                 : true,// 开启服务器的模块热替换（HMR）
        contentBase         : path.resolve(root,'dist'),// 输出文件的路径
        publicPath          : '/',// 和上文output的"publicPath"值保持一致
        host                : ip,
        port                : '8008',
        historyApiFallback  : true,//任意的 404 响应都可能需要被替代为 index.html
        clientLogLevel      : 'info',//日志输出等级,none, error, warning 或者 info（默认值）。
        open                : false,//启动时打开默认浏览器

        inline              : true,//内联模式
        compress            : true,//启用gzip 压缩
        noInfo              : true,//「启动时和每次保存之后，那些显示的 webpack 包(bundle)信息」的消息将被隐藏。错误和警告仍然会显示。

        progress            : true,// 显示 webpack 构建进度

        quiet               : true,//优化 webpack 输出信息跟 friendly-errors-webpack-plugin 插件配合

        // 在页面上全屏输出报错信息
        overlay: {
            warnings: true,
            errors  : true
        },

        proxy: {//代理模式
            "/api": {
                target: "http://localhost:3000",
                pathRewrite: {"^/api" : ""}
            }
        }

    },
    //插件
    plugins: [
        new FriendlyErrorsPlugin(),//优化 webpack 输出信息
        new webpack.NamedModulesPlugin(),//执行HMR替换时打印模块名称
        new webpack.HotModuleReplacementPlugin(),//HMR替换插件
    ]
};
