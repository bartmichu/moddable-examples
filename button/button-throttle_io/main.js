/*
 * Hold a button for two seconds.
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
 *   - Beadboard
 *   - Jumper wires
 *   - Pushbutton
 *   - 10K ohm Resistor (Brown, Black, Orange, Gold)
 */

import Digital from 'embedded:io/digital';
import Timer from 'timer';

const holdTimer = Timer.set((id) => {
  trace('hold\n');
  Timer.schedule(id);
}, 5000);
Timer.schedule(holdTimer);

// pin 9 on Pico W, pin 12 on NodeMCU V2
// eslint-disable-next-line no-unused-vars
const button = new Digital({
  pin: 9,
  mode: Digital.Input,
  edge: Digital.Rising | Digital.Falling,

  onReadable() {
    if (this.read() === 0) {
      Timer.schedule(holdTimer, 2000);
    } else {
      Timer.schedule(holdTimer);
    }
  },
});
