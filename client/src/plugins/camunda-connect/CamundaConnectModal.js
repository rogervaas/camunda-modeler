/**
 * Copyright Camunda Services GmbH and/or licensed to Camunda Services GmbH
 * under one or more contributor license agreements. See the NOTICE file
 * distributed with this work for additional information regarding copyright
 * ownership.
 *
 * Camunda licenses this file to you under the MIT; you may not use this file
 * except in compliance with the MIT License.
 */

import React, { Fragment, PureComponent } from 'react';

import {
  Modal
} from '../../app/primitives';

import css from './CamundaConnectModal.less';

class CamundaConnectModal extends PureComponent {

  renderClients = (clients) => {
    if (!clients){
      return null;
    }
    return clients.map((clientName) => {
      return (
        <div key={clientName}> {clientName} </div>
      )
    })
  }

  onConnectButtonClicked = () => {
    const userName = document.getElementById('camundaConnectUserName').value;
    const serverURL = document.getElementById('camundaConnectServerURL').value;
    this.props.onConnectRequest(userName, serverURL);
  }

  onDisconnectButtonClicked = () => {
    this.props.onDisconnect();
  }

  render() {
    const {
      onClose,
      serverPort,
      connecting,
      connected,
      isServer,
      clients
    } = this.props;
    return (
      <Modal className={ css.View } onClose={ onClose }>
        <Modal.Title>Camunda Connect</Modal.Title>
        <hr/>
        <Modal.Body>
          <div className="serverPortDiv">
            Server port: <b>{serverPort}</b>
          </div>
          {
            isServer && (
              <div className="clients"> <b> This instance is used as a server. Connected clients: </b> </div>
            )
          }
          {this.renderClients(clients)}
          {(!isServer && !connecting && !connected) &&
            <div className="connectDiv">
              User name <br/>
              <input type="text" id="camundaConnectUserName" />
              <br/>
              <br/>
              Server URL <br/>
              <input type="text" id="camundaConnectServerURL" />
              <br/>
              <br/>
              <button id="camundaConnectButton" onClick={this.onConnectButtonClicked}> Connect </button>
            </div>
          } {
            (!isServer && connecting) && <div className="connectingDiv"> Connecting </div>
          } {
            (!isServer && connected) && <div className="connectingDiv">
              <b> Connected </b>
                <div className="connectingDiv">
                  <button onClick={this.onDisconnectButtonClicked}> Disconnect </button>
                </div>
             </div>
          }
        </Modal.Body>
      </Modal>
    );
  }

}

export default CamundaConnectModal;
