/*
 * Use a button to toggle an LED.
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

import Digital from 'pins/digital';
import Monitor from 'pins/digital/monitor';

// NOTE: The LED must be connected to a GPIO (General-purpose input/output) pin,
// e.g. pin 22 on Pico W, pin 5 on NodeMCU V2.
const led = new Digital({
  pin: 22,
  mode: Digital.Output,
});

// NOTE: The button must be connected to a GPIO (General-purpose input/output) pin,
// e.g. pin 9 on Pico W, pin 12 on NodeMCU V2.
// No debouncing mechanism has been implemented for the button.
const button = new Monitor({
  pin: 9,
  mode: Digital.Input,
  edge: Monitor.Falling,
});

let ledState = button.read();

button.onChanged = function onChanged() {
  if (this.read() === 0) {
    led.write(ledState);
    ledState = !ledState;
  }
};
