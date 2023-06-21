/*
 * Control the brightness of an LED using a potentiometer.
 *
 * Tested on: ESP8266 (NodeMCU), RP2040 (Raspberry Pi Pico W).
 *
 * Parts list:
 *   - Raspberry Pi Pico W
 *   - Breadboard
 *   - Jumper wires
 *   - Potentiometer
 *   - Light-emitting diode (LED)
 *   - 330 ohm Resistor (Orange, Orange, Brown, Gold)
*/

// NOTE: Using the IO module, which is an experimental implementation of ECMA-419.
import Analog from 'embedded:io/analog';
import PWM from 'embedded:io/pwm';

// NOTE: The LED must be connected to a PWM (Pulse Width Modulation) pin,
// e.g. pin 22 on Pico W, pin 5 on NodeMCU V2.
const led = new PWM({
  pin: 22,
});

// NOTE: The potentiometer must be connected to a ADC (Analog-to-Digital Converter) pin,
// e.g. pin 28 on Pico W, pin 0 on NodeMCU V2.
const potentiometer = new Analog({
  pin: 28,
});

// NOTE: Using a bitwise left shift operation to calculate the maximum allowed value
// of an ADC and/or PWM.
const maxLedValue = (1 << led.resolution) - 1;
const maxPotentiometerValue = (1 << potentiometer.resolution) - 1;

System.setInterval(() => {
  // NOTE: Since the ADC and PWM can have different resolutions, it is necessary to convert
  // the value between the two.
  led.write((potentiometer.read() * maxLedValue) / maxPotentiometerValue);
}, 100);
