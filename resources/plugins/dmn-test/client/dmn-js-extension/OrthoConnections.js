/**
 * Copyright Camunda Services GmbH and/or licensed to Camunda Services GmbH
 * under one or more contributor license agreements. See the NOTICE file
 * distributed with this work for additional information regarding copyright
 * ownership.
 *
 * Camunda licenses this file to you under the MIT; you may not use this file
 * except in compliance with the MIT License.
 */

import { forEach } from 'min-dash';

const DOCKING_DISTANCE = 25;

const ORTHOGONAL_BENDPOINT_X = 20;

export default function OrthoConnections(eventBus, modeling, elementRegistry) {
  this._eventBus = eventBus;
  this._modeling = modeling;
  this._elementRegistry = elementRegistry;
}

OrthoConnections.prototype.format = function(shape) {
  const incomingConnections = shape.incoming;

  // get lower edge
  const lowerEdge = {
    start: {
      x: shape.x,
      y: shape.y + shape.height
    },
    end: {
      x: shape.x + shape.width,
      y: shape.y + shape.height
    },
    get length() {
      return this.end.x - this.start.x;
    }
  };

  const self = this;

  // sort connected decisions from left to right with bubble sort
  for (let i = 0; i < incomingConnections.length ; i++) {

    for (let j = 0 ; j < incomingConnections.length - i - 1; j++) {

      if (incomingConnections[j].source.x > incomingConnections[j + 1].source.x) {

        // swap
        const temp = incomingConnections[j];
        incomingConnections[j] = incomingConnections[j+1];
        incomingConnections[j + 1] = temp;
      }
    }
  }

  forEach(incomingConnections, (connection, index) => {
    const waypoints = connection.waypoints;

    const newLastWaypoint = {
      x: lowerEdge.start.x + (index + 1) * (DOCKING_DISTANCE),
      y: lowerEdge.start.y
    };

    const orthoWaypoint = {
      x: newLastWaypoint.x,
      y: newLastWaypoint.y + ORTHOGONAL_BENDPOINT_X
    };

    const newWaypoints = [
      ...waypoints.slice(0, waypoints.length - 1),
      orthoWaypoint,
      newLastWaypoint
    ];

    self._modeling.updateWaypoints(connection, newWaypoints);
  });
};

OrthoConnections.$inject = ['eventBus', 'modeling', 'elementRegistry'];
