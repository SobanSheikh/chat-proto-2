const express = require("express");
const app = express();
const mongoose = require("mongoose")
mongoose.set('strictQuery', true);
const http = require("http");
const {Server} =  require("socket.io");
const cors = require("cors");
const bodyParser = require("body-parser")
const router = require('./router');
const dotenv = require("dotenv");
dotenv.config()
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}))
app.use("/",router);
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
server.listen(process.env.PORT,()=>{ 
  console.log("Server is running", process.env.PORT);
})

// data base connection
const Connection=async()=>{
    await mongoose.connect(process.env.URL,{
        useNewUrlParser: true,
        useUnifiedTopology: true 
   
   }).then(()=>{
    console.log("database connected")
   }).catch((e)=>{
    console.log(e.message)
   })
}

Connection()
