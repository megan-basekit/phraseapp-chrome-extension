'use strict';

import config from '../../Config';

class Request {

  get(endpoint = null, options = {}) {
    return this._request(
      this._format('GET', endpoint, options)
    );
  }

  post(endpoint = null, options = {}) {
    return this._request(
      this._format('POST', endpoint, options)
    );
  }

  _format(method = 'GET', endpoint = null, options = {}) {
    const opts = {
      method,
      url   : config.api + endpoint
    };

    return Object.assign({}, options, opts);
  }

  _response(req) {
    try {
      return JSON.parse(req.responseText);
    } catch (e) {
      return null;
    }
  }

  _getApiError(response = {}, status) {
    if (response.errors && Array.isArray(response.errors)) {
      const error = response.errors.shift();

      if (error.resource && error.message) {
        return `${error.resource} ${error.message}`;
      }
    }
    return status;
  }

  _request(options) {
    return new Promise((resolve, reject) => {
      let payload = null;
      const req = new XMLHttpRequest();

      req.open(options.method || 'GET', options.url, true);
      Object.keys(options.headers || {}).forEach(key => {
        req.setRequestHeader(key, options.headers[key]);
      });

      // FIXME: add a better description of the error message
      req.onerror = () => {
        resolve(
          'Strange things are afoot at the Circle-K! Currently cannot make the api at present.'
        );
      };

      req.onreadystatechange = () => {
        if (req.readyState !== XMLHttpRequest.DONE) {
          return;
        }

        const response = this._response(req);

        if ([200, 201, 304].includes(req.status) === false) {
          const error = `Server responded with a status of ${req.status}`;

          reject(
            response !== null
              ? this._getApiError(response, req.statusText)
              : error
          );
        } else {
          resolve(response);
        }
      };

      if (options.data) {
        payload = JSON.stringify(options.data);
      }

      req.send(payload);
    });
  }
}

const r = new Request();

export { r as default };
