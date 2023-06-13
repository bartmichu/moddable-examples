/*
 * Cycle through different colors on an RGB LED without using PWM.
 *
 * Tested on: ESP8266 (NodeMCU, Moddable One).
 *
 * Notes:
 *   - Using the IO module, which is an experimental implementation of ECMA-419.
 *   - An RGB LED is connected as follows:
 *     Red pin -> GPIO 13
 *     Green pin -> GPIO 12
 *     Blue pin -> GPIO 14
 *
 * Parts list:
 *   - Node MCU ESP8266 V2
 *   - Breadboard
 *   - Jumper wires
 *   - Common-cathode RGB LED
 *   - 3x 330 ohm Resistor (Orange, Orange, Brown, Gold)
 */

import DigitalBank from 'embedded:io/digitalbank';

const rgbLed = new DigitalBank({
  pins: (1 << 13) | (1 << 12) | (1 << 14),
  mode: DigitalBank.Output,
});

const pinMask = [8192, 4096, 16384];
let index = 0;

System.setInterval(() => {
  rgbLed.write(pinMask[index]);
  index = (index + 1) % pinMask.length;
}, 300);
