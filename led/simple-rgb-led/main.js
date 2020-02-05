/*
 * Tested on: ESP8266 NodeMCU / Moddable One
 *
 * Cycle an RGB LED without using PWM.
 *
 * Notes:
 * - Uses ESP8266 implementation of TC53 IO class pattern.
 * - RGB LED connected as follows:
 *     Red pin -> GPIO 13
 *     Green pin -> GPIO 12
 *     Blue pin -> GPIO 14
 */

import DigitalBank from 'builtin/digitalbank';

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
