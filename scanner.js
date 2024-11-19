const net = require('net');

const scanPort = (host, port) => {
    return new Promise((resolve) => {
        const socket = new net.Socket();
        socket.setTimeout(2000);

        socket.on('connect', () => {
            resolve({ port, status: 'open'});
            socket.destroy();
        });

        socket.on('timeout', () => {
            resolve({ port, status: 'closed'});
            socket.destroy();
        });

        socket.on('error', () => {
            resolve({ port, status: 'closed'});
        });

        socket.connect(port, host);
    });
};

const scanPorts = async (host, startPort, endPort) => {
    const results = [];
    for(let port = startPort; port <= endPort; port++) {
        const result = await scanPort(host, port);
        console.log(`Port ${result.port}: ${result.status}`);
    }

    return results;
}

const host = '127.0.0.1';
const startPort = 1;
const endPort = 1024;

scanPorts(host, startPort, endPort).then((results) => {
    console.log('Scan complete:' , results);
});