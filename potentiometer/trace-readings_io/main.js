/*
 * Trace the readings of a potentiometer.
 *
 * Tested on: ESP8266 (NodeMCU).
 *
 * Notes:
 *   - A debugger is required. Use the -d argument to build a debug instrumented version.
 *   - Using the IO module, which is an experimental implementation of ECMA-419.
 *   - The ESP8266 has only one analog input, so the "pin" property is not used.
 */

import Analog from 'embedded:io/analog';

const potentiometer = new Analog({});

function scaleResolution(value, resolution) {
  return value / (1 << resolution);
}

System.setInterval(() => {
  const reading = potentiometer.read();
  trace('Raw:', reading, ' Scaled:', scaleResolution(reading, potentiometer.resolution), '\n');
}, 300);
