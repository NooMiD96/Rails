const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    entry: {
        'vendor-styled': ['styled-components'],
        'main-client': [
            'babel-polyfill',
            path.join(__dirname, './ClientApp/boot-client.jsx'),
        ],
    },
    //https://webpack.js.org/configuration/stats/
    // Add built modules information
    // stats: false,
    //https://webpack.js.org/configuration/module/
    module: {
        rules: [{
            test: /\.css$/,
            use: ExtractTextPlugin.extract({
                fallback: require.resolve('style-loader'),
                use: [
                    {
                        loader: require.resolve('css-loader'),
                        options: {
                            importLoaders: 1,
                            minimize: true,
                            sourceMap: true,
                        },
                    },
                ],
            }),
        }],
    },
    plugins: [
        // create html file
        new HtmlWebpackPlugin({
            inject: true,
            template: './index.html'
        }),
        new webpack.DefinePlugin({ 'process.env.NODE_ENV': '"production"' }),
        //https://webpack.js.org/guides/migrating/#uglifyjsplugin-sourcemap
        //Plugins that apply in production builds only
        new webpack.optimize.UglifyJsPlugin({
            minimize: true,
            parallel: true,
            uglifyOptions: {
                warnings: true,
            }
        }),
        //https://github.com/webpack-contrib/extract-text-webpack-plugin
        //load css styles in another file
        new ExtractTextPlugin(
            'static/css/site.css',
        )
    ]
};