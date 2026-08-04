const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const path = require('path');
const ZipPlugin = require('zip-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');

const version = require('./src/manifest.json').version;
const name = require('./src/locale/en_GB/messages.json').appName.message;

module.exports = merge(common, {
  mode: 'production',
  performance: {
    // this is a browser extension loaded from local disk, not a website fetched
    // over a network per page view, so webpack's 244 KiB web-performance default
    // doesn't apply here. Budget set with headroom above actual current output.
    maxAssetSize: 1572864,
    maxEntrypointSize: 1572864
  },
  optimization: {
    minimize: true,
    minimizer: [
      new CssMinimizerPlugin({
        minify: CssMinimizerPlugin.cleanCssMinify
      }),
      new TerserPlugin({
        terserOptions: {
          format: {
            comments: false,
          },
        },
        extractComments: false,
      })
    ]
  },
  module: {
    rules: [{
      test: /\.css$/i,
      use: [MiniCssExtractPlugin.loader, 'css-loader'],
    }],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css'
    }),
    new ZipPlugin({
      path: path.resolve(__dirname, 'dist/extension'),
      filename: name + '_' + version + '.zip'
    })
  ]
});
