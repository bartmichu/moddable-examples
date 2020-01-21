/*
 * Tested on: ESP8266 NodeMCU / Moddable One
 *
 * Hold a button to toggle LED.
 *
 * Notes:
 * - Uses TC53 IO class pattern.
 * - Built-in LED available via pulled up GPIO 2, HIGH at boot.
 * - Built-in Flash button available via GPIO 0.
 * - Software debouncing.
 */

import Digital from 'builtin/digital';

let timeoutId = null;

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
    if (reading) {
      stopTimeout();
    } else {
      stopTimeout();
      timeoutId = System.setTimeout(() => {
        led.write(!led.read());
      }, 1000);
    }
  },
});
