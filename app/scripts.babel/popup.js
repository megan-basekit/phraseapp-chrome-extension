'use strict';

import PopupEvents from './modules/Events/Popup';

window.addEventListener('load', () => {
  document.getElementById('key').onkeyup         = PopupEvents.onKeyUp;
  document.getElementById('translation').onkeyup = PopupEvents.onKeyUp;
  document.getElementById('import').onclick      = PopupEvents.onImport;
  document.getElementById('settings').onclick    = PopupEvents.showSettings;
  document.getElementById('projects').onchange   = PopupEvents.onSelectProject;
});

