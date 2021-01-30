'use strict'
const path = require('path')
const utils = require('./utils')
const vueLoaderConfig = require('./vue-loader.conf')

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

const VueLoaderPlugin = require('vue-loader/lib/plugin')
// const ExtractTextPlugin = require('extract-text-webpack-plugin')
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  context: path.resolve(__dirname, '../'),
  output: {
    path: path.resolve(__dirname, '../../dist'),
    publicPath: process.env.NODE_ENV == 'production' ? '/':'/dist/',
    filename: '[name].[chunkhash].js'
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('../src'),
    }
  },
  module: {
    noParse: /^(vue|vue-router|vuex|vuex-router-sync)$/,
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
      {
        test: /\.css$/,
        use: [
          'vue-style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2,
              modules: {
                localIdentName: '[local]_[hash:base64:8].css'
              },
            }
          },
          'postcss-loader'
        ]
      },
      {
        test: /\.m?jsx?$/,
        use: [ 'cache-loader', 'thread-loader', 'babel-loader' ],
        include: [ resolve('src'), resolve('test'), resolve('node_modules/webpack-dev-server/client') ]
      },
      {
        test: /\.pug$/,
        use: 'pug-plain-loader'
      },
      {
        enforce: 'pre',
        test: /\.(vue|(j|t)sx?)$/,
        exclude: [
          /node_modules/,
          resolve('node_modules/@vue/cli-service/lib')
        ],
        use: [
          {
            loader: 'eslint-loader',
            options: {
              extensions: [
                '.js',
                '.jsx',
                '.vue'
              ],
              cache: true,
              emitWarning: false,
              emitError: false,
              formatter: undefined
            }
          }
        ]
      },
      {
        test: /\.(png|jpe?g|gif|svg|webp)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 4096,
          name: utils.assetsPath('img/[name].[hash:8].[ext]'),
          fallback: {
            loader: 'file-loader',
            options: {
              name: utils.assetsPath('img/[name].[hash:8].[ext]')
            }
          }
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 4096,
          name: utils.assetsPath('media/[name].[hash:8].[ext]'),
          fallback: {
            loader: 'file-loader',
            options: {
              name: utils.assetsPath('media/[name].[hash:8].[ext]')
            }
          }
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 4096,
          name: utils.assetsPath('fonts/[name].[hash:8].[ext]'),
          fallback: {
            loader: 'file-loader',
            options: {
              name: utils.assetsPath('fonts/[name].[hash:8].[ext]')
            }
          }
        }
      }
    ]
  },
  node: {
    // prevent webpack from injecting useless setImmediate polyfill because Vue
    // source contains it (although only uses it if it's native).
    setImmediate: false,
    // prevent webpack from injecting mocks to Node native modules
    // that does not make sense for the client
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty'
  },
  plugins: [
    new VueLoaderPlugin(),
    // new ExtractTextPlugin({
    //   filename: utils.assetsPath('css/[name].[hash:8].css'),
    // }),
    new CopyPlugin([
        {
          from: "public/favicon.ico",
          to: "dist/",
          context: path.resolve(__dirname, '..', '..'),
        },
      ],
    ),
  ]
}