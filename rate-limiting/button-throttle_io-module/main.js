/*
 * Hold a button for two seconds.
 *
 * Tested on: ESP8266 (NodeMCU, Moddable One).
 *
 * Notes:
 *   - Start the application with debugging enabled.
 *   - Using the IO module, which is an experimental implementation of ECMA-419.
 *   - Using a built-in Flash button connected to GPIO 0.
 *   - Using a simple throttling mechanism.
 */

import Digital from 'embedded:io/digital';

let holdTimer = null;

// eslint-disable-next-line no-unused-vars
const button = new Digital({
  pin: 0,
  mode: Digital.InputPullUp,
  edge: Digital.Rising | Digital.Falling,

  onReadable() {
    const reading = button.read();
    if (reading === 0) {
      holdTimer = System.setTimeout(() => {
        trace('hold\n');
        holdTimer = null;
      }, 2000);
    } else if (holdTimer !== null) {
      System.clearTimeout(holdTimer);
    }
  },
});
