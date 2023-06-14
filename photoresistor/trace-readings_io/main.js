/*
 * Trace the readings of a photoresistor.
 *
 * Tested on: ESP8266 (NodeMCU), RP2040 (Raspberry Pi Pico W).
 *
 * Notes:
 *   - A debugger is required. Use the -d argument to build a debug instrumented version.
 *   - Using the IO module, which is an experimental implementation of ECMA-419.
 *
 * Parts list:
 *   - Raspberry Pi Pico W
 *   - Breadboard
 *   - Jumper wires
 *   - Photoresistor
 *   - 10K ohm Resistor (Brown, Black, Orange, Gold)
 */

import Analog from 'embedded:io/analog';

// pin 28 on Pico W, pin 0 on NodeMCU V2
const photoresistor = new Analog({
  pin: 28,
});

function scaleResolution(value, resolution) {
  return value / (1 << resolution);
}

System.setInterval(() => {
  const reading = photoresistor.read();
  trace('Raw:', reading, ' Scaled:', scaleResolution(reading, photoresistor.resolution), '\n');
}, 300);
