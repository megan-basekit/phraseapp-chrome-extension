'use strict';

import config from './Config';

chrome.runtime.onInstalled.addListener(() => {
  const condition = {
    pageUrl: {
      schemes: ['https', 'http']
    }
  };

  if (config.domain.length) {
    condition.pageUrl.hostEquals = config.domain;
  }

  chrome.declarativeContent.onPageChanged.removeRules(null, () => {
    chrome.declarativeContent.onPageChanged.addRules([{
      conditions: [
        new chrome.declarativeContent.PageStateMatcher(condition)
      ],
      actions: [new chrome.declarativeContent.ShowPageAction()]
    }]);
  });
});

// FIXME: This throws errors at random times, should really use chrome.tabs.query
chrome.extension.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'getSelection') {
    try {
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
    } catch (e) {
      console.log(e);
    }
  }

  return true;
});

