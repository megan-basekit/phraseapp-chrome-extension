'use strict';

const notify = (body, icon) => {
  if (window.Notification) {
    new window.Notification('Phraseapp Key Importer', {
      icon,
      body
    });
  }

  if (!window.Notification) {
    window.alert(body);
  }
};

class Notification {
  constructor() {
    this.icons = {
      info   : 'images/info.png',
      error  : 'images/error.png',
      success: 'images/success.png'
    };
  }

  success(message) {
    notify(message, this.icons.success);
  }

  info(message) {
    notify(message, this.icons.info);
  }

  error(message) {
    notify(message, this.icons.error);
  }
}

const n = new Notification();

export { n as default };

