'use strict';

class Validator {
  isTokenValid(token) {
    const pattern = new RegExp('^[0-9a-z]+$');

    return pattern.test(token);
  }
}

const v = new Validator();

export { v as default };
