const { socketController } = require("../sockets/controller");
const express = require("express");



class Server{

    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.server = require("http").createServer(this.app);
        this.io = require('socket.io')(this.server);

        this.path = {};



    }

    middlewares(){
        this.app.use(cors());
        this.app.use(express.static("public"));
    }

    routes(){

    }

    sockets(){
        this.io.on("connection", socketController)
    }

    listen(){
        this.server.listen(this.port,  ()=>{
            console.log("Servidor corriendo en el puerto", this.port);
        })
    }


}

module.exports = Server;