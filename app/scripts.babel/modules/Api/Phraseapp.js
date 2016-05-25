'use strict';

import request from './Request';
import { Storage } from '../Storage';

class Phraseapp {

  projects() {
    return new Promise((resolve, reject) => {
      const token = Storage.get('phraseapp.token');
      const options = {
        headers: {
          'Content-type': 'application/json',
          Authorization: `token ${token}`
        }
      };

      request.get('/projects', options).then(response => {
        resolve(response);
      }, response => {
        reject(response);
      });
    });
  }

  projectLocale(id) {
    return new Promise((resolve, reject) => {
      const token = Storage.get('phraseapp.token');
      const options = {
        headers: {
          'Content-type': 'application/json',
          Authorization: `token ${token}`
        }
      };

      request.get(`/projects/${id}/locales`, options).then(response => {
        resolve(response);
      }, response => {
        reject(response);
      });
    });
  }

  importTranslation(data) {
    return new Promise((resolve, reject) => {
      this._addKey(data)
      .then(this._addTranslation)
      .then(response => {
        resolve(response);
      })
      .catch(exception => {
        reject(exception);
      });
    });
  }

  _addKey(translation) {
    return new Promise((resolve, reject) => {
      const token = Storage.get('phraseapp.token');
      const params = {
        name: translation.key
      };
      const options = {
        headers: {
          'Content-type': 'application/json',
          Authorization: `token ${token}`
        },
        data: params
      };

      request.post(`/projects/${translation.project}/keys`, options)
      .then(response => {
        resolve({
          'key_id'   : response.id,
          'locale_id': translation.locale,
          'project'  : translation.project,
          'content'  : translation.translation
        });
      }, response => {
        reject(response);
      });
    });
  }

  _addTranslation(params) {
    return new Promise((resolve, reject) => {
      const token = Storage.get('phraseapp.token');
      const options = {
        headers: {
          'Content-type': 'application/json',
          Authorization: `token ${token}`
        },
        data: params
      };

      request.post(`/projects/${params.project}/translations`, options)
      .then(response => {
        resolve(response);
      }, response => {
        reject(response);
      });
    });
  }
}

const p = new Phraseapp();

export { p as default };

