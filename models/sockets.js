const TicketList = require("./ticket-list");


class Sockets {

    constructor( io ) {

        this.io = io;

        // Crear la instancia de nuestro socket server
        this.ticketList = new TicketList();

        this.socketEvents();
    }

    socketEvents() {
        // On connection
        this.io.on('connection', ( socket ) => {

            console.log('Cliente conectado');

            // Escuchar evento: mensaje-to-server
            socket.on('mensaje-to-server', ( data ) => {
                console.log( data );
                
                this.io.emit('mensaje-from-server', data );
            });

            socket.on('solicitar-ticket', (data,callback) => {
                console.log('Nuevo ticket generado');
                const nuevoTicket = this.ticketList.crearTicket;
                console.log(nuevoTicket);
                callback(nuevoTicket);
            });

            socket.on('siguiente-ticket-trabajar', ({ agente, escritorio }, callback) => {
                const suTicket = this.ticketList.asignarTicket(agente, escritorio);
                callback(suTicket);
                this.io.emit('ticket-asignado', this.ticketList.ultimos13);
            });
            
        
        });
    }


}


module.exports = Sockets;