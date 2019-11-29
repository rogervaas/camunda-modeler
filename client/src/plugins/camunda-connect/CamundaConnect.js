/**
 * Copyright Camunda Services GmbH and/or licensed to Camunda Services GmbH
 * under one or more contributor license agreements. See the NOTICE file
 * distributed with this work for additional information regarding copyright
 * ownership.
 *
 * Camunda licenses this file to you under the MIT; you may not use this file
 * except in compliance with the MIT License.
 */

import React, { PureComponent } from 'react';

import ws from 'ws';

export default class CamundaConnect extends PureComponent {

  constructor(props){
    super(props);
    this.state = {
      serverPortRead: false
    };
  }

  async componentDidMount() {
    this.serverPort = await this.props.config.get('camundaConnectServer.port');
    this.setState({
      serverPortRead: true
    });
  }

  render(){
    return null;
  }

}
