const WebSocket = require("ws");

clients = []

const wsConnection = (server) => {
  const wss = new WebSocket.Server({ server });

  wss.on("connection", (ws) => {
    clients.push(ws);
    sendMessages();

    ws.on("message", (message) => {
      sendMessages();
    });
  });

  const sendMessages = () => {
    clients.forEach((client) => client.send('Update messages'));
  };
};

exports.wsConnection = wsConnection;