/*
 * Cycle through different colors on an RGB LED.
 *
 * Tested on: ESP8266 (NodeMCU, Moddable One), RP2040 (Raspberry Pi Pico W).
 *
 * Parts list:
 *   - Raspberry Pi Pico W
 *   - Beadboard
 *   - Jumper wires
 *   - Common-cathode RGB LED
 *   - 3x 330 ohm Resistor (Orange, Orange, Brown, Gold)
 */

// NOTE: Using the IO module, which is an experimental implementation of ECMA-419.
import DigitalBank from 'embedded:io/digitalbank';

// NOTE: The LED must be connected to a GPIO (General-purpose input/output) pin,
// e.g. pins 6,4,2 on Pico W, pins 13,12,14 on NodeMCU V2.
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
  // NOTE: Using the modulo operator to cycle through items in an array.
  index = (index + 1) % pinMask.length;
}, 300);
