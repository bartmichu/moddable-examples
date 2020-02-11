/*
 * Tested on: ESP8266 (NodeMCU)
 *
 * Trace photoresistor readings.
 *
 * Notes:
 * - Uses experimental ESP8266 implementation of TC53 IO class pattern.
 * - ESP8266 has only one analog input so the pin property is unused.
 * - Run with xsbug.
 */

import Analog from 'builtin/analog';

const photoresistor = new Analog();

function scaleResolution(value, resolution) {
  return value / (1 << resolution);
}

System.setInterval(() => {
  trace(scaleResolution(photoresistor.read(), photoresistor.resolution), '\n');
}, 200);
