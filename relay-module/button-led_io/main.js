/*
 * Press the button to toggle a relay module and an LED.
 *
 * Tested on: RP2040 (Raspberry Pi Pico W).
 *
 * Parts list:
 *   - Raspberry Pi Pico W
 *   - Beadboard
 *   - Jumper wires
 *   - Light-emitting diode (LED)
 *   - Pushbutton
 *   - One channel 3V relay module
 *   - 330 ohm Resistor (Orange, Orange, Brown, Gold)
 *   - 10K ohm Resistor (Brown, Black, Orange, Gold)
 */

// NOTE: Using the IO module, which is an experimental implementation of ECMA-419.
import Digital from 'embedded:io/digital';

// NOTE: The LED must be connected to a GPIO (General-purpose input/output) pin,
// e.g. pin 22 on Pico W.
const led = new Digital({
  pin: 22,
  mode: Digital.Output,
});

// NOTE: The relay module must be connected to a GPIO (General-purpose input/output) pin,
// e.g. pin 10 on Pico W.
const relay = new Digital({
  pin: 10,
  mode: Digital.Output,
});

let sharedState = 0;

const toggleRelay = function toggleRelay(newState) {
  led.write(newState);
  relay.write(newState);
};

toggleRelay(sharedState);

// NOTE: The button must be connected to a GPIO (General-purpose input/output) pin,
// e.g. pin 9 on Pico W.
// eslint-disable-next-line no-unused-vars
const button = new Digital({
  pin: 9,
  mode: Digital.Input,
  edge: Digital.Rising | Digital.Falling,

  // NOTE: Using a simple throttling mechanism.
  onReadable() {
    if (this.read() === 0) {
      this.timeout ??= System.setTimeout(() => {
        // NOTE: Using the bitwise XOR (exclusive OR) operation to "reverse" the button reading.
        sharedState ^= 1;
        toggleRelay(sharedState);
        delete this.timeout;
      }, 70);
    } else {
      System.clearTimeout(this.timeout);
      delete this.timeout;
    }
  },
});
