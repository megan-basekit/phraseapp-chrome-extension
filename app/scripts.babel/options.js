'use strict';

import { OptionsView } from './modules/Views';

window.addEventListener('load', () => {
  const options = new OptionsView();

  options.init();
});
