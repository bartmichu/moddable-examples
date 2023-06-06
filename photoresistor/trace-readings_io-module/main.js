/*
 * Trace the readings of a photoresistor.
 *
 * Tested on: ESP8266 (NodeMCU).
 *
 * Notes:
 *   - Uses IO module, an experimental implementation of ECMA-419.
 *   - The ESP8266 has only one analog input, so the "pin" property is not used.
 *   - Start the application with debugging enabled.
 */

import Analog from 'embedded:io/analog';

const photoresistor = new Analog({});

function scaleResolution(value, resolution) {
  return value / (1 << resolution);
}

System.setInterval(() => {
  trace(scaleResolution(photoresistor.read(), photoresistor.resolution), '\n');
}, 200);
