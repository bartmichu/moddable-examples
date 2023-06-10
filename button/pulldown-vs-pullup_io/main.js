/*
 * Trace rising edge events on pull-up and pull-down buttons.
 *
 * Tested on: ESP8266 (NodeMCU, Moddable One).
 *
 * Notes:
 *   - Start the application with debugging enabled.
 *   - Using the IO module, which is an experimental implementation of ECMA-419.
 *   - Using a simple throttling mechanism.
 */

import Digital from 'embedded:io/digital';

let button1Timer = null;
let button2Timer = null;

// eslint-disable-next-line no-unused-vars
const button1 = new Digital({
  pin: 4,
  mode: Digital.Input,
  edge: Digital.Rising | Digital.Falling,
  onReadable() {
    const button1Reading = this.read();
    if (button1Reading === 0) {
      button1Timer = System.setTimeout(() => {
        trace('Pull-up button rising\n');
        button1Timer = null;
      }, 50);
    } else if (button1Timer !== null) {
      System.clearTimeout(button1Timer);
    }
  },
});

// eslint-disable-next-line no-unused-vars
const button2 = new Digital({
  pin: 5,
  mode: Digital.Input,
  edge: Digital.Rising | Digital.Falling,
  onReadable() {
    const button2Reading = this.read();
    if (button2Reading === 0) {
      button2Timer = System.setTimeout(() => {
        trace('Pull-down button rising\n');
        button2Timer = null;
      }, 50);
    } else if (button2Timer !== null) {
      System.clearTimeout(button2Timer);
    }
  },
});
