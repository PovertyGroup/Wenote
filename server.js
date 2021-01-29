const { createBundleRenderer } = require('vue-server-renderer')

function createRenderer (bundle, options) {
    return createBundleRenderer(bundle, Object.assign(options, {
        runInNewContext: false,
        template: require('fs').readFileSync('./public/index.html', 'utf-8')
    }))
}

const bundle = require('./dist/vue-ssr-server-bundle.json')
const clientManifest = require('./dist/vue-ssr-client-manifest.json')

const renderer = createRenderer(bundle, {
    clientManifest
})

const express = require("express")
const server = express()

server.use(express.static('./dist'))

server.get('*', (req, res) => {
    const context = { url: req.url, title: '12312' }
    renderer.renderToString(context, (err, html) => {
      if (err) {
        console.log(err)
        res.status(500).end('Internal Server Error')
        return
      }
      res.end(html)
    })
})

server.listen(8080, '0.0.0.0', () => {
  const os = require('os');

  function getIpAddress() {
    var ifaces=os.networkInterfaces()

    for (var dev in ifaces) {
      let iface = ifaces[dev]

      for (let i = 0; i < iface.length; i++) {
        let {family, address, internal} = iface[i]

        if (family === 'IPv4' && address !== '127.0.0.1' && !internal) {
          return address
        }
      }
    }
  }

  let ipAddress = getIpAddress()

  console.log('Server is running...')
  console.log('-> http://localhost:8080')
  console.log(`-> http://${ipAddress}:8080`)
})