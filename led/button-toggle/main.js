/*
 * Use a button to toggle an LED.
 *
 * Tested on: ESP8266 (NodeMCU, Moddable One).
 *
 * Notes:
 *   - Using a built-in LED connected to GPIO 2, which is pulled up and set to HIGH at boot.
 *   - Using a built-in Flash button connected to GPIO 0.
 *   - No debouncing mechanism has been implemented for the button.
 */

import Digital from 'pins/digital';
import Monitor from 'pins/digital/monitor';

const led = new Digital({
  pin: 2,
  mode: Digital.Output,
});

const button = new Digital({
  pin: 0,
  mode: Digital.Input,
});

const buttonMonitor = new Monitor({
  pin: button.pin,
  mode: Digital.Input,
  edge: Monitor.Falling,
});

buttonMonitor.onChanged = function onChanged() {
  led.write(!led.read());
};
