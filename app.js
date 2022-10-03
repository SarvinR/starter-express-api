const express = require("express")

const app = express()
const server = app.listen(8080, function(req, res){
    console.log("Running Page...")
})

const socketio = require("socket.io")
const io = socketio(server)


app.use(express.static('./public'))

// Runs when user Connects
io.on("connection", socket =>{
    console.log("New WS Connection...");
    socket.emit("transmit", "Hello EveryOne")

    socket.on("transmit", msg =>{
        console.log(msg)
        // io.emit("message", msg)
    })
})