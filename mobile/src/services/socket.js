import socketio from 'socket.io-client';

const socket = socketio('https://onmistack-bend.herokuapp.com', {
    autoConnect: false,
});

function subsribeToNewDevs(subsribeFunction) {
    socket.on('new-dev', subsribeFunction);
}

function connect(latitude, longitude, techs) {
    socket.io.opts.query = {
        latitude,
        longitude,
        techs
    }
    socket.connect();
}

function disconnect() {
    if(socket.connected) {
        socket.disconnect();
    }
}

export {
    connect,
    disconnect,
    subsribeToNewDevs,
}