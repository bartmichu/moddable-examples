/*
 * Blink an LED.
 *
 * Tested on: ESP8266 (NodeMCU, Moddable One), RP2040 (Raspberry Pi Pico W).
 *
 * Parts list:
 *   - Raspberry Pi Pico W
 *   - Beadboard
 *   - Jumper wires
 *   - Light-emitting diode (LED)
 *   - 330 ohm Resistor (Orange, Orange, Brown, Gold)
 */

// NOTE: Using the IO module, which is an experimental implementation of ECMA-419.
import Digital from 'embedded:io/digital';

// NOTE: The LED must be connected to a GPIO (General-purpose input/output) pin,
// e.g. pin 22 on Pico W, pin 5 on NodeMCU V2.
const led = new Digital({
  pin: 22,
  mode: Digital.Output,
});

let ledState = 1;

System.setInterval(() => {
  led.write(ledState);
  ledState = !ledState;
}, 200);
