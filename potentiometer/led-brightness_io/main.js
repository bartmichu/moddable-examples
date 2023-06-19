/*
 * Control the brightness of an LED using a potentiometer.
 *
 * Tested on: ESP8266 (NodeMCU), RP2040 (Raspberry Pi Pico W).
 *
 * Notes:
 *   - Using the IO module, which is an experimental implementation of ECMA-419.
 *
 * Parts list:
 *   - Raspberry Pi Pico W
 *   - Breadboard
 *   - Jumper wires
 *   - Potentiometer
 *   - Light-emitting diode (LED)
 *   - 330 ohm Resistor (Orange, Orange, Brown, Gold)
*/

import Analog from 'embedded:io/analog';
import PWM from 'embedded:io/pwm';

// pin 22 on Pico W, pin 5 on NodeMCU V2
const led = new PWM({
  pin: 22,
});

// pin 28 on Pico W, pin 0 on NodeMCU V2
const potentiometer = new Analog({
  pin: 28,
});

System.setInterval(() => {
  led.write((potentiometer.read() * ((1 << led.resolution) - 1)) / ((1 << potentiometer.resolution) - 1));
}, 100);
