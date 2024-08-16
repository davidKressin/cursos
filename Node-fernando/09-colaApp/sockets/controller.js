

const socketController = (socket)=>{

    socket.emit("ultimo-ticket", ticketControl.ultimo);
    socket.emit("estado-actual", ticketControl.ultimos4);
    socket.emit("tickets-pendientes", ticketControl.tickets.length);

    socket.on("siguiente-ticket", (payload, callback)=>{
        const siguiente = ticketControl.siguiente();
        callback(siguiente);
        socket.broadcast
    })

}

module.exports = {
    socketController
}