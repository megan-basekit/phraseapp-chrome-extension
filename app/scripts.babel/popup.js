'use strict';

import { PopupView } from './modules/Views';
import Notify from './modules/Events/Notify';

window.addEventListener('load', () => {
  Notify.on('clipboard.copyto', (Url) => {
    chrome.runtime.sendMessage({
      type: 'copy',
      text: Url
    });
  });

  Notify.on('settings.show', () => {
    chrome.tabs.create({
      url: `chrome://extensions/?options=${chrome.runtime.id}`
    });
  });

  Notify.on('selection.get', () => {
    chrome.extension.sendMessage({
      action: 'getSelection'
    }, response => {
      if (typeof response !== 'undefined' && response.data.length > 0) {
        Notify.emit('selection.selected', response.data);
      }
    });
  });

  const popup = new PopupView();

  popup.init();
});
