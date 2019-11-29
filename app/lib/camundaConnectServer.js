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

  constructor() {
    const port =  8000 + parseInt( 500 * Math.random());

    this.server = new WebSocket.Server({ port: port });

    this.log('CamundaConnectServer listening port: '+port);

    process.env.camundaConnectServerPort = port;
  }

  log(msg) {
    console.log("\x1b[42m%s\x1b[0m", msg);
  }

}

module.exports = CamundaConnectServer;
