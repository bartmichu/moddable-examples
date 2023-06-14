/*
 * Turn on the LED if the photoresistor detects darkness.
 * The darkness threshold is set at 50% of the maximum value of the photoresistor.
 *
 * Tested on: ESP8266 (NodeMCU), RP2040 (Raspberry Pi Pico W).
 *
 * Notes:
 *   - Using the IO module, which is an experimental implementation of ECMA-419.
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

System.setInterval(() => {
  led.write(1 ^ Math.round(photoresistor.read() / (1 << photoresistor.resolution)));
}, 100);
