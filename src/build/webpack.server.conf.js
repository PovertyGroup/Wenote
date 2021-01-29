const merge = require('webpack-merge')
const baseConfig = require('./webpack.base.conf.js')
const nodeExternals = require('webpack-node-externals')
const VueSSRServerPlugin = require('vue-server-renderer/server-plugin')

module.exports = merge(baseConfig, {
  entry: './entry-server.js',
  target: 'node',
//   devtool: 'source-map',
  output: {
    libraryTarget: 'commonjs2'
  },
  externals: nodeExternals({
    allowlist: /\.(html)$/
  }),
  plugins: [
    new VueSSRServerPlugin()
  ]
})