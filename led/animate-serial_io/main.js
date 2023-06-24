/*
 * Animate three LEDs - serial.
 *
 * Tested on: RP2040 (Raspberry Pi Pico W).
 *
 * Parts list:
 *   - Raspberry Pi Pico W
 *   - Beadboard
 *   - Jumper wires
 *   - 3x Light-emitting diode (LED)
 *   - 3x 330 ohm Resistor (Orange, Orange, Brown, Gold)
 */

// NOTE: Using the IO module, which is an experimental implementation of ECMA-419.
import DigitalBank from 'embedded:io/digitalbank';

// NOTE: The LEDs must be connected to a GPIO (General-purpose input/output) pins,
// e.g. pins 6,4,2 on Pico W.
const leds = new DigitalBank({
  pins: (1 << 6) | (1 << 4) | (1 << 2),
  mode: DigitalBank.Output,
});

const values = [1 << 6, 1 << 4, 1 << 2];
let index = 0;

System.setInterval(() => {
  leds.write(values[index]);
  // NOTE: Using the modulo operator to cycle through items in an array.
  index = (index + 1) % values.length;
}, 150);
