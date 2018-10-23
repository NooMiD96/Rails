module.exports = getJsModuleRules = () => ([
  // https://github.com/s-panferov/awesome-typescript-loader
  // TS module for webpack
  {
    test: /\.(ts|tsx)?$/,
    include: /src/,
    use: 'awesome-typescript-loader?silent=true'
  },
]);