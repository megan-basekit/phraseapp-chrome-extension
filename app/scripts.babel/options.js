'use strict';

import OptionEvents from './modules/Events/Options';

window.addEventListener('load', () => {
  document.getElementById('token').onkeyup      = OptionEvents.onKeyUp;
  document.getElementById('save').onclick       = OptionEvents.onSave;
  document.getElementById('reset').onclick      = OptionEvents.onReset;
  document.getElementById('update').onclick     = OptionEvents.onUpdate;
  document.getElementById('projects').onchange  = OptionEvents.onChange;
  document.getElementById('clipboard').onchange = OptionEvents.onCheckboxChange;
});

