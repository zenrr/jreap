const path = require("path");
const uglify = require('uglifyjs-webpack-plugin');
const webpack = require('webpack');

const MiniCssExtractPlugin = require("mini-css-extract-plugin");


module.exports = {
    mode: 'development',
    entry: {
        main: './src/main.js'
    },
    devtool: 'source-map',
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: 'bundle.js'
    },
    //模块：例如解读css，图片如何转换，压缩
    module: {
        rules: [
            //css loader
            {
                test: /\.css$/,
                use: [{
                        loader: "style-loader"
                    },
                    {
                        loader: "css-loader"
                    }
                ]
            },
            {
                test: /\.ts?$/,
                loader: "ts-loader",
                exclude: /node_modules/
            }, {
                test: /\.(gif|png|jpg|svg|ttf|eot|woff|woff2)$/,
                loader: 'file?name=/wp-content/plugins/testplugin/[path][name].[ext]'
            }, {
                test: /\.scss$/,
                use: [
                    // fallback to style-loader in development
                    process.env.NODE_ENV !== 'production' ? 'style-loader' : MiniCssExtractPlugin.loader,
                    "css-loader",
                    "sass-loader"
                ]
            }, {
                test: require.resolve('jquery'),
                use: [{
                    loader: 'expose-loader',
                    options: 'jQuery'
                }, {
                    loader: 'expose-loader',
                    options: '$'
                }]
            }
        ]
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
        alias: {
            "bootstrap-sass$": "bootstrap-sass/assets/stylesheets/bootstrap"
        }
    },
    //插件，用于生产模板和各项功能
    plugins: [
        new uglify(),
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: "[name].css",
            chunkFilename: "[id].css"
        }),
        new webpack.HotModuleReplacementPlugin()
    ],
    //webpack开发服务功能
    devServer: {
        //设置基本目录结构
        contentBase: path.resolve(__dirname, '../dist'),
        //服务器的IP地址，可以使用IP也可以使用locaLhost
        host: 'localhost',
        //服务的压缩是否开启
        compress: true,
        //配置服务端口号
        port: 8888,
        hot: true // 设置页面引入 inline: true
    }
}