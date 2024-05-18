const http = require('node:http')
const next = require('next')
const socket = require('socket.io')

const dev = process.env.NODE_ENV !== 'production'
const hostname = 'localhost'
const port = 3000
const app = next({ dev, hostname, port })
const handler = app.getRequestHandler()

const MOCK_POST = {
  'userId': 15,
  'id': 4412,
  'title': 'at nam consequatur ea labore ea harum',
  'content': 'cupiditate quo est a modi nesciunt soluta\nipsa voluptas error itaque dicta in\nautem qui minus magnam et distinctio eum\naccusamus ratione error aut'
}

app.prepare().then(() => {
  const httpServer = http.createServer(handler)

  const io = new socket.Server(httpServer)

  io.on('connection', (socket) => {
    // Send fake message after 10 seconds
    setTimeout(() => {
      socket.emit('newPost', MOCK_POST)
    }, 10000)
  })

  httpServer
    .once('error', (err) => {
      console.error(err)
      process.exit(1)
    })
    .listen(port, () => {
      console.log(`> Ready on http://${hostname}:${port}`)
    })
})