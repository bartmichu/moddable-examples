/*
 * Blink an LED.
 *
 * Tested on: ESP8266 (NodeMCU, Moddable One), RP2040 (Raspberry Pi Pico W).
 *
 * Notes:
 *   - Using the IO module, which is an experimental implementation of ECMA-419.
 *
 * Parts list:
 *   - Raspberry Pi Pico W
 *   - Beadboard
 *   - Jumper wires
 *   - Light-emitting diode (LED)
 *   - 330 ohm Resistor (Orange, Orange, Brown, Gold)
 */

import Digital from 'embedded:io/digital';

// pin 22 on Pico W, pin 5 on NodeMCU V2
const led = new Digital({
  pin: 22,
  mode: Digital.Output,
});

let ledState = 1;

System.setInterval(() => {
  led.write(ledState);
  ledState = !ledState;
}, 200);
