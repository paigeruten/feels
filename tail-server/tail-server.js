const http = require('http');
const WebSocket = require('ws');
const url = require('url');
const Tail = require('tail-file');

const server = http.createServer();
const wss = new WebSocket.Server({ noServer: true });

wss.on('connection', ws => {
  new Tail('tail.log', { force: true }, line => {
    ws.send(line);
  });
});

server.on('upgrade', (request, socket, head) => {
  const pathname = url.parse(request.url).pathname;

  if (pathname === '/tail') {
    wss.handleUpgrade(request, socket, head, ws => {
      wss.emit('connection', ws, request);
    });
  } else {
    socket.destroy();
  }
});

server.listen(8080);

