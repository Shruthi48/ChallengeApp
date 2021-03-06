const htmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const extractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');

const isProd = process.env.NODE_ENV === 'production';
const cssProd = extractTextPlugin.extract({
    fallback: "style-loader",
    use: ["css-loader", "sass-loader"],
    publicPath: "/dist"
});
const cssDev = ["style-loader", "css-loader", "sass-loader"];

const isConfig = isProd ? cssProd : cssDev;

module.exports = {
    entry: {
        app: './src/app.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].bundle.js'
    },
    module: {
        rules: [
            {
                test: /.scss$/,
                use: isConfig
            },
            {
                test: /.js$/,
                exclude: /node_modules/,
                use: 'babel-loader'
            }
        ]
    },
    devServer: {
        contentBase: path.resolve(__dirname, 'dist'),
        compress: true,
        port: 9000,
        stats: "errors-only",
        open: true,
        hot: true,
        https: true
    },
    plugins: [
      new htmlWebpackPlugin({
        title: 'Webpack project',
        template: './src/index.html',
        minify: {
           collapseInlineTagWhitespace: true,
           collapseWhitespace: true
        },
       hash: true
      }),
        new extractTextPlugin({
            filename: "bundle.css",
            disable: !isProd,
            allChunks: true
        }),
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin()
    ]
}