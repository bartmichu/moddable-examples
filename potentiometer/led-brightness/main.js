/*
 * ESP8266 / NodeMCU
 *
 * Use potentiometer to control brightness of a LED.
 *
 * Notes:
 * - Uses TC53 IO class pattern.
 * - Built-in LED available via pulled up GPIO 2, HIGH at boot.
 * - ESP8266 has only one analog input so the pin property is unused.
 * - 10-bit resolution for ADC and PWM.
 */

import Analog from 'builtin/analog';
import PWM from 'builtin/pwm';

const led = new PWM({ pin: 2, hz: 10000 });
const potentiometer = new Analog();

System.setInterval(() => {
  led.write(potentiometer.read());
}, 100);