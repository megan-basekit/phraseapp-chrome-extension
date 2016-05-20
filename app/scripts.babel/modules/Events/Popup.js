'use strict';

import PopupView from '../Views/Popup';

class Popup {
  onKeyUp() {
    PopupView.validateForm();
  }

  onSelectProject() {
    PopupView.changeProject();
  }

  onImport() {
    PopupView.save();
  }

  showSettings() {
    PopupView.showSettings();
  }
}

const e = new Popup();

export { e as default };
