const path = require('path');
const merge = require('webpack-merge');
const webpackConfig = require('./webpack.config');
const {
  IS_PRODUCTION,
  paths,
  stats,
  outputFiles,
} = require('./webpack/config');


module.exports = merge(webpackConfig, {

    devtool: 'eval',

    /*output: {
        pathinfo: true,
        publicPath: 'http://localhost:8080/',
        path: paths.build,
        filename: outputFiles.client,
    },*/

    devServer: {
      contentBase: IS_PRODUCTION ? paths.build : paths.source,
      historyApiFallback: true,
      compress: IS_PRODUCTION,
      inline: !IS_PRODUCTION, // Change to false for IE10 dev mode
      hot: !IS_PRODUCTION,
      host: '0.0.0.0',
      open:true,
      disableHostCheck: true, // To enable local network testing
      overlay: true,
      stats,
  }
});
