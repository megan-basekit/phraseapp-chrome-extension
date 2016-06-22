'use strict';

import config from '../../Config';
import { Storage } from '../Storage';
import { Phraseapp } from '../Api';
import Notify from '../Events/Notify';
import Notification from '../Notification';

class Popup {
  _validateForm() {
    const key         = document.getElementById('key').value.trim();
    const translation = document.getElementById('translation').value.trim();

    if (key.length > 0 && translation.length > 0) {
      this._enableImport();
    } else {
      this._disableImport();
    }
  }

  _changeProject() {
    const projects      = document.getElementById('projects');
    const selected      = projects.options[projects.selectedIndex];
    const projectLocale = document.getElementById('project_locale');

    if (typeof selected !== 'undefined') {
      Phraseapp.projectLocale(selected.value).then(locales => {
        locales.forEach(locale => {
          if (locale.code === config.locale) {
            this._enableImport();
            projectLocale.value = locale.id;
            projects.classList.remove('error');
          }
        });

        if (!locales.length) {
          this._disableImport();
          projects.classList.add('error');
          Notification.error('The selected project has no locales.');
        }
      }, response => {
        Notification.error(response);
      });
    }
  }

  _save() {
    const projects        = document.getElementById('projects');
    const copyToClipboard = Storage.get('phraseapp.clipboard');
    const data            = {
      project    : projects.options[projects.selectedIndex].value,
      key        : document.getElementById('key').value.trim(),
      translation: document.getElementById('translation').value.trim(),
      locale     : localStorage.getItem('phraseapp.default.locale')
    };

    let message = 'Successfully imported translation.';
    let project = projects.options[projects.selectedIndex].text;

    Phraseapp.importTranslation(data).then(() => {
      this._resetForm();

      if (copyToClipboard) {
        project = project.replace(new RegExp(' ', 'g'), '-').toLocaleLowerCase();

        const key = data.key.replace(new RegExp(' ', 'g'), '+').toLocaleLowerCase();
        const baseUrl = `https://phraseapp.com/projects/${project}/locales/${config.locale}/translations`;

        Notify.emit('clipboard.copyto', `${baseUrl}?translation_search%5Bquery%5D=${key}`);

        message = 'Successfully imported translation and copied to clipboard.';
      }

      Notification.success(message);
    }, response => {
      Notification.error(response);
    });
  }

  _showSettings() {
    Notify.emit('settings.show');
  }

  _hasToken() {
    return Boolean(Storage.get('phraseapp.token'));
  }

  _hasProjects() {
    return Boolean(Storage.get('phraseapp.projects'));
  }

  _updateProjectList(projects = []) {
    let selected;

    const options = [];
    const select  = document.getElementById('projects');
    const defaultProject = Storage.get('phraseapp.project');

    projects.forEach(project => {
      selected = defaultProject && defaultProject.id === project.id
                ? 'selected=\'selected\''
                : '';

      options.push(`<option ${selected} value=${project.id}>${project.name}</option>`);
    });

    select.innerHTML = options.join('');
  }

  _enableImport() {
    const importBtn = document.getElementById('import');

    importBtn.removeAttribute('disabled');
    importBtn.classList.add('button-primary');
  }

  _disableImport() {
    const importBtn = document.getElementById('import');

    importBtn.setAttribute('disabled', true);
    importBtn.classList.remove('button-primary');
  }

  _disableForm() {
    const elements = document.getElementById('import-form').elements;

    for (let i = elements.length - 1; i >= 0; i = i - 1) {
      elements[i].setAttribute('disabled', true);
      elements[i].classList.remove('button-primary');
    }
  }

  _resetForm() {
    document.getElementById('key').focus();
    document.getElementById('key').value         = '';
    document.getElementById('translation').value = '';

    this._disableImport();
  }

  _getSelection() {
    Notify.emit('selection.get');
  }

  _processSelection(selection = null) {
    if (selection || selection !== null) {
      document.getElementById('key').value = selection;
    }
  }

  _events() {
    document.getElementById('key').onkeyup = () => {
      this._validateForm();
    };
    document.getElementById('translation').onkeyup = () => {
      this._validateForm();
    };
    document.getElementById('import').onclick = () => {
      this._save();
    };
    document.getElementById('settings').onclick = () => {
      this._showSettings();
    };
    document.getElementById('projects').onchange = () => {
      this._changeProject();
    };

    Notify.on('selection.selected', this._processSelection);
  }

  init() {
    let locale;
    let projects;

    if (this._hasToken() === false || this._hasProjects() === false) {
      this._disableForm();
      this._showSettings();
    }

    if (null !== (locale = Storage.get('phraseapp.default.locale'))) {
      document.getElementById('project_locale').value = locale;
    }

    if (null !== (projects = Storage.get('phraseapp.projects'))) {
      this._updateProjectList(projects);
    }

    this._getSelection();

    this._events();
  }
}

export { Popup as default };
