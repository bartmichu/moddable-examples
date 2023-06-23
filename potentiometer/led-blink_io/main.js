/*
 * Control the blink speed of an LED using a potentiometer.
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
import Digital from 'embedded:io/digital';
import Timer from 'timer';

// NOTE: The LED must be connected to a GPIO (General-purpose input/output) pin,
// e.g. pin 22 on Pico W, pin 5 on NodeMCU V2.
const led = new Digital({
  pin: 22,
  mode: Digital.Output,
});

// NOTE: The potentiometer must be connected to a ADC (Analog-to-digital converter) pin,
// e.g. pin 28 on Pico W, pin 0 on NodeMCU V2.
const potentiometer = new Analog({
  pin: 28,
});

// NOTE: Using a bitwise left shift operation to calculate the maximum allowed value
// of an ADC and/or PWM.
const maxPotentiometerValue = (1 << potentiometer.resolution) - 1;

let ledState = 1;

let interval;

Timer.repeat((timerId) => {
  led.write(ledState);
  ledState ^= 1;

  interval = Math.round(1000 * (potentiometer.read() / maxPotentiometerValue));

  Timer.schedule(timerId, interval, interval);
}, 1);
