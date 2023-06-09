/*
 * Hold a button to toggle an LED.
 *
 * Tested on: ESP8266 (NodeMCU, Moddable One).
 *
 * Notes:
 *   - Using the IO module, which is an experimental implementation of ECMA-419.
 *   - Using a built-in LED connected to GPIO 2, which is pulled up and set to HIGH at boot.
 *   - Using a built-in Flash button connected to GPIO 0.
 *   - Using a leading edge debouncing mechanism.
 *   - Disable the "BREAK -> On Exceptions" option in xsbug preferences.
 */

import Digital from 'embedded:io/digital';

let timeoutId = null;
const pressDelay = 1000;

const stopTimeout = function stopTimeout() {
  try {
    System.clearTimeout(timeoutId);
  } catch (error) {
    trace(`This is probably normal: ${error}\n`);
  }
};

const led = new Digital({
  pin: 2,
  mode: Digital.Output,
});

// eslint-disable-next-line no-unused-vars
const button = new Digital({
  pin: 0,
  mode: Digital.Input,
  edge: Digital.Rising | Digital.Falling,

  onReadable() {
    const reading = this.read();
    stopTimeout();
    if (!reading) {
      timeoutId = System.setTimeout(() => {
        led.write(!led.read());
      }, pressDelay);
    }
  },
});
