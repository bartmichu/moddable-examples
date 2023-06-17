/*
 * Cycle through different colors on an RGB LED without using PWM.
 *
 * Tested on: ESP8266 (NodeMCU, Moddable One), RP2040 (Raspberry Pi Pico W).
 *
 * Notes:
 *   - Using the IO module, which is an experimental implementation of ECMA-419.
 *
 * Parts list:
 *   - Raspberry Pi Pico W
 *   - Beadboard
 *   - Jumper wires
 *   - Common-cathode RGB LED
 *   - 3x 330 ohm Resistor (Orange, Orange, Brown, Gold)
 */

import DigitalBank from 'embedded:io/digitalbank';

// pins 6,4,2 on Pico W, pins 13,12,14 on NodeMCU V2
const redPin = 6;
const greenPin = 4;
const bluePin = 2;

const rgbLed = new DigitalBank({
  pins: (1 << redPin) | (1 << greenPin) | (1 << bluePin),
  mode: DigitalBank.Output,
});

const pinMask = [1 << redPin, 1 << greenPin, 1 << bluePin];
let index = 0;

System.setInterval(() => {
  rgbLed.write(pinMask[index]);
  index = (index + 1) % pinMask.length;
}, 300);
