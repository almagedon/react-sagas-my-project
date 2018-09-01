const path = require('path');
const webpack = require('webpack');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const appHtmlTitle = 'Webpack Boilerplate';

const {
  entry,
  paths,
  outputFiles,
  rules,
  plugins,
  resolve,
  stats,
  IS_PRODUCTION,
} = require('./webpack/config');


plugins.push(
  // Builds index.html from template
  new HtmlWebpackPlugin({
    template: path.join(paths.public, 'index.ejs'),
    inject: 'body',
    title: appHtmlTitle,
    minify: {
      collapseWhitespace: true,
      minifyCSS: true,
      minifyJS: true,
      removeComments: true,
      useShortDoctype: true,
    },
  })
);
// Webpack config
console.log(paths.build,outputFiles.client)
module.exports = {
  entry,
  output: {
    path: paths.build,
    //publicPath: paths.build,
    publicPath: '/',
    filename: outputFiles.client,
  },
  devtool: IS_PRODUCTION ? false : 'cheap-eval-source-map',
  resolve,
  plugins,
  module: {
    rules,
  },
  stats,
  optimization: {
    // Minification
    minimize: IS_PRODUCTION,
    // Creates vendor chunk from modules coming from node_modules folder
    splitChunks: {
      cacheGroups: {
        vendor: {
          chunks: 'initial',
          test: path.resolve(__dirname, 'node_modules'),
          name: 'vendor',
          filename: outputFiles.vendor,
          enforce: true,
        },
      },
    },
  },
}