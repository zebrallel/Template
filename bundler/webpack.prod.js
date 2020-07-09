const createBaseConfig = require('./webpack.base');
const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const safePostCssParser = require('postcss-safe-parser')

function resolve(_) {
  return path.resolve(__dirname, '..', _);
}

module.exports = function ({ appEnv }) {
  return merge(createBaseConfig({ isProd: true }), {
    mode: 'production',
    entry: [resolve('src/index.ts')],
    output: {
      publicPath: '/',
      filename: `js/[name].[chunkhash:8].js`,
      chunkFilename: `js/[name].[chunkhash:8].js`,
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
      new webpack.DefinePlugin({
        __APP_ENV__: JSON.stringify(appEnv),
      }),
      new MiniCssExtractPlugin({
        filename: 'css/[name].[contenthash:8].css',
        chunkFilename: 'css/[name].[contenthash:8].chunk.css',
      }),
    ],
    optimization: {
      minimize: true,
      minimizer: [
        new TerserPlugin({
          terserOptions: {
            parse: {
              ecma: 8,
            },
            compress: {
              ecma: 5,
              warnings: false,
              comparisons: false,
              inline: 2,
            },
            mangle: {
              safari10: true,
            },
            output: {
              ecma: 5,
              comments: false,
              ascii_only: true,
            },
          },
          parallel: true,
          cache: true,
          sourceMap: true,
        }),
        new OptimizeCSSAssetsPlugin({
          cssProcessorOptions: {
            parser: safePostCssParser,
            map: false,
          },
        }),
      ],
      moduleIds: 'hashed',
      chunkIds: 'named',
      splitChunks: {
        name: false,
        cacheGroups: {
          vendors: {
            name: 'vendors',
            test: (module) =>
              module.resource &&
              /\.js$/.test(module.resource) &&
              /node_modules/.test(module.resource),
            chunks: 'initial',
          },
        },
      },
      runtimeChunk: { name: 'runtime' },
    },
  });
};
