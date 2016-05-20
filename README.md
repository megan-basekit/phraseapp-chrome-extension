# Phraseapp Importer Chrome Extension

Maintainer: [Megan Davidson](https://github.com/meganabigaildavidson)

> Phraseapp Chrome Extension allows you to add new keys with translations to your Phraseapp project, within the browser. You can also select text that you wish to be the key and this will automatically get copied into the 'key' field.
## Development getting started

```sh
# Please make sure that `gulp` and `bower` was installed on your system using this command:
npm install --global gulp bower

# or Using watch to update source continuously:
gulp watch

# Check your code using ESLint against the base of AirBnB rules:
gulp lint

# Makes a fully built version of the app, this lints, and run any unit tests on the code:
gulp build
```

## Testing the extension in developer mode.

To test, go to: chrome://extensions, enable Developer mode and load the importer as an unpacked extension,
point the directory chooser at the 'dist' folder after running the build or watch commands.

Please visit [Google Chrome Extension Development](http://developer.chrome.com/extensions/devguide.html) for more details.

## gulp tasks

### Babel

The generator supports ES 2015 syntax through babel transforming. The source files are situated in `script.babel`. If thew watch command is running then any changes will automatically get linted, compiled and copied to the `dist` directory.

```sh
gulp babel
```

### Watch

Watch looks for any changes to the files in the `app` folder and performs tasks on them beofre copying to the `dist` folder.
```bash
gulp watch
```

### Build and Package

This will allow you to build and package the app (.crx) for upload to the Chrome extension store.

```bash
gulp build
```

You can also distribute the importer as a `(.crx)` file, that can be uploaded to Chrome Developer Dashboard at Chrome Web Store.

```bash
gulp package
```

## License

[BSD license](http://opensource.org/licenses/bsd-license.php)
