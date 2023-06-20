/*
 * Trace the readings of a potentiometer.
 *
 * Tested on: ESP8266 (NodeMCU), RP2040 (Raspberry Pi Pico W).
 *
 * Notes:
 *   - A debugger is required. Use the -d argument to build a debug instrumented version.
 *   - Using the IO module, which is an experimental implementation of ECMA-419.
 *   - Using a bitwise left shift operation to calculate the maximum allowed value
 *     of an ADC and/or PWM.
 *
 * Parts list:
 *   - Raspberry Pi Pico W
 *   - Breadboard
 *   - Jumper wires
 *   - Potentiometer
 */

import Analog from 'embedded:io/analog';

// pin 28 on Pico W, pin 0 on NodeMCU V2
const potentiometer = new Analog({
  pin: 28,
});

function scaleResolution(value, resolution) {
  return value / ((1 << resolution) - 1);
}

System.setInterval(() => {
  const reading = potentiometer.read();
  trace('Raw:', reading, ' Scaled:', scaleResolution(reading, potentiometer.resolution), '\n');
}, 300);
