const socketio = require('socket.io');
const parseStringAsArray = require('./utils/parseStringAsArray');
const calculateDistance = require('./utils/calculateDistance');

const connections = [];
let io;

exports.setupWebsocket = (server) => {
    io = socketio(server);

    io.on('connection', socket => {

        const { latitude, longitude, techs } = socket.handshake.query;
       
        connections.push({
           id: socket.id,
           coordinates: {
               latitude: Number(latitude),
               longitude: Number(longitude),
           },
           techs: parseStringAsArray(techs)
        });

        console.log(connections);
        setTimeout(() =>{
            socket.emit('message', 'Hello Bootweb');
        },3000)
    });
}

exports.findConnections = (coordinates, techs) => {
    return connections.filter(connection => {
        return calculateDistance(coordinates, connection.coordinates) < 11
        && connection.techs.some(item => techs.includes(item))
    })
}

exports.sendMessage = (to, message, data) => {
    to.forEach(connection => {
        io.to(connection.id).emit(message, data);
    });
}