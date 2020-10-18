const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const path = require('path');

module.exports = {
  entry: './src/index.ts',
  devtool: 'eval-source-map',
  devServer: {
    contentBase: path.join(__dirname, 'public'),
    compress: true,
    port: 9001,
    proxy: {
      '/.netlify/functions': {
        target: 'http://0.0.0.0:9000',
        pathRewrite: { "^/\\.netlify/functions" : ''}
      }
    }
  },
  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      },
      {
        test:  /\.ts/,
        use: 'ts-loader',
        include: [path.resolve(__dirname, 'src')],
        exclude: [
          path.resolve(__dirname, 'scripts'),
          path.resolve(__dirname, 'functions'),
          path.resolve(__dirname, 'built-lambda'),
        ]
      },
      {
        test: /\.html$/,
        loader: 'html-loader',
        include: [path.resolve(__dirname, 'src')],
        exclude: [
          path.resolve(__dirname, 'src/index.html'),
          path.resolve(__dirname, 'scripts'),
          path.resolve(__dirname, 'functions'),
          path.resolve(__dirname, 'built-lambda'),
        ]
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
        include: [path.resolve(__dirname, 'src')],
        exclude: [
          path.resolve(__dirname, 'scripts'),
          path.resolve(__dirname, 'functions'),
          path.resolve(__dirname, 'built-lambda'),
        ]
      }
    ]
  },
  resolve: {
    modules: [path.resolve(__dirname, "src"), "node_modules"],
    extensions: ['.ts', '.js'],
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'public')
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Parahyba Valley',
      template: './src/index.html',
    })
  ],
  optimization: {
    minimizer: [new UglifyJsPlugin()],
  },
}
