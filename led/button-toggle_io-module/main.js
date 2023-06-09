/*
 * Use a button to toggle an LED.
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
  mode: Digital.Input,
  edge: Digital.Falling,
  onReadable() {
    const buttonReading = this.read();
    if (buttonReading === 0) {
      // eslint-disable-next-line no-use-before-define
      led.write(ledState);
      // eslint-disable-next-line no-use-before-define
      ledState = !ledState;
    }
  },
});

let ledState = button.read();
