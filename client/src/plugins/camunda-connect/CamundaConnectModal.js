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

  onConnectButtonClicked = () => {
    const userName = document.getElementById('camundaConnectUserName').value;
    const serverURL = document.getElementById('camundaConnectServerURL').value;
    this.props.onConnectRequest(userName, serverURL);
  }

  render() {
    const {
      onClose,
      serverPort,
      connecting,
      connected
    } = this.props;
    console.log(connected);
    return (
      <Modal className={ css.View } onClose={ onClose }>
        <Modal.Title>Camunda Connect</Modal.Title>
        <hr/>
        <Modal.Body>
          <div className="serverPortDiv">
            Server port: <b>{serverPort}</b>
          </div>
          {(!connecting && !connected) &&
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
            connecting && <div className="connectingDiv"> Connecting </div>
          } {
            connected && <div className="connectingDiv"> <b> Connected </b> </div>
          }
        </Modal.Body>
      </Modal>
    );
  }

}

export default CamundaConnectModal;
