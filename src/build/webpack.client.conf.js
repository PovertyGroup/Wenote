const merge = require('webpack-merge')
const baseConfig = require('./webpack.base.conf.js')
// const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin')
const path = require('path')

module.exports = merge(baseConfig, {
  entry: './entry-client.js',
  optimization: {
    runtimeChunk: {
       name: 'manifest'
    },
    splitChunks: {
       maxInitialRequests: 10,
       cacheGroups: {
          common: {
             name: 'common',
          }
       }
    }
  },
  plugins: [
    new VueSSRClientPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../../public/index.html'),
      filename: 'index.html'
    })
  ]
})