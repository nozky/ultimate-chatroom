
const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

const path = require('path')

const PORT = process.env.PORT || 3000


// route
app.get('/',(req,res) => {
  res.sendFile(path.join(__dirname,'./index.html'));
})

// new user connected notification
io.on('connection',(socket) =>{
  io.emit('chat message', 'Someone is connected')
    // user disconnected
    socket.on('disconnect',() =>{
      io.emit('chat message', 'Someone is disconnected, bye!!!')
    })
})

// send message
io.on('connection',(socket) =>{
  socket.on('chat message', (msg) =>{
    io.emit('chat message', msg)
  })
})





// listening to port
http.listen(PORT, ()=>{console.log(`Listening on ${PORT}`)})