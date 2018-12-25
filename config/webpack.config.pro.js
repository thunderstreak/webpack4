const webpack = require('webpack');
const path = require('path');

const root = path.resolve(__dirname, '../');

const autoprefixer = require('autoprefixer');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");//提取css
const BundleAnalyzer = require('webpack-bundle-analyzer');//拆分 js 代码

module.exports = {
    devtool : 'false',
    entry: {
        app     : path.resolve(root, 'src/index.js'),
        vendor  : ['react', 'react-dom', 'react-router-dom', 'redux', 'react-redux']
    },
    output: {
        path            : path.resolve(root, 'dist'),
        filename        : 'js/[name].[hash:8].js',
        publicPath      : '/',// 上线的地址CDN
        chunkFilename   : 'js/[name].[chunkhash:8].js',
    },
    module:{
        rules:[
            {
                test:/\.css|less$/,
                use:[
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: '../'
                        }
                    },
                    "css-loader",
                    {
                        loader: "postcss-loader",
                        // options: {
                        //     plugins: () => [require('autoprefixer')]
                        // },
                    },
                    {
                        loader: "less-loader",
                        options: {
                            javascriptEnabled: true,// antd less file 启用 js 解析
                        }
                    }
                ]
            },
        ]
    },
    optimization: {
        splitChunks: {
            chunks: "all",
            cacheGroups: {
                // 提取 node_modules 中代码
                vendors: {
                    test: /[\\/]node_modules[\\/]/,  // 指定是node_modules下的第三方包
                    name: "vendors", // 打包后的文件名，任意命名
                    chunks: "all"
                },
                commons: {
                    // async 设置提取异步代码中的公用代码
                    chunks: "async",
                    name: 'commons-async',
                    /**
                     * minSize 默认为 30000
                     * 想要使代码拆分真的按照我们的设置来需要减小 minSize
                     * 只要超出就生成一个新包
                     */
                    minSize: 30000,
                    // 至少为两个 chunks 的公用代码
                    minChunks: 2
                }
            }
        },
        /**
         * 对应原来的 minchunks: Infinity
         * 提取 webpack 运行时代码
         * 直接置为 true 或设置 name
         */
        runtimeChunk: {
            name: 'manifest'
        }
    },
    plugins: [

        // 提取css
        new MiniCssExtractPlugin({
            filename: "css/[name].[chunkhash:8].css",
            chunkFilename: "css/[name].[chunkhash].css",
        }),

        // autoprefixer 是 postcss-loader 的 插件，需要在这里进行 autoprefixer 插件的配置
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

        new BundleAnalyzer.BundleAnalyzerPlugin(),//为了更好的分析我们的拆分是否合理，我们可以配置一个 bundle 组成分析的插件。
    ],
};
