/*
 * Trace the readings of a potentiometer.
 *
 * For the purpose of this example a debugger is necessary. Use the -d argument to build a debug
 * instrumented version.
 *
 * Tested on: ESP8266 (NodeMCU), RP2040 (Raspberry Pi Pico W).
 *
 * Parts list:
 *   - Raspberry Pi Pico W
 *   - Breadboard
 *   - Jumper wires
 *   - Potentiometer
 */

// NOTE: Using the IO module, which is an experimental implementation of ECMA-419.
import Analog from 'embedded:io/analog';

// NOTE: The potentiometer must be connected to a ADC (Analog-to-Digital Converter) pin,
// e.g. pin 28 on Pico W, pin 0 on NodeMCU V2.
const potentiometer = new Analog({
  pin: 28,
});

// NOTE: Using a bitwise left shift operation to calculate the maximum allowed value
// of an ADC and/or PWM.
function scaleResolution(value, resolution) {
  return value / ((1 << resolution) - 1);
}

System.setInterval(() => {
  const reading = potentiometer.read();
  trace('Raw:', reading, ' Scaled:', scaleResolution(reading, potentiometer.resolution), '\n');
}, 300);
