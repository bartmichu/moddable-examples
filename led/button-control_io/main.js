/*
 * Use a button to control an LED.
 *
 * Tested on: ESP8266 (NodeMCU, Moddable One).
 *
 * Notes:
 *   - Using the IO module, which is an experimental implementation of ECMA-419.
 *   - Using a built-in LED connected to GPIO 2, which is pulled up and set to HIGH at boot.
 *   - Using a built-in Flash button connected to GPIO 0.
 *   - No debouncing mechanism has been implemented for the button.
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
