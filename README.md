# Phraseapp Importer Chrome Extension

Maintainer: [Megan Davidson](https://github.com/meganabigaildavidson)

> Phraseapp Chrome Extension allows you to add new keys with translations to your Phraseapp project, within the browser. You can also select text that you wish to be the key and this will automatically get copied into the 'key' field.
## Plugin configuration

You need to obtain a Phraseapp API token from your [Phraseapp account page.](https://phraseapp.com/settings/oauth_access_tokens), copy this into the `Extension settings` page and then update your project list.

Selecting one of the projects in the settings page will mark that project as the default project to use for each import (this can be changed from the import popup, but this does not save any changes, this can only be done from the settings page.)

You also have the choice to set what domains the extension will activate on (this requires a reload of the extension from the settings page); this defaults to `basekit.dev` by default. Leaving this blank allows the plugin to be active on every page you visit.

## Development getting started

```sh
# Please make sure that `gulp` and `bower` is installed on your system using this command:
npm install --global gulp bower

# Install npm modules
npm install

# Install bower components
bower install

# Makes a fully built version of the app, this lints, and run any unit tests on the code:
gulp --gulpfile gulpfile.babel.js build
```

## Testing the extension in developer mode.

To test, go to: chrome://extensions, enable Developer mode and load the importer as an unpacked extension,
point the directory chooser at the 'dist' folder after running the build or watch commands.

Please visit [Google Chrome Extension Development](http://developer.chrome.com/extensions/devguide.html) for more details.

## gulp tasks

### Babel

ES6 syntax is used through babel transforming. The source files are situated in `script.babel`. If the watch command is running then any changes will automatically get linted, compiled and copied to the `dist` directory.

```sh
gulp --gulpfile gulpfile.babel.js babel
```

### Watch

Watch looks for any changes to the files in the `app` folder and performs tasks on them beofre copying to the `dist` folder.
```bash
gulp --gulpfile gulpfile.babel.js watch
```

### Build and Package

This will allow you to build and package the app (.crx) for upload to the Chrome extension store.

```bash
gulp --gulpfile gulpfile.babel.js build
```

This will create a packaged zip file of the extension.

```bash
gulp --gulpfile gulpfile.babel.js package
```

## License

[BSD license](http://opensource.org/licenses/bsd-license.php)
