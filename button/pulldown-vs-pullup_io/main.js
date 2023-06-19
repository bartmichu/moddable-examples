/*
 * Trace events on pull-up and pull-down buttons.
 *
 * Tested on: ESP8266 (NodeMCU, Moddable One), RP2040 (Raspberry Pi Pico W).
 *
 * Notes:
 *   - A debugger is required. Use the -d argument to build a debug instrumented version.
 *   - Using the IO module, which is an experimental implementation of ECMA-419.
 *   - Using a simple throttling mechanism.
 *
 * Parts list:
 *   - Raspberry Pi Pico W
 *   - Breadboard
 *   - Jumper wires
 *   - 2x Pushbutton
 *   - 2x 10K ohm Resistor (Brown, Black, Orange, Gold)
 */

import Digital from 'embedded:io/digital';

// pin 9 on Pico W, pin 4 on NodeMCU V2
// eslint-disable-next-line no-unused-vars
const pullUpButton = new Digital({
  pin: 9,
  mode: Digital.Input,
  edge: Digital.Rising | Digital.Falling,

  onReadable() {
    if (this.read() === 0) {
      this.timeout ??= System.setTimeout(() => {
        trace(`${Date()} Pull-up button reading equals 0 on push\n`);
        delete this.timeout;
      }, 50);
    } else {
      System.clearTimeout(this.timeout);
      delete this.timeout;
    }
  },
});

// pin 10 on Pico W, pin 5 on NodeMCU V2
// eslint-disable-next-line no-unused-vars
const pullDownButton = new Digital({
  pin: 10,
  mode: Digital.Input,
  edge: Digital.Rising | Digital.Falling,

  onReadable() {
    if (this.read() === 0) {
      this.timeout ??= System.setTimeout(() => {
        trace(`${Date()} Pull-down button reading equals 0 on release\n`);
        delete this.timeout;
      }, 50);
    } else {
      System.clearTimeout(this.timeout);
      delete this.timeout;
    }
  },
});
