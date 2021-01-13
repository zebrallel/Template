const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

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
      filename: '[name].js',
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
            {
              loader: 'less-loader',
              options: {
                sourceMap: false,
              },
            },
          ],
        },
        {
          test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
          loader: 'url-loader',
          options: {
            limit: 10000,
            name: resolve('dist/img/[name].[hash:7].[ext]'),
          },
        },
        {
          test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
          loader: 'url-loader',
          options: {
            limit: 10000,
            name: resolve('dist/media/[name].[hash:7].[ext]'),
          },
        },
        {
          test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
          loader: 'url-loader',
          options: {
            limit: 10000,
            name: resolve('dist/fonts/[name].[hash:7].[ext]'),
          },
        },
      ],
    },
  };
};
