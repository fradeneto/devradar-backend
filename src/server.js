const app = require('./app')
const { setupWebsocket } = require('./websocket');

if (app.get('env') === 'production') {
    const portHTTPS = process.env.PORT_HTTPS || 0;
    if (portHTTPS > 0) {
        const fs = require('fs');
        var sslOptions = {
            key: fs.readFileSync('certs/cert.key'),
            cert: fs.readFileSync('certs/cert.crt')
        };

        const https = require('https');
        //const server = http.createServer(app)
        //server.listen(portHTTP)
        const serverSSL = https.createServer(sslOptions, app)
        //app.io = require('socket.io')(serverSSL)
        serverSSL.listen(portHTTPS)
        console.log(`Sistema iniciado em ${portHTTPS}`)
    } else {
        console.error('Nenhuma porta configurada')
    }
} else {
    const http = require('http');
    const portHTTP = process.env.PORT_HTTP || 3333;
    if (portHTTP > 0) {
        const server = http.createServer(app)
        setupWebsocket(server);
        server.listen(portHTTP)
        console.log(`Backend in Dev mode. Port: ${portHTTP}!`);
    } else {
        console.error('Error undifined')
    }
}
