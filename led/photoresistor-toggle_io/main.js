/*
 * Turn on the LED if the photoresistor detects darkness.
 * The darkness threshold is set at 50% of the maximum value of the photoresistor.
 *
 * Tested on: ESP8266 (NodeMCU), RP2040 (Raspberry Pi Pico W).
 *
 * Notes:
 *   - Using the IO module, which is an experimental implementation of ECMA-419.
 *   - The photoresistor must be connected to a ADC (Analog-to-Digital Converter) pin.
 *   - The ADC and PWM can have different resolutions.
 *   - Using a bitwise left shift operation to calculate the maximum allowed value
 *     of an ADC and/or PWM.
 *   - Using the bitwise XOR (exclusive OR) operation to "reverse" the photoresistor reading.
 *
 * Parts list:
 *   - Raspberry Pi Pico W
 *   - Breadboard
 *   - Jumper wires
 *   - 10K ohm Resistor (Brown, Black, Orange, Gold)
 *   - Photoresistor
 *   - Light-emitting diode (LED)
 *   - 330 ohm Resistor (Orange, Orange, Brown, Gold)
*/

import Analog from 'embedded:io/analog';
import Digital from 'embedded:io/digital';

// pin 22 on Pico W, pin 5 on NodeMCU V2
const led = new Digital({
  pin: 22,
  mode: Digital.Output,
});

// pin 28 on Pico W, pin 0 on NodeMCU V2
const photoresistor = new Analog({
  pin: 28,
});

const maxPhotoresistorValue = (1 << photoresistor.resolution) - 1;

System.setInterval(() => {
  led.write(1 ^ Math.round(photoresistor.read() / maxPhotoresistorValue));
}, 100);
