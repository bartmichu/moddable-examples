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

import Digital from 'pins/digital';
import Monitor from 'pins/digital/monitor';

// NOTE: The button must be connected to a GPIO (General-purpose input/output) pin,
// e.g. pin 9 on Pico W, pin 12 on NodeMCU V2.
const button = new Monitor({
  pin: 9,
  mode: Digital.Input,
  edge: Monitor.Rising | Monitor.Falling,
});

let counter = 0;
let debouncedCounter = 0;
let reading = button.read();

button.onChanged = function onChanged() {
  const newReading = this.read();
  counter += 1;

  // NOTE: Using a leading edge debouncing mechanism.
  if (newReading === reading) {
    trace('*OINK*\n');
  } else {
    reading = newReading;
    debouncedCounter += 1;
    trace('counter:', counter, ' debounced:', debouncedCounter, '\n');
  }
};
