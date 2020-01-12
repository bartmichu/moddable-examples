/*
 * ESP8266 / NodeMCU
 *
 * Control LED with a button.
 *
 * Notes:
 * - Uses TC53 IO class pattern.
 * - Built-in LED available via pulled up GPIO 2, HIGH at boot.
 * - Built-in Flash button available via GPIO 0.
 * - No debouncing.
 */

import Digital from 'builtin/digital';

const led = new Digital(
  { pin: 2, mode: Digital.Output },
);

const button = new Digital({
  pin: 0,
  mode: Digital.InputPullUp,
  edge: Digital.Rising | Digital.Falling,
  onReadable() {
    led.write(this.read());
  },
});