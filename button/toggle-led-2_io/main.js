/*
 * Hold a button to toggle an LED.
 * A basic throttling mechanism is being used to compensate for unreliable button.
 *
 * Tested on: ESP8266 (NodeMCU, Moddable One), RP2040 (Raspberry Pi Pico W).
 *
 * Parts list:
 *   - Raspberry Pi Pico W
 *   - Beadboard
 *   - Jumper wires
 *   - Light-emitting diode (LED)
 *   - Pushbutton
 *   - 330 ohm Resistor (Orange, Orange, Brown, Gold)
 *   - 10K ohm Resistor (Brown, Black, Orange, Gold)
 */

// NOTE: Using the IO module, which is an experimental implementation of ECMA-419.
import Digital from 'embedded:io/digital';
import Timer from 'timer';

// NOTE: The LED must be connected to a GPIO (General-purpose input/output) pin,
// e.g. pin 22 on Pico W, pin 5 on NodeMCU V2.
const led = new Digital({
  pin: 22,
  mode: Digital.Output,
});

let ledState = 0;

led.write(ledState);

// NOTE: Using timers to implement a basic throttling mechanism.
const holdTimer = Timer.set((id) => {
  // NOTE: Using the bitwise XOR (exclusive OR) operation to flip the value.
  ledState ^= 1;
  led.write(ledState);
  Timer.schedule(id);
}, 5000);
Timer.schedule(holdTimer);

const holdThreshold = 1000;

// NOTE: The button must be connected to a GPIO (General-purpose input/output) pin,
// e.g. pin 9 on Pico W, pin 12 on NodeMCU V2.
// eslint-disable-next-line no-unused-vars
const button = new Digital({
  pin: 9,
  mode: Digital.Input,
  edge: Digital.Rising | Digital.Falling,

  onReadable() {
    if (this.read() === 0) {
      Timer.schedule(holdTimer, holdThreshold);
    } else {
      Timer.schedule(holdTimer);
    }
  },
});
