# <%= readme.themeName %>

<%= readme.themeName %> is powered by [Sequence](http://sequencejs.com/) - The open-source CSS animation framework for creating responsive sliders, presentations, banners, and other step-based applications.

## Using Grunt.js to Develop a Theme

Sequence and the themes it powers use [Grunt](http://gruntjs.com/) to automate useful tasks. With Grunt installed (see Grunt's [Getting Started](http://gruntjs.com/getting-started)), use the following command to install this theme's development dependencies:

```
npm install
```

Once development dependencies have installed you can use the commands `grunt` and `grunt run`.

### `grunt`

This is the default command that will start a development environment with the following automated tasks:

- Starts a [livereload](http://livereload.com/) session that will reload your browser whenever a file is changed (be sure to install [livereload](http://livereload.com/))
- Opens your browser and navigates to `http://localhost:8000/`
- Sets up a *watch* task to run the following sub-tasks:
  - Update the version number of the following files when changed in `package.json`:
    - `scripts/sequence-theme.<%= readme.themeSlug %>.js`
    - `scss/sequence-theme.<%= readme.themeSlug %>.scss`
    - `css/sequence-theme.<%= readme.themeSlug %>.css`
    - `bower.json`
  - Process any `.scss` files found in the `scss` directory, autoprefix them and then copy to `css` and minify
  - Refresh the browser when any changes are made in HTML, JS, CSS, or SCSS files

You only need to run `grunt` per each development session as the *watch* task will continue to operate as you modify files.

### `grunt run`

The `grunt run` command is a manual version of the *watch* sub tasks listed for the `grunt` command.

## Sequence License

<%= readme.themeName %> is powered by [Sequence](http://sequencejs.com/), which is made available under the following open-source [MIT license](http://opensource.org/licenses/MIT):

> Copyright © 2014 Ian Lunn

> Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the “Software”), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions: The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

> THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

Sequence themes are made available under their own licenses. Please respect them accordingly.

## Release History
*Nothing yet*
