const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CheckerPlugin = require('awesome-typescript-loader').CheckerPlugin;
const bundleOutputDir = './wwwroot/dist';
const VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = (env) => {
    const isDevBuild = !(env && env.prod);

    return [{
        stats: { modules: false },
        context: __dirname,
        resolve: {
            extensions: ['.js', '.ts'],
            alias: {
                vue: 'vue/dist/vue.js'
            }
        },
        entry: { 'main': './ClientApp/boot.ts' },
        mode: isDevBuild ? "development" : "production",
        ...(isDevBuild
            ? { devtool: 'eval-source-map' }
            : {}
        ),
        module: {
            rules: [
                {
                    test: /\.vue\.html$/,
                    include: /ClientApp/,
                    loader: 'vue-loader',
                    options: {
                        loaders: {
                            js: 'awesome-typescript-loader?silent=true'
                        }
                    }
                },
                { test: /\.ts$/, include: /ClientApp/, use: 'awesome-typescript-loader?silent=true' },
                {
                    test: /\.css$/,
                    use: [
                        MiniCssExtractPlugin.loader,
                        'css-loader'
                    ]
                },
                {
                    test: /\.(png|jpg|jpeg|gif|svg)$/,
                    use: 'url-loader?limit=25000'
                }
            ]
        },
        output: {
            path: path.join(__dirname, bundleOutputDir),
            filename: '[name].js',
            publicPath: 'dist/'
        },
        plugins: [
            new VueLoaderPlugin(),
            new CheckerPlugin(),
            new webpack.DefinePlugin({
                'process.env': {
                    NODE_ENV: JSON.stringify(isDevBuild ? 'development' : 'production')
                }
            }),
            new webpack.DllReferencePlugin({
                context: __dirname,
                manifest: require('./wwwroot/dist/vendor-manifest.json')
            }),
            new MiniCssExtractPlugin({
                filename: 'site.css'
            }),
            new webpack.ProvidePlugin({ $: 'jquery', jQuery: 'jquery', "window.jQuery": "jquery" }), // Maps these identifiers to the jQuery package (because Bootstrap expects it to be a global variable)
        ].concat(isDevBuild ? [
            // Plugins that apply in development builds only
            new webpack.SourceMapDevToolPlugin({
                filename: '[file].map', // Remove this line if you prefer inline source maps
                moduleFilenameTemplate: path.relative(bundleOutputDir, '[resourcePath]') // Point sourcemap entries to the original file locations on disk
            })
        ] : [
                // Plugins that apply in production builds only
                new webpack.optimize.UglifyJsPlugin(),
            ])
    }];
};
