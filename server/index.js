const express = require("express");
const app = express();
const http = require("http");
const {Server} =  require("socket.io");
const cors = require("cors");
const router = require('./router');

app.use(cors());
app.use(router);
const server = http.createServer(app);
const io = new Server(server,{
    cors:{
        origin:true,
        methods:["GET","POST"]
    }
});

io.on("connection",(socket)=>
    {
        console.log('Users:: ${socket.id}')
        socket.on("send_message",(data)=>{
            socket.broadcast.emit("receive_message",data)
            
        })

    })
server.listen(process.env.PORT || 5000,()=>{ 
  console.log("Server is running");
})