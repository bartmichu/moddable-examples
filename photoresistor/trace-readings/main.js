/*
 * Tested on: ESP8266 / NodeMCU
 *
 * Trace photoresistor readings.
 *
 * Notes:
 * - Uses TC53 IO class pattern.
 * - ESP8266 has only one analog input so the pin property is unused.
 */

import Analog from 'builtin/analog';

const photoresistor = new Analog();

function scaleResolution(value, resolution) {
  return value / (1 << resolution);
}

System.setInterval(() => {
  trace(scaleResolution(photoresistor.read(), photoresistor.resolution), '\n');
}, 200);
