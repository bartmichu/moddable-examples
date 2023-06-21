/*
 * Trace the readings of a photoresistor.
 * A debugger is required. Use the -d argument to build a debug instrumented version.
 *
 * Tested on: ESP8266 (NodeMCU), RP2040 (Raspberry Pi Pico W).
 *
 * Parts list:
 *   - Raspberry Pi Pico W
 *   - Breadboard
 *   - Jumper wires
 *   - Photoresistor
 *   - 10K ohm Resistor (Brown, Black, Orange, Gold)
 */

// NOTE: Using the IO module, which is an experimental implementation of ECMA-419.
import Analog from 'embedded:io/analog';

// NOTE: The photoresistor must be connected to a ADC (Analog-to-Digital Converter) pin,
// e.g. pin 28 on Pico W, pin 0 on NodeMCU V2.
const photoresistor = new Analog({
  pin: 28,
});

// NOTE: Using a bitwise left shift operation to calculate the maximum allowed value
// of an ADC and/or PWM.
function scaleResolution(value, resolution) {
  return value / ((1 << resolution) - 1);
}

System.setInterval(() => {
  const reading = photoresistor.read();
  trace('Raw:', reading, ' Scaled:', scaleResolution(reading, photoresistor.resolution), '\n');
}, 300);
