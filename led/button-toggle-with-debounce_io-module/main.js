/*
 * Tested on: ESP8266 (NodeMCU, Moddable One)
 *
 * Toggle LED with a button hold.
 *
 * Notes:
 * - Uses experimental ESP8266 implementation of TC53 IO class pattern.
 * - Built-in LED available via pulled up GPIO 2, HIGH at boot.
 * - Built-in Flash button available via GPIO 0.
 * - Software debouncing.
 * - Disable "BREAK -> On Exceptions" option in xsbug preferences.
 */

import Digital from 'builtin/digital';

let timeoutId = null;
const pressDelay = 1000;

const stopTimeout = function stopTimeout() {
  try {
    System.clearTimeout(timeoutId);
  } catch (error) {
    // trace(`This is probably normal: ${error}\n`);
  }
};

const led = new Digital({ pin: 2, mode: Digital.Output });

const button = new Digital({
  pin: 0,
  mode: Digital.Input,
  edge: Digital.Rising | Digital.Falling,
  onReadable() {
    const reading = this.read();
    stopTimeout();
    if (!reading) {
      timeoutId = System.setTimeout(() => {
        led.write(!led.read());
      }, pressDelay);
    }
  },
});
