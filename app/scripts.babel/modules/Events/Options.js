'use strict';

import { OptionsView } from '../Views';

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

  onCheckboxChange() {
    OptionsView.saveToClipboard();
  }

  onAdvancedChange() {
    OptionsView.advancedOptions();
  }
}

const e = new Options();

export { e as default };
