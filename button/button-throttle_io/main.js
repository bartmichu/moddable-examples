/*
 * Hold a button for two seconds and observe the drift in the raw and throttled counters.
 * A basic throttling mechanism is being used to compensate for unreliable button.
 *
 * For the purpose of this example a debugger is necessary. Use the -d argument to build a debug
 * instrumented version.
 *
 * Tested on: ESP8266 (NodeMCU, Moddable One), RP2040 (Raspberry Pi Pico W).
 *
 * Parts list:
 *   - Raspberry Pi Pico W
 *   - Beadboard
 *   - Jumper wires
 *   - Pushbutton
 *   - 10K ohm Resistor (Brown, Black, Orange, Gold)
 */

// NOTE: Using the IO module, which is an experimental implementation of ECMA-419.
import Digital from 'embedded:io/digital';

let counter = 0;
let throttledCounter = 0;

// NOTE: The button must be connected to a GPIO (General-purpose input/output) pin,
// e.g. pin 9 on Pico W, pin 12 on NodeMCU V2.
// eslint-disable-next-line no-unused-vars
const button = new Digital({
  pin: 9,
  mode: Digital.Input,
  edge: Digital.Rising | Digital.Falling,

  onReadable() {
    if (this.read() === 0) {
      counter += 1;
      this.timeout ??= System.setTimeout(() => {
        throttledCounter += 1;
        trace('raw:', counter, ' throttled:', throttledCounter, '\n');
        delete this.timeout;
      }, 50);
    } else {
      System.clearTimeout(this.timeout);
      delete this.timeout;
    }
  },
});
