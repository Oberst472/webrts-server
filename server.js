const express = require('express')
const app = express()
const path = require('path')
const server = require('http').Server(app)
const io = require('socket.io')(server)

const { v4: uuidv4 } = require('uuid')

const allowCrossDomain = function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'GET,PUT,PATCH,POST,DELETE')
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization')

  next()
}

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(allowCrossDomain)

app.get('/', (req, res) => {
  // res.sendFile('public/wlol.html', { root: __dirname })
})

app.get('/api/test', (req, res) => {
  console.log(req)
  res.status(200).json({ data: 'success' })
})

app.get('/:room', (req, res) => {
  res.render('room', { roomId: req.params.room })
})

io.on('connection', (socket) => {
  socket.on('join-room', (roomId, userId) => {
    console.log(roomId, userId)
  })
})

const PORT = process.env.PORT || 3000
server.listen(PORT)
