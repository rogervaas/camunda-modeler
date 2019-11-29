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

import {
  Button,
  Icon
} from '../../app/primitives';

import { Fill } from '../../app/slot-fill';

import ConnectIcon from 'icons/Connect.svg';

import CamundaConnectModal from './CamundaConnectModal';

export default class CamundaConnect extends PureComponent {

  constructor(props){
    super(props);
    this.state = {
      serverPortRead: false
    };

    this.clients = new Object();

    props.getGlobal('backend').on('serverAcceptedRequest', () => {
      this.setState({
        connected: true,
        connecting: false
      });
    });

    props.getGlobal('backend').on('clientConnected', (sender, payload) => {
      this.clients[payload] = true;
      this.setState({
        isServer: true,
        clients: Object.keys(this.clients)
      })
    });
  }

  async componentDidMount() {
    this.serverPort = await this.props.config.get('camundaConnectServer.port');
    this.setState({
      serverPortRead: true
    });
  }

  onIconClicked = () => {
    this.setState({
      modalOpen: true
    });
  }

  onConnectRequest = (serverURL, userName) => {
    const {
      getGlobal
    } = this.props;

    this.setState({
      connecting: true
    });

    getGlobal('backend').send('camuncaConnect:connect', {
      serverURL: serverURL,
      userName: userName
    });
  };

  onModalClose = () => {
    this.setState({
      modalOpen: false
    });
  }

  render(){
    const {
      serverPortRead,
      modalOpen,
      connecting,
      connected,
      isServer,
      clients
    } = this.state;

    return <React.Fragment>
    {serverPortRead && (
        <Fill slot="toolbar" group="9_camundaconnect">
          <Button
            onClick={ this.onIconClicked }
            title="Camunda Connect">
            <ConnectIcon />
          </Button>
        </Fill>
      )
    }
    {modalOpen &&
      <CamundaConnectModal clients={clients} isServer={isServer} connected={connected} connecting={connecting} onConnectRequest={this.onConnectRequest} onClose={this.onModalClose} serverPort={this.serverPort}/>
    }
    </React.Fragment>;
  }

}
