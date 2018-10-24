module.exports = getJsModuleRules = () => ([
  {
    test: /\.vue(\.html)?$/,
    include: /src/,
    loader: 'vue-loader',
    options: {
      loaders: {
        js: 'awesome-typescript-loader?silent=true'
      }
    }
  },
  // https://github.com/s-panferov/awesome-typescript-loader
  // TS module for webpack
  {
    test: /\.(ts|tsx)?$/,
    include: /src/,
    use: 'awesome-typescript-loader?silent=true'
  },
]);
