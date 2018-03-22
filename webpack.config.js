module.exports = {
  entry: './src/app.js',
  output: {
    path: __dirname,
    filename: 'bundle.js'
  },
  devtool: "cheap-module-eval-source-map",
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        // modules: falseを指定すると、
        // モジュールの形式の変換をしない。(デフォルトはCommonJS)
        // これによってwebpackが不要なモジュールを削除できる(tree shaking)
        // らしい。
        query: { presets: [['env', { 'modules': false }], 'react'] }
      },
      {
        test: /\.jsx?$/,
        enforce: 'pre',
        loader: 'eslint-loader',
        exclude: /node_modules/,
        options: {
          parser: 'babel-eslint',
          baseConfig: {
            extends: ['semistandard-react']
          }
        }
      }
    ]
  }
};
