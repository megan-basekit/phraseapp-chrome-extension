'use strict';

class Storage {
  all() {
    const items = [];
    const length = localStorage.length;

    for (let i = length - 1; i >= 0; i--) {
      const key = localStorage.key(i);

      items.push({
        [key] : localStorage.getItem(key)
      });
    }

    return items;
  }

  get(key) {
    let value;

    if (typeof key === 'undefined' || key === null) {
      return null;
    }

    if (null !== (value = localStorage.getItem(key))) {
      return this._decompact(value);
    }

    return value;
  }

  set(key, value = null) {
    if (typeof key === 'undefined' || key === null) {
      return null;
    }

    localStorage.setItem(
      key,
      this._compact(value)
    );

    return value;
  }

  remove(key) {
    localStorage.removeItem(key);
  }

  clear() {
    localStorage.clear();
  }

  _compact(value) {
    if (typeof value === 'object') {
      return JSON.stringify(value);
    }

    return value;
  }

  _decompact(value) {
    if (this._isJson(value)) {
      return JSON.parse(value);
    }

    return value;
  }

  _isJson(str) {
    try {
      JSON.parse(str);
    } catch (e) {
      return false;
    }

    return true;
  }
}

const s = new Storage();

export { s as default };

