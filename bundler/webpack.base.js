const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { get } = require('http');

function resolve(_) {
  return path.resolve(__dirname, '..', _);
}

function getStyleLoader(isProd) {
  return isProd
    ? {
        loader: MiniCssExtractPlugin.loader,
      }
    : {
        loader: 'style-loader',
      };
}

module.exports = function ({ isProd }) {
  return {
    output: {
      path: resolve('dist'),
    },
    resolve: {
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
      alias: {
        '@': resolve('src'),
      },
    },
    module: {
      strictExportPresence: true,
      rules: [
        {
          test: /\.(js|jsx|ts|tsx)$/,
          include: [resolve('src')],
          use: ['babel-loader'],
        },
        {
          test: /\.css$/,
          use: [
            getStyleLoader(isProd),
            {
              loader: 'css-loader',
              options: {
                importLoaders: 1,
              },
            },
          ],
        },
        {
          test: /\.less$/,
          use: [
            {
              loader: 'less-loader',
              options: {
                sourceMap: false,
              },
            },
            getStyleLoader(isProd),
            {
              loader: 'css-loader',
              options: {
                importLoaders: 1,
              },
            },
            {
              loader: 'postcss-loader',
              options: {
                sourceMap: false,
              },
            },
          ],
        },
      ],
    },
  };
};
