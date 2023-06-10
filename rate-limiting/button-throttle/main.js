/*
 * Hold a button for two seconds.
 *
 * Tested on: ESP8266 (NodeMCU).
 *
 * Notes:
 *   - A debugger is required. Use the -d argument to build a debug instrumented version.
 *   - Using a built-in Flash button connected to GPIO 0.
 *   - Using a simple throttling mechanism.
 */

import Digital from 'pins/digital';
import Monitor from 'pins/digital/monitor';
import Timer from 'timer';

const button = new Digital({
  pin: 0,
  mode: Digital.Input,
});

const buttonMonitor = new Monitor({
  pin: button.pin,
  mode: Digital.Input,
  edge: Monitor.Rising | Monitor.Falling,
});

const holdTimer = Timer.set((id) => {
  trace('hold\n');
  Timer.schedule(id);
}, 5000);
Timer.schedule(holdTimer);

buttonMonitor.onChanged = function onChanged() {
  if (this.read() === 0) {
    Timer.schedule(holdTimer, 2000);
  } else {
    Timer.schedule(holdTimer);
  }
};
