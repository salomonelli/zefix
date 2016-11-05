var path = require('path');
var webpack = require('webpack');
const webpackMerge = require('webpack-merge'); // used to merge webpack configs
const commonConfig = require('./webpack.config.common.js'); // the settings that are common to prod and dev

//

module.exports = function(options) {

  const ENV = options.ENV || 'development';
  const PORT = options.PORT || 3000;

  return webpackMerge(commonConfig, {
    // debug: true,
    devtool: 'source-map',
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new webpack.DefinePlugin({
        'ENV': JSON.stringify(ENV)
      })
    ],
    resolve: {
      extensions: ['', '.js', '.ts']
    },
    devServer: {
      port: PORT,
      host: '0.0.0.0',
      hot: true,
      inline: true,
      historyApiFallback: true
    },
  });
};
