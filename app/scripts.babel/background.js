'use strict';

import { Storage } from './modules/Storage';

chrome.runtime.onInstalled.addListener(() => {
  chrome.declarativeContent.onPageChanged.removeRules(null, () => {
    let domain;
    const condition = {
      pageUrl: {
        schemes: ['https', 'http']
      }
    };

    if (null !== (domain = Storage.get('phraseapp.domain'))) {
      condition.pageUrl.urlContains = domain;
    }

    chrome.declarativeContent.onPageChanged.addRules([{
      conditions: [
        new chrome.declarativeContent.PageStateMatcher(
         condition
        )
      ],
      actions: [new chrome.declarativeContent.ShowPageAction()]
    }]);
  });
});

chrome.runtime.onMessage.addListener(message => {
  if (message && message.type === 'copy') {
    const input = document.createElement('textarea');

    document.body.appendChild(input);
    input.value = message.text;
    input.focus();
    input.select();
    document.execCommand('Copy');
    input.remove();
  }
});

// FIXME: This throws errors at random times, should really use chrome.tabs.query
chrome.extension.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'getSelection') {
    chrome.tabs.getSelected(null, tab => {
      chrome.tabs.sendMessage(
        tab.id,
        {
          action: 'getSelection'
        },
        response => {
          if (typeof response !== 'undefined') {
            sendResponse({
              data: response.data
            });
          }
        }
      );
    });
  }

  return true;
});

