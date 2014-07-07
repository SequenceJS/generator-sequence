# <%= readme.themeName %>

<%= readme.themeDescription %>

<%= readme.themeName %> is powered by [Sequence](http://sequencejs.com/) - The open-source CSS animation framework for creating responsive sliders, presentations, banners, and other step-based applications.
<%= readme.themeUrl %><%= readme.authorDetails %><%= readme.authorGitHub %><%= readme.authorTwitter %><%= readme.authorEmail %>
## Getting Started

To add a Sequence theme to a website, do the following:

1. Move the `<%= readme.themeSlug %>` directory to the same directory as the page you'd like the Sequence theme to appear on.
2. Add the stylesheet within the `<head></head>` tags on your page below existing stylesheets, using the following:
```html
<link rel="stylesheet" href="<%= readme.themeSlug %>/css/sequence-theme.<%= readme.themeSlug %>.css" />
```
3. From `<%= readme.themeSlug %>/index.html` copy everything inside the `<body></body>` tags, then paste into the page you'd like the theme to appear on.
4. Add a reference to the Sequence library, its third-party dependencies, and the theme options just before the closing `</body>` element on your page:
```html
<script src="<%= readme.themeSlug %>/scripts/imagesloaded.pkgd.min.js"></script>
<script src="<%= readme.themeSlug %>/scripts/hammer.min.js"></script>
<script src="<%= readme.themeSlug %>/scripts/sequence.min.js"></script>
<script src="<%= readme.themeSlug %>/scripts/sequence-theme.<%= readme.themeSlug %>.js"></script>
```
5. **Optional**: If the theme includes a reference to `respond.min.js` in `<%= readme.themeSlug %>/index.html` and you require responsive CSS support for Internet Explorer 7 & 8, copy and paste the following between your pages `<head></head>` tags:
```html
<!--[if lt IE 9]>
    <script src="<%= readme.themeSlug %>/scripts/respond.min.js"></script>
  <![endif]-->
```
6. Save your file and view in the browser. You're done!

A theme's options can be changed in `scripts/sequence-theme.<%= readme.themeSlug %>.js`. See Options in the [documentation](http://www.sequencejs.com/developers/documentation/).

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

<%= readme.licenseDetails %><%= readme.year %> <%= readme.copyrightHolder %>

## Sequence License

<%= readme.themeName %> is powered by [Sequence](http://sequencejs.com/), which is made available under the following open-source [MIT license](http://opensource.org/licenses/MIT):

> Copyright © 2014 Ian Lunn

> Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the “Software”), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions: The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

> THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

Sequence themes are made available under their own licenses. Please respect them accordingly.

## Release History
*Nothing yet*
