const express = require('express')
const app = express()
const http = require('http')
const server = http.createServer(app)
const { Server } = require('socket.io')
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
  },
})

io.on('connection', (socket) => {
  let total = io.engine.clientsCount;
  console.log('connect. New: ',total)
  io.emit('updateCount', total)
  socket.on('disconnect', () => {
    let update = io.engine.clientsCount;
    console.log('disconnected. New: ', update)
    io.emit('updateCount', update)
  })
})

server.listen(5000, () => {
  console.log("SERVER UP")
})