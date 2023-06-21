/*
 * Continuously press the button and observe the drift in the counters.
 * A debugger is required. Use the -d argument to build a debug instrumented version.
 *
 * Tested on: ESP8266 (NodeMCU), RP2040 (Raspberry Pi Pico W).
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
let debouncedCounter = 0;

// NOTE: The button must be connected to a GPIO (General-purpose input/output) pin,
// e.g. pin 9 on Pico W, pin 12 on NodeMCU V2.
// eslint-disable-next-line no-unused-vars
const button = new Digital({
  pin: 9,
  mode: Digital.Input,
  edge: Digital.Rising | Digital.Falling,

  onReadable() {
    const newReading = this.read();
    counter += 1;

    // NOTE: Using a leading edge debouncing mechanism.
    // eslint-disable-next-line no-use-before-define
    if (newReading === reading) {
      trace('*OINK*\n');
    } else {
      // eslint-disable-next-line no-use-before-define
      reading = newReading;
      debouncedCounter += 1;
      trace('counter:', counter, ' debounced:', debouncedCounter, '\n');
    }
  },
});

let reading = button.read();
