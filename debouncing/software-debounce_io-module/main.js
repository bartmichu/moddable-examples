/*
 * Continuously press the button and observe the drift in the counters.
 *
 * Tested on: ESP8266 (NodeMCU).
 *
 * Notes:
 *   - Start the application with debugging enabled.
 *   - Uses IO module, an experimental implementation of ECMA-419.
 *   - Using a built-in LED connected to GPIO 2, which is pulled up and set to HIGH at boot.
 *   - Using a built-in Flash button connected to GPIO 0.
 *   - Using a simple software debouncing mechanism.
 */

import Digital from 'embedded:io/digital';

let counter = 0;
let debouncedCounter = 0;

// eslint-disable-next-line no-unused-vars
const button = new Digital({
  pin: 0,
  mode: Digital.Input,
  edge: Digital.Rising | Digital.Falling,

  onReadable() {
    const newState = this.read();
    counter += 1;

    // eslint-disable-next-line no-use-before-define
    if (newState === state) {
      trace('*OINK*\n');
    } else {
      // eslint-disable-next-line no-use-before-define
      state = newState;
      debouncedCounter += 1;
      trace('counter:', counter, ' debounced:', debouncedCounter, '\n');
    }
  },
});

let state = button.read();
