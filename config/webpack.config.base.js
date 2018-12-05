const path = require('path');
const root = path.resolve(__dirname, '../');
const src = path.resolve(root, 'src');

const CleanWebpackPlugin = require("clean-webpack-plugin");//清空文件夹
const HtmlWebpackPlugin = require('html-webpack-plugin');//html模板

const env = process.env.NODE_ENV;
const htmlWebpackPluginProductionConfig = {
    removeComments: true, //移除HTML中的注释
    collapseWhitespace: true, //删除空白符与换行符
    minifyJS: true,// 压缩页面中的css
    minifyCSS: true,// 压缩页面中的js
};

module.exports = {
    mode: env,
    module:{
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: 'babel-loader',
                // query: {compact: false}
            },
            {
                test: /\.json$/,
                exclude: /node_modules/,
                type: "javascript/auto",
                loader: "json-loader"
            },
            /*{
                test: /\.(svg|png|jpe?g|gif|mp4|webm)(\?\S*)?$/,
                loader: env === 'development' ? 'url-loader?limit=8192&name=images/[name].[ext]' : 'url-loader?limit=8192&name=images/[name].[hash:8].[ext]'
            },*/
            /*{
                test: /\.html$/,
                use: {
                    loader: 'html-loader'
                }
            },*/
            {
                test:/\.(png|jpe?g|gif|svg)$/,
                use:[
                    {
                        loader: "url-loader",
                        options: {
                            name: env === 'development' ? "[name].[ext]" : '[name].[hash:8].[ext]',
                            limit: 8192, // size <= 1kib
                            outputPath: "images",
                            // publicPath: "../"
                        }
                    }
                ]
            },
            {
                test: /\.(woff2|woff|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: env === 'development' ? 'fonts/[name].[ext]' : 'fonts/[name].[hash:8].[ext]',
                }
            }
        ]
    },

    externals: {
        jquery  : 'jQuery',
        BMap    : 'BMap',
    },

    //入口文件配置解析类型
    resolve: {
        //路径优化
        alias:{
            '@SRC'         :path.resolve(root,'src/'),
            '@COMPONENTS'  :path.resolve(root,'src/components'),
            '@JAVASCRIPTS' :path.resolve(root,'src/javascripts'),
            '@STYLES'      :path.resolve(root,'src/styles'),
            '@IMAGES'      :path.resolve(root,'src/images'),
            '@STORES'      :path.resolve(root,'src/stores'),
            '@TOOLS'       :path.resolve(root,'src/tools')
        },
        extensions  : ['.js', '.jsx', '.json', '.less'],//自动扩展文件后缀名
        // modules     : [ 'node_modules' ],
    },
    plugins: [
        // new CleanWebpackPlugin(['dist']),// 清空指定文件夹
        new CleanWebpackPlugin(['dist'], {
            root    : root,
            verbose : false,
        }),
        new HtmlWebpackPlugin({
            title : 'React SPA应用',//标题名称
            filename : 'index.html', //输出入口文件
            template : path.resolve(src, 'templates/index.html'), //模板文件路径
            // showErrors:true,//编译错误警告显示到页面上
            minify: env === 'development' ? false : htmlWebpackPluginProductionConfig,
        }),
    ]
};
