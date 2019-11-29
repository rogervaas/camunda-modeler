/**
 * Copyright Camunda Services GmbH and/or licensed to Camunda Services GmbH
 * under one or more contributor license agreements. See the NOTICE file
 * distributed with this work for additional information regarding copyright
 * ownership.
 *
 * Camunda licenses this file to you under the MIT; you may not use this file
 * except in compliance with the MIT License.
 */

const WebSocket = require('ws');

class CamundaConnectServer {

  constructor(send) {
    this.send = send;
    const port =  8000 + parseInt( 500 * Math.random());

    this.server = new WebSocket.Server({ port: port });

    this.server.on('connection', (ws) => {
      this.log('Connection received.');
      ws.on('message', (msg) => {
        this.log('Received a message ' + msg);
        this.handleMessage(msg, ws);
      });
      ws.on('close', () => {
        const userName = this.userNamesByWS.get(ws);
        this.log(userName + " disconnected.");
        this.userNamesByWS.delete(ws);
        this.send('clientDisconnected', userName);
      })
    });

    this.log('CamundaConnectServer listening port: '+port);

    process.env.camundaConnectServerPort = port;

    this.userNamesByWS = new Map();
  }

  handleMessage(msg, ws) {
    const splitted = msg.split(' ');
    const msgHeader = splitted[0];
    const msgBody = splitted[1];

    if (msgHeader === 'userName') {
      this.userNamesByWS.set(ws, msgBody);
      this.log(msgBody + ' connected.');
      ws.send('hello');
      this.send('clientConnected', msgBody);
    }else if (msgHeader === 'hello') {
      this.log('Server accepted my request.');
      this.send('serverAcceptedRequest');
    }
  }

  log(msg) {
    console.log("\x1b[42m%s\x1b[0m", msg);
  }

  connect(serverURL, userName) {
    this.log('Connecting to '+serverURL+' as '+userName);
    this.client = new WebSocket('ws://' + serverURL);
    this.client.on('open', () => {
      this.log('Connection opened.');
      this.client.send('userName '+userName);
    });
    this.client.on('message', (msg) => {
      this.handleMessage(msg);
    });
  }

  disconnect(userName) {
    this.log('Disconnecting ' + userName);
    this.client.close();
  }

}

module.exports = CamundaConnectServer;
