'use strict';

import OptionsView from '../Views/Options';

class Options {
  onSave() {
    OptionsView.saveOptions();
  }

  onKeyUp() {
    OptionsView.checkForm();
  }

  onReset() {
    OptionsView.resetForm();
  }

  onUpdate() {
    OptionsView.getProjects();
  }

  onChange() {
    OptionsView.selectProject();
  }
}

const e = new Options();

export { e as default };
