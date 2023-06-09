/*
 * Control the brightness of an LED using a potentiometer.
 *
 * Tested on: ESP8266 (NodeMCU).
 *
 * Notes:
 *   - Using the IO module, which is an experimental implementation of ECMA-419.
 *   - Using a built-in LED connected to GPIO 2, which is pulled up and set to HIGH at boot.
 *   - The ESP8266 has only one analog input, so the "pin" property is not used.
 *   - The ADC and PWM of the ESP8266 have a 10-bit resolution.
 */

import Analog from 'embedded:io/analog';
import PWM from 'embedded:io/pwm';

const potentiometer = new Analog({});

const led = new PWM({
  pin: 2,
  hz: 10000,
});

System.setInterval(() => {
  led.write(potentiometer.read());
}, 100);
