const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  mode: 'development',
  entry: {
    out_a: './src/a.js',
  },
  output: {
    path: path.resolve(__dirname, 'dist_tests'),
    publicPath: '/',
  },
  optimization: {
    runtimeChunk: {
      name: 'runtime'
    }
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          // {
          //   loader: MiniCssExtractPlugin.loader,
          // },
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: [
                require('autoprefixer')()
              ]
            }
          }
        ],
      },
    ],
  },
  plugins: [
    // new MiniCssExtractPlugin({
    //   filename: 'css/[name].[contenthash:8].css',
    //   chunkFilename: 'css/[name].[contenthash:8].chunk.css',
    // }),
  ],
};
