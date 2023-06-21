/*
 * Pulse an LED.
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
import PWM from 'embedded:io/pwm';

// NOTE: The LED must be connected to a PWM (Pulse Width Modulation) pin,
// e.g. pin 22 on Pico W, pin 5 on NodeMCU V2.
const led = new PWM({
  pin: 22,
});

// NOTE: Using a bitwise left shift operation to calculate the maximum allowed value
// of an ADC and/or PWM.
const maxBrightness = (1 << led.resolution) - 1;
const minBrightness = 0;

let step = 10;
let brightness = minBrightness + step;

System.setInterval(() => {
  led.write(brightness);

  if (brightness <= minBrightness || brightness >= maxBrightness) {
    step = -step;
  }

  brightness = Math.min(Math.max(brightness + step, minBrightness), maxBrightness);
}, 10);
