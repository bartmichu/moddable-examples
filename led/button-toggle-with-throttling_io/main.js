/*
 * Hold a button to toggle an LED.
 *
 * Tested on: ESP8266 (NodeMCU, Moddable One), RP2040 (Raspberry Pi Pico W).
 *
 * Notes:
 *   - Using the IO module, which is an experimental implementation of ECMA-419.
 *   - Using a simple throttling mechanism.
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

import Digital from 'embedded:io/digital';
import Timer from 'timer';

// pin 22 on Pico W, pin 5 on NodeMCU V2
const led = new Digital({
  pin: 22,
  mode: Digital.Output,
});

let ledState = 0;

led.write(ledState);

const holdTimer = Timer.set((id) => {
  ledState = !ledState;
  led.write(ledState);
  Timer.schedule(id);
}, 5000);
Timer.schedule(holdTimer);

const holdThreshold = 1000;

// pin 9 on Pico W, pin 12 on NodeMCU V2
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
