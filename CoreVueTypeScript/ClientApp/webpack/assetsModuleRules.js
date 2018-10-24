const StringReplacePlugin = require('string-replace-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = getAssetsModuleRules = (
  fileNameTemplate
) => ([
  // https://webpack.js.org/loaders/url-loader/
  // https://webpack.js.org/loaders/file-loader/
  {
    test: /\.(png|jpg|jpeg|gif|eot|ttf|woff)$/,
    loader: 'url-loader',
    options: {
      limit: 8192,
      name: `${fileNameTemplate}.[ext]`,
    },
  },
  {
    test: /\.css$/,
    use: [
      MiniCssExtractPlugin.loader,
      require.resolve('css-loader')
    ]
  },
]);
