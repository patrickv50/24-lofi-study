const express = require('express')
const app = express()
const http = require('http')
const server = http.createServer(app)
const { Server } = require('socket.io')
const cors = require('cors');
const io = new Server(server, {
  cors: {
    origin: ["https://24-lofi-study.vercel.app","http://localhost:3000"],
  },
})
app.use(cors());
io.on('connection', (socket) => {
  let total = io.engine.clientsCount;
  console.log('connect. New: ',total)
  io.emit('updateCount', total)
  socket.on('disconnect', () => {
    let update = io.engine.clientsCount;
    console.log('disconnected. New: ', update)
    io.emit('updateCount', update)
  })
  socket.on('shareGif',(data)=>{
    io.emit('showSharedGif',data.name)
    console.log(data)
  })
})
app.get('/api',(req,res)=>{
  res.send("HELLO")
})
server.listen(process.env.PORT ||5000, () => {
  console.log("SERVER UP")
})