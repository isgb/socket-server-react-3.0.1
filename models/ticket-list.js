const Ticket = require('./ticket');

class TicketList{
    
    constructor(){
        this.ultimoNumero = 0;
        this.pendientes = [];
        this.asignados = [];
    }

    // Método para obtener el siguiente ticket
    get siguienteNumero(){
        this.ultimoNumero++;
        return this.ultimoNumero;
    }

    // 3 que se veran en las tarjetas y 10 en el historial
    get ultimos13(){
        return this.asignados.slice(0,13);
    }

    // Método para crear un nuevo ticket
    get crearTicket(){
        const nuevoTicket = new Ticket(this.siguienteNumero);
        this.pendientes.push(nuevoTicket);
        return nuevoTicket;
    }

    // Método para asignar un ticket a un agente
    asignarTicket(agente){
        if(this.pendientes.length === 0){
            return null;
        }
        const siguienteTicket = this.pendientes.shift();
        siguienteTicket.agente = agente;
        siguienteTicket.escritorio = agente.escritorio;
        this.asignados.unshift(siguienteTicket);
        return siguienteTicket;
    }

}

module.exports = TicketList;