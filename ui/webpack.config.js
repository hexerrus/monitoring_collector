var webpack = require('webpack');

module.exports = {
  entry: './src/index.jsx',
  output: {
      filename: 'build.js',
      path: '../public/build/',
    },
  resolve: {
      extensions: [
        '',
        '.webpack.js',
        '.web.js',
        '.ts',
        '.tsx',
        '.js',
        '.jsx',
      ],
    },
  module: {
      loaders: [
          { test: /\.jsx?$/, loader: 'babel-loader' },
          { test: /\.scss$/,
            loaders: [
             'style',
             'css',
             'sass',
          ],
          },
          { test: /\.css$/,
            loaders: [
              'style', 'css',
            ],
          },
          {
              test: /\.(png|jpg|jpeg|gif|svg|woff|woff2)$/,
              loader: 'url-loader?limit=10000000',
            },
          {
              test: /\.(eot|ttf|wav|mp3)$/,
              loader: 'file-loader',
            },
          ],
    },
    plugins: [
      new webpack.optimize.UglifyJsPlugin({
        include: /\.js$/,
        debug: true,
        minimize: true,
        sourceMap: false,
        output: {
          comments: false,
        },
        compressor: {
          warnings: false,
        }
     })
    ]
};
