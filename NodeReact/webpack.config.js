const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');

module.exports = (env) => {
    const isDevBuild = !((env && env.prod) || env === true);

    // Configuration in common to both client-side and server-side bundles
    const sharedConfig = {
        output: {
            path: path.join(__dirname, './dist/client'),
            filename: 'static/js/[name].js',
            chunkFilename: 'static/js/[name].[chunkhash].bundle.js',
            publicPath: '/',
        },
        //https://webpack.js.org/configuration/resolve/#resolve-extensions
        //can import files without extansions
        resolve: {
            extensions: ['.js', '.jsx'],
            alias: {
                clientApp: path.resolve('./ClientApp'),
                components: path.resolve('./ClientApp/Components'),
                core: path.resolve('./ClientApp/Core'),
            },
        },
        module: {
            rules: [
                {
                    test: /\.(js|jsx)$/,
                    enforce: 'pre',
                    include: /ClientApp/,
                    use: { loader: "eslint-loader" },
                },
                {
                    test: /\.(js|jsx)$/,
                    include: /ClientApp/,
                    use: { loader: "babel-loader" }
                },
                {
                    test: /\.(png|jpg|jpeg|gif|svg)$/,
                    loader: 'file-loader',
                    options: { name: 'static/media/[name].[hash:8].[ext]' },
                },
                //https://webpack.js.org/loaders/url-loader/
                //looks like need install, need check
                {
                    test: /\.(png|jpg|jpeg|gif|svg)$/,
                    loader: 'url-loader?limit=20000',
                    options: { name: 'static/media/[name].[hash:8].[ext]' },
                },
            ],
        },
        plugins: [
            // Splite app files
            new webpack.optimize.CommonsChunkPlugin({
                children: true,
                async: true,
            }),
            new webpack.NormalModuleReplacementPlugin(/\/iconv-loader$/, require.resolve('node-noop')), // Workaround for https://github.com/andris9/encoding/issues/16
            new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
        ],
    };

    const clientConfig = isDevBuild
        ? merge(sharedConfig, require('./webpack.config.dev'))
        : merge(sharedConfig, require('./webpack.config.prod'));

    return clientConfig;
};