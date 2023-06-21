/*
 * Hold a button for two seconds.
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
import Timer from 'timer';

// NOTE: The button must be connected to a GPIO (General-purpose input/output) pin,
// e.g. pin 9 on Pico W, pin 12 on NodeMCU V2.
const button = new Monitor({
  pin: 9,
  mode: Digital.Input,
  edge: Monitor.Rising | Monitor.Falling,
});

// NOTE: Using a simple throttling mechanism.
const holdTimer = Timer.set((id) => {
  trace('hold\n');
  Timer.schedule(id);
}, 5000);
Timer.schedule(holdTimer);

button.onChanged = function onChanged() {
  if (this.read() === 0) {
    Timer.schedule(holdTimer, 2000);
  } else {
    Timer.schedule(holdTimer);
  }
};
