'use strict';

class Validator {
  isTokenValid(token) {
    const pattern = new RegExp('^[0-9a-z]+$');

    return pattern.test(token);
  }

  isDomainValid(domain = '') {
    const pattern = /^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9]\.[a-zA-Z]{2,}$/;

    return pattern.test(domain);
  }

}

const v = new Validator();

export { v as default };
