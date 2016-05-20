'use strict';

import config from '../../Config';
import Phraseapp from '../Api/Phraseapp';
import Storage from '../Storage/Storage';
import Validator from '../Validator';
import Notification from '../Notification';

class Options {
  constructor() {
    if (null !== document.getElementById('options')) {
      this._init();
    }
  }

  getProjects() {
    Phraseapp.projects().then(projects => {
      this._setProjects(projects);
    }, response => {
      Notification.error(response);
    });
  }

  resetForm() {
    document.getElementById('token').focus();
    document.getElementById('token').value        = '';
    document.getElementById('projects').innerHTML = '';

    this._disable(
      document.getElementById('update')
    );

    Storage.clear();
  }

  checkForm() {
    const token     = document.getElementById('token');
    const saveBtn   = document.getElementById('save');
    const updateBtn = document.getElementById('update');

    if (Validator.isTokenValid(token.value)) {
      token.classList.remove('error');
      this._enable([saveBtn, updateBtn]);
    } else {
      token.classList.add('error');
      this._disable([saveBtn, updateBtn]);
    }
  }

  saveOptions() {
    const token     = document.getElementById('token');
    const projects  = document.getElementById('projects');
    const selected  = projects.options[projects.selectedIndex];

    if (Validator.isTokenValid(token.value)) {
      if (typeof selected !== 'undefined') {
        Storage.set(
          'phraseapp.project',
          {
            id  : selected.value,
            name: selected.text
          }
        );
      }

      Storage.set(
        'phraseapp.token',
        token.value
      );

      Notification.success('Sucessfully saved options');
    }
  }

  selectProject() {
    const projects = document.getElementById('projects');
    const selected = projects.options[projects.selectedIndex];

    if (typeof selected !== 'undefined') {
      Storage.set(
        'phraseapp.project',
        {
          id  : selected.value,
          name: selected.text
        }
      );
      this._setDefaultLocaleForProject(selected.value);
    }
  }

  _setProjects(projects = []) {
    this._updateProjectList(
      projects,
      Storage.get('phraseapp.project')
    );

    Storage.set('phraseapp.projects', projects);
  }

  _updateProjectList(projects, defaultProject = null) {
    let selected;
    let options = '';

    const select  = document.getElementById('projects');

    projects.forEach(project => {
      selected = defaultProject && defaultProject.id === project.id
      ? 'selected=\'selected\''
      : '';

      options += `<option ${selected} value=${project.id}>${project.name}</option>`;
    });

    select.innerHTML = options;
  }

  _setDefaultLocaleForProject(id) {
    const projects  = document.getElementById('projects');

    Phraseapp.projectLocale(id).then(locales => {
      locales.forEach(locale => {
        if (locale.code === config.locale) {
          projects.classList.remove('error');
          Storage.set('phraseapp.default.locale', locale.id);
        }
      });

      if (!locales.length) {
        projects.classList.add('error');
        Notification.error('The selected project has no locales.');
      }
    }, response => {
      projects.classList.add('error');
      Notification.error(response);
    });
  }

  _enable(elements = [], className = 'button-primary') {
    let elementList = elements;

    if (!Array.isArray(elements)) {
      elementList = [elements];
    }

    elementList.forEach(el => {
      el.removeAttribute('disabled');
      el.classList.add(className);
    });
  }

  _disable(elements = [], className = 'button-primary') {
    let elementList = elements;

    if (!Array.isArray(elements)) {
      elementList = [elements];
    }

    elementList.forEach(el => {
      el.setAttribute('disabled', true);
      el.classList.remove(className);
    });
  }

  _init() {
    let token;
    let projects;

    const saveBtn    = document.getElementById('save');
    const tokenInput = document.getElementById('token');
    const updateBtn  = document.getElementById('update');

    if (null !== (token = Storage.get('phraseapp.token'))) {
      tokenInput.value = token;
      this._enable(
        [saveBtn, updateBtn]
      );
    }

    if (null !== (projects = Storage.get('phraseapp.projects'))) {
      this._setProjects(projects);
    }
  }
}

const v = new Options();

export { v as default };
