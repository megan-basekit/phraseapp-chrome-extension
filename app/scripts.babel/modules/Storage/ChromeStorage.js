'use strict';

// TODO: impliment rather than local storage
class ChromeStorage {
  empty(items) {
    if (typeof items === 'undefined' || items === null) {
      return true;
    }

    return !(typeof items === 'object' && Object.keys(items).length);
  }

  get(keys) {
    return new Promise((resolve, reject) => {
      chrome.storage.sync.get(keys, items => {
        const error = chrome.runtime.lastError;

        if (error) {
          reject(error);
        } else {
          resolve(
            this.empty(items) ? { [keys] : null } : items
          );
        }
      });
    });
  }


  set(items = {}) {
    return new Promise((resolve, reject) => {
      chrome.storage.sync.set(items, () => {
        const error = chrome.runtime.lastError;

        if (error) {
          reject(error);
        } else {
          resolve(items);
        }
      });
    });
  }


  remove(keys) {
    return new Promise((resolve, reject) => {
      chrome.storage.sync.remove(keys, () => {
        const error = chrome.runtime.lastError;

        if (error) {
          reject(error);
        } else {
          resolve();
        }
      });
    });
  }

  all() {
    return new Promise((resolve, reject) => {
      chrome.storage.sync.get(null, items => {
        const error = chrome.runtime.lastError;

        if (error) {
          reject(error);
        } else {
          resolve(items);
        }
      });
    });
  }

  clear() {
    return new Promise((resolve, reject) => {
      chrome.storage.sync.clear(() => {
        const error = chrome.runtime.lastError;

        if (error) {
          reject(error);
        } else {
          resolve();
        }
      });
    });
  }
}

const s = new ChromeStorage();

export { s as default };

