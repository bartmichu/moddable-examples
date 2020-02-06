/*
 * Tested on: ESP8266 NodeMCU / Moddable One
 *
 * Use a button to toggle LED.
 *
 * Notes:
 * - Built-in LED available via pulled up GPIO 2, HIGH at boot.
 * - Built-in Flash button available via GPIO 0.
 * - No debouncing.
 */

import Digital from 'pins/digital';
import Monitor from 'pins/digital/monitor';

const led = new Digital({ pin: 2, mode: Digital.Output });

const button = new Digital({
  pin: 0,
  mode: Digital.Input,
});

const buttonMonitor = new Monitor({
  pin: 0,
  mode: Digital.Input,
  edge: Monitor.Falling,
});

buttonMonitor.onChanged = function onChanged() {
  led.write(!led.read());
};
