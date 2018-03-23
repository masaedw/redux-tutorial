module.exports = {
  entry: './src/app.tsx',
  output: {
    path: __dirname,
    filename: 'bundle.js'
  },
  devtool: 'cheap-module-eval-source-map',
  resolve: {
    extensions: ['.ts', '.tsx', '.js']
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {loader: 'ts-loader'}
        ]
      }
    ]
  }
};
