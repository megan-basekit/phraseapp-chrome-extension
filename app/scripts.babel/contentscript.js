'use strict';

chrome.extension.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'getSelection') {
    sendResponse({
      data: window.getSelection().toString().trim()
    });
  }
});
