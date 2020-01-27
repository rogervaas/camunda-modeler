/**
 * Copyright Camunda Services GmbH and/or licensed to Camunda Services GmbH
 * under one or more contributor license agreements. See the NOTICE file
 * distributed with this work for additional information regarding copyright
 * ownership.
 *
 * Camunda licenses this file to you under the MIT; you may not use this file
 * except in compliance with the MIT License.
 */

export default class CustomContextPad {
  constructor(contextPad, orthoConnections, translate) {
    this.orthoConnections = orthoConnections;
    this.translate = translate;

    contextPad.registerProvider(this);
  }

  getContextPadEntries(element) {
    const {
      orthoConnections,
      translate
    } = this;

    function formatIncomingConnections(event, element) {
      orthoConnections.format(element);
    }

    return {
      'format-ortho': {
        group: 'edit',
        className: 'dmn-icon-edit',
        title: translate('Format Incoming Connections'),
        action: {
          click: formatIncomingConnections
        }
      }
    };
  }
}

CustomContextPad.$inject = [
  'contextPad',
  'orthoConnections',
  'translate'
];