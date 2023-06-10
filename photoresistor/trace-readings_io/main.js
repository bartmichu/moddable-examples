/*
 * Trace the readings of a photoresistor.
 *
 * Tested on: ESP8266 (NodeMCU).
 *
 * Notes:
 *   - A debugger is required. Use the -d argument to build a debug instrumented version.
 *   - Using the IO module, which is an experimental implementation of ECMA-419.
 *   - The ESP8266 has only one analog input, so the "pin" property is not used.
 */

import Analog from 'embedded:io/analog';

const photoresistor = new Analog({});

function scaleResolution(value, resolution) {
  return value / (1 << resolution);
}

System.setInterval(() => {
  const reading = photoresistor.read();
  trace('Raw:', reading, ' Scaled:', scaleResolution(reading, photoresistor.resolution), '\n');
}, 300);
