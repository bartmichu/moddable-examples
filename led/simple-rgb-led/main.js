/*
 * ESP8266 / NodeMCU
 *
 * Cycle an RGB LED without using PWM.
 *
 * Notes:
 * - Uses TC53 IO class pattern.
 * - RGB LED connected as follows:
 *     Red pin -> GPIO 14
 *     Green pin -> GPIO 12
 *     Blue pin -> GPIO 13
 */

import DigitalBank from 'builtin/digitalbank';

const rgbLed = new DigitalBank({
  pins: (1 << 14) | (1 << 12) | (1 << 13),
  mode: DigitalBank.Output,
});

const pinMask = [16384, 4096, 8192];
let index = 0;
System.setInterval(() => {
  rgbLed.write(pinMask[index]);
  index = (index + 1) % pinMask.length;
}, 300);
