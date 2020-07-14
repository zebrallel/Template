const createBaseConfig = require('./webpack.base');
const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const path = require('path');

function resolve(_) {
  return path.resolve(__dirname, '..', _);
}

module.exports = function ({ appEnv }) {
  return merge(createBaseConfig({ isProd: false }), {
    mode: 'development',
    entry: [resolve('src/index.ts')],
    output: {
      publicPath: '/',
    },
    devServer: {
      hot: true,
      hotOnly: true,
      overlay: true,
      quiet: true,
      inline: true,
      compress: true,
      disableHostCheck: true,
      clientLogLevel: 'none',
      historyApiFallback: {
        disableDotRule: true,
      },
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: 'ejs-compiled-loader?1=1!templates/index.ejs',
        inject: true,
        templateParameters: {
          __APP_ENV__: appEnv,
        },
        filename: 'index.html',
      }),
      new webpack.HotModuleReplacementPlugin(),
      new webpack.DefinePlugin({
        __APP_ENV__: JSON.stringify(appEnv),
      }),
    ],
  });
};
