/*
 * Tested on: ESP8266 (NodeMCU, Moddable One)
 *
 * Use a button to control LED.
 *
 * Notes:
 * - Uses experimental ESP8266 implementation of TC53 IO class pattern.
 * - Built-in LED available via pulled up GPIO 2, HIGH at boot.
 * - Built-in Flash button available via GPIO 0.
 * - No debouncing.
 */

import Digital from 'embedded:io/digital';

const led = new Digital({
  pin: 2,
  mode: Digital.Output,
});

// eslint-disable-next-line no-unused-vars
const button = new Digital({
  pin: 0,
  mode: Digital.InputPullUp,
  edge: Digital.Rising | Digital.Falling,
  onReadable() {
    led.write(this.read());
  },
});
