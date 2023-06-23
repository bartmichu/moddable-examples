/*
 * Hold a button for two seconds and observe the drift in the raw and debounced counters.
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
import Timer from 'timer';

// NOTE: Using timers to implement a basic throttling mechanism.
const holdTimer = Timer.set((id) => {
  trace('hold\n');
  Timer.schedule(id);
}, 5000);
Timer.schedule(holdTimer);

// NOTE: The button must be connected to a GPIO (General-purpose input/output) pin,
// e.g. pin 9 on Pico W, pin 12 on NodeMCU V2.
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
