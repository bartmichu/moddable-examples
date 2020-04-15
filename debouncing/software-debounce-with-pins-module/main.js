/*
 * Tested on: ESP8266 (NodeMCU, Moddable One)
 *
 * Press and/or hold a button to toggle LED.
 *
 * Notes:
 * - Built-in LED available via pulled up GPIO 2, HIGH at boot.
 * - Built-in Flash button available via GPIO 0.
 * - Software debouncing.
 * - Disable "BREAK -> On Exceptions" option in xsbug preferences.
 */

import Digital from 'pins/digital';
import Monitor from 'pins/digital/monitor';
import Timer from 'timer';

let pressTimerId = null;
let holdTimerId = null;
const pressDelay = 100;
const holdDelay = 1000;

const led = new Digital({
  pin: 2,
  mode: Digital.Output,
});

const stopTimers = function stopTimers() {
  try {
    Timer.clear(pressTimerId);
  } catch (error) {
    // trace(`This is probably normal: ${error}\n`);
  }

  try {
    Timer.clear(holdTimerId);
  } catch (error) {
    // trace(`This is probably normal: ${error}\n`);
  }
};

const pressHandler = function pressHandler() {
  led.write(1);
};

const holdHandler = function holdHandler() {
  led.write(0);
};

const button = new Digital({
  pin: 0,
  mode: Digital.Input,
});

const buttonMonitor = new Monitor({
  pin: button.pin,
  mode: Digital.Input,
  edge: Monitor.Rising | Monitor.Falling,
});

buttonMonitor.onChanged = function onChanged() {
  if (button.read()) {
    stopTimers();
  } else {
    stopTimers();

    pressTimerId = Timer.repeat(() => {
      pressHandler();
    }, pressDelay);

    holdTimerId = Timer.repeat(() => {
      holdHandler();
    }, holdDelay);
  }
};
