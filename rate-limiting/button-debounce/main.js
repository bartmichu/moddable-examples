/*
 * Continuously press the button and observe the drift in the counters.
 *
 * Tested on: ESP8266 (NodeMCU).
 *
 * Notes:
 *   - Start the application with debugging enabled.
 *   - Using a built-in Flash button connected to GPIO 0.
 *   - Using a leading edge debouncing mechanism.
 */

import Digital from 'pins/digital';
import Monitor from 'pins/digital/monitor';

const button = new Digital({
  pin: 0,
  mode: Digital.Input,
});

const buttonMonitor = new Monitor({
  pin: button.pin,
  mode: Digital.Input,
  edge: Monitor.Rising | Monitor.Falling,
});

let counter = 0;
let debouncedCounter = 0;
let reading = buttonMonitor.read();

buttonMonitor.onChanged = function onChanged() {
  const newReading = buttonMonitor.read();
  counter += 1;

  if (newReading === reading) {
    trace('*OINK*\n');
  } else {
    reading = newReading;
    debouncedCounter += 1;
    trace('counter:', counter, ' debounced:', debouncedCounter, '\n');
  }
};