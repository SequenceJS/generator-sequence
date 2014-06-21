'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var yosay = require('yosay');
var chalk = require('chalk');

function getLicenseUrl(license) {

  switch(license) {

    case "Apache 2.0":
      return "http://opensource.org/licenses/Apache-2.0";
    break;

    case "GNU (GPL)":
      return "http://opensource.org/licenses/gpl-license";
    break;

    case "GNU (LGPL)":
      return "http://opensource.org/licenses/lgpl-license";
    break;

    case "MIT":
      return "http://opensource.org/licenses/MIT";
    break;

  }
}

var SequenceGenerator = yeoman.generators.Base.extend({

  init: function () {
    this.pkg = require('../package.json');

    this.on('end', function () {
      this.installDependencies({
        skipInstall: this.options['skip-install'],
        callback: function() {
          // Emit a new event - dependencies installed
          this.emit('dependenciesInstalled');
        }.bind(this)
      });
    });

    this.on('dependenciesInstalled', function() {
      this.spawnCommand('grunt', ['build']);
    });
  },

  askFor: function () {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay('Welcome to the Sequence theme generator. We\'ll have you creating a Sequence theme in no time!'));

    var prompts = [
    {
      name: 'themeName',
      message: 'What do you want to call your Sequence theme?',
      default: function() {
        var themeName = process.cwd().split(path.sep).pop();

        themeName = themeName.replace("-", " ");
        themeName =  themeName.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});

        return themeName;
      }
    },

    {
      type: 'list',
      name: 'themeOpen',
      message: 'Is your theme available for others to use?',
      choices: ['Yes', 'No, it\'s private'],
      default: 'Yes'
    },

    {
      type: 'list',
      name: 'themeLayout',
      message: 'What base theme would you like to begin with?',
      choices: ['Basic', 'Layered (Absolute)', 'None'],
      default: 'Basic'
    },

    {
      name: 'themeDescription',
      message: 'Briefly describe your theme:',
      when: function(answers) {
        if(answers.themeOpen === 'Yes') {
          return true;
        }
      }
    },

    {
      name: 'themeUrl',
      message: 'Theme URL:',
      when: function(answers) {
        if(answers.themeOpen === 'Yes') {
          return true;
        }
      }
    },

    {
      name: 'themeAuthorName',
      message: 'Author Name:'
    },

    {
      name: 'themeAuthorEmail',
      message: 'Author Email:'
    },

    {
      name: 'themeAuthorUrl',
      message: 'Author Website:'
    },

    {
      name: 'themeAuthorTwitter',
      message: 'Twitter Username:',
      when: function(answers) {
        if(answers.themeOpen === 'Yes') {
          return true;
        }
      }
    },

    {
      name: 'themeAuthorGitHub',
      message: 'Github Username:',
      default: function(answers) {
        if(answers.themeAuthorTwitter !== undefined) {
          return answers.themeAuthorTwitter.replace("@", "");
        }
      },
      when: function(answers) {
        if(answers.themeOpen === 'Yes') {
          return true;
        }
      }
    },

    {
      type: 'list',
      name: 'themeLicense',
      message: 'License:',
      choices: ["Apache 2.0", "GNU (GPL)", "GNU (LGPL)", "MIT", "Other", "None"],
      default: 'MIT',
      when: function(answers) {
        if(answers.themeOpen === 'Yes') {
          return true;
        }
      }
    },

    {
      name: 'themeLicenseUrl',
      message: 'License URL:',
      when: function(answers) {
        if(answers.themeOpen === 'Yes' && answers.themeLicense === "Other") {
          return true;
        }
      }
    },

    {
      name: 'themeSupportEmail',
      message: 'Support Email:',
      default: function(answers) {
        return answers.themeAuthorEmail;
      },
      when: function(answers) {
        if(answers.themeOpen === 'Yes') {
          return true;
        }
      }
    },

    {
      name: 'themeSupportUrl',
      message: 'Support Website:',
      default: function(answers) {
        return answers.themeAuthorUrl;
      },
      when: function(answers) {
        if(answers.themeOpen === 'Yes') {
          return true;
        }
      }
    },

    ];

    this.prompt(prompts, function (props) {
      this.props = props;
      this.themeName = props.themeName;
      this.themeSlug = this.themeName.toLowerCase().replace(/[^\w ]+/g,'').replace(/ +/g,'-');
      this.themeOpen = props.themeOpen;
      this.themeLayout = props.themeLayout;
      this.themeUrl = props.themeUrl;
      this.themeDescription = props.themeDescription;
      this.themeAuthorName = props.themeAuthorName;
      this.themeAuthorEmail = props.themeAuthorEmail;
      this.themeAuthorUrl = props.themeAuthorUrl;
      this.themeAuthorTwitter = props.themeAuthorTwitter;
      this.themeAuthorGitHub = props.themeAuthorGitHub;
      this.themeLicense = props.themeLicense;
      this.themeLicenseUrl = props.themeLicenseUrl;
      this.themeSupportEmail = props.themeSupportEmail;
      this.themeSupportUrl = props.themeSupportUrl;

      var themeLayout = this.themeLayout;

      if(themeLayout === 'Layered (Absolute)') {
        themeLayout = 'Layered';
      }

      if(themeLayout === 'None') {
        themeLayout = 'minimal';
      }

      this.themeLayoutSlug = themeLayout.toLowerCase().replace(/[^\w ]+/g,'').replace(/ +/g,'-');

      done();
    }.bind(this));
  },

  createReadMe: function() {

    var readme = '',
        themeName = this.themeName,
        themeSlug = this.themeSlug,

        themeOpen = this.themeOpen,

        description = this.themeDescription,

        authorName = this.themeAuthorName,
        authorEmail = this.themeAuthorEmail,
        authorUrl = this.themeAuthorUrl,

        authorGitHub = '',
        authorTwitter = '',

        themeLicense = this.themeLicense,

        themeSupportEmail = this.themeSupportEmail,
        themeSupportUrl = this.themeSupportUrl;


    if(this.themeAuthorGitHub !== undefined) {
      authorGitHub = this.themeAuthorGitHub.replace("@", "");
    }

    if(this.themeAuthorTwitter !== undefined) {
      authorTwitter = this.themeAuthorTwitter.replace("@", "");
    }

    readme += "# " + themeName;
    readme += "\n\n";

    if(description !== "" && themeOpen === "Yes") {
      readme += "> " + description;
      readme += "\n\n";
    }

    readme += themeName + " is powered by [Sequence.js](http://sequencejs.com/) - The open-source CSS animation framework.";
    readme += "\n\n";

    if(authorName !== "") {

      if(authorUrl !== "") {
        readme += "Author: [" + authorName + "](" + authorUrl + ")  ";
      }else{
        readme += "Author: " + authorName + "  ";
      }

      readme += "\n";
    }

    if(authorEmail !== "") {
      readme += "Email: [" + authorEmail + "](mailto://" + authorEmail + ")  ";
      readme += "\n";
    }

    if(authorGitHub !== "") {
      readme += "GitHub: [@" + authorGitHub + "](https://github.com/" + authorGitHub + ")  ";
      readme += "\n";
    }

    if(authorTwitter !== "") {
      readme += "Twitter: [@" + authorTwitter + "](https://twitter.com/" + authorTwitter + ")  ";
      readme += "\n";
    }
    if(authorName !== "" || authorEmail !== "" || authorGitHub !== "" || authorTwitter !== "") {
      readme += "\n";
    }

    if(themeLicense !== "") {

      if(themeOpen === "Yes" && themeLicense !== "None") {

        var themeLicenseUrl;

        if(themeLicense !== "Other") {
          themeLicenseUrl = getLicenseUrl(themeLicense);
        }else{
          themeLicenseUrl = this.props.themeLicenseUrl;
        }

        if(themeLicense === "Other" && themeLicenseUrl !== "") {
          readme += "License: [" + themeLicense + "](" + themeLicenseUrl + ")";
        }else if(themeLicense === "Other") {
          readme += "License: " + themeLicense;
        }else{
          readme += "License: [" + themeLicense + "](" + themeLicenseUrl + ")";
        }

        readme += "\n\n";
      }

      var d = new Date();
      var year = d.getFullYear();
      readme += "Copyright (c) " + year;

      if(authorName !== ""){
        readme += " " + authorName;
      };
      readme += "\n\n";
    }

    if(themeOpen === "Yes") {
      readme += "## Getting Started";
      readme += "\n\n";

      readme += "1. Move the `" + themeSlug + "` directory to the same directory as the page you'd like the theme to appear on."
      readme += "\n";
      readme += "2. Add the stylesheet within the `<head></head>` tags on your page below existing stylesheets, using the following:";
      readme += "\n";
      readme += '`<link rel="stylesheet" href="' + themeSlug + '/css/sequence-theme.' + themeSlug + '.css" />`';
      readme += "\n";
      readme += "3. From index.html in the downloaded theme, copy everything inside the <body></body> tags, then paste into the page you'd like the theme to appear on.";
      readme += "\n";
      readme += "4. Add a reference to the Sequence library, its third-party dependencies, and the theme options just before the closing `</body>` element on your page:";
      readme += "\n";
      readme += "```javascript";
      readme += "\n";
      readme += '<script src="scripts/third-party/imagesloaded.pkgd.min.js"></script>';
      readme += "\n";
      readme += '<script src="scripts/third-party/hammer.min.js"></script>';
      readme += "\n";
      readme += '<script src="scripts/sequence.min.js"></script>';
      readme += "\n";
      readme += '<script src="scripts/sequence-theme.' + themeSlug + '.js"></script>';
      readme += "\n";
      readme += "```";
      readme += "\n";
      readme += "5. From index.html in the downloaded theme, copy everything inside the <body></body> tags, then paste into the page you'd like the theme to appear on.";
      readme += "\n";
      readme += "6. Save your file and upload newly added/modified files to your web server. You're done!";
      readme += "\n\n";
      readme += "A theme's options can be changed in `scripts/sequence-theme." + themeSlug + ".js`. See Options in the [documentation](http://www.sequencejs.com/developers/documentation/).";
      readme += "\n\n";
    }

    if(themeOpen === "Yes" && (themeSupportEmail !== "" || themeSupportUrl !== "")) {
      readme += "## Support";
      readme += "\n\n";

      readme += "For theme support, please use the following contact details:"
      readme += "\n\n";

      if(themeSupportEmail !== "") {
        readme += "Email: [" + themeSupportEmail + "](mailto://" + themeSupportEmail + ")  ";
        readme += "\n";
      }

      if(themeSupportUrl !== "") {
        readme += "Website: [" + themeSupportUrl + "](" + themeSupportUrl + ")";
        readme += "\n";
      }

      readme += "\n";
    }

    readme += "## Sequence.js License"
    readme += "\n\n";

    readme += "The [Sequence.js](http://sequencejs.com/) library is made available under the following open-source [MIT license](http://opensource.org/licenses/MIT):";
    readme += "\n\n";

    readme += "> Copyright (c) 2014 Ian Lunn Design Limited";
    readme += "\n\n";

    readme += "> Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the “Software”), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions: The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.";
    readme += "\n\n";

    readme += "> THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.";
    readme += "\n\n";

    readme += "Sequence themes are made available under their own licenses. Please respect them accordingly.";
    readme += "\n\n";

    readme += "## Release History";
    readme += "\n";
    readme += "*Nothing yet*";

    return readme;
  },

  createOptionsFile: function() {

    var d = new Date();
    var year = d.getFullYear();

    this.optionFile = {};
    this.optionFile.desc = '';
    this.optionFile.projectUrl = '';
    this.optionFile.author = '';
    this.optionFile.authorUrl = '';
    this.optionFile.copyright = 'Copyright (c) ';

    if(this.themeDescription !== undefined && this.themeDescription !== '') {
      this.optionFile.desc += this.themeDescription + '\n * \n * ' + 'Powered by Sequence.js - The open-source CSS animation framework.';
    }else{
      this.optionFile.desc += 'Powered by Sequence.js - The open-source CSS animation framework.';
    }

    if(this.themeAuthorName !== '') {
      this.optionFile.author += this.themeAuthorName;
      this.optionFile.copyright += this.themeAuthorName + ' ';
    }

    if(this.themeAuthorUrl !== '') {
      this.optionFile.authorUrl += this.themeAuthorUrl;
    }

    this.optionFile.copyright += year;

    this.optionFile.themeLicenseUrl = getLicenseUrl(this.themeLicense);

    this.template('base-themes/' + this.themeLayoutSlug + '/scripts/_sequence-theme.js', 'scripts/sequence-theme.' + this.themeSlug + '.js');
  },

  /**
   * Copy files from a base theme
   */
  createBaseTheme: function() {

    // Create options file
    this.createOptionsFile();

    this.template('base-themes/' + this.themeLayoutSlug + '/_index.html', 'index.html');
    this.copy('base-themes/' + this.themeLayoutSlug + '/scss/partials/mixins.scss', 'scss/partials/mixins.scss');
    this.template('base-themes/' + this.themeLayoutSlug + '/scss/_sequence-theme.scss', 'scss/sequence-theme.' + this.themeSlug + '.scss');

  },

  app: function () {

    // Make necessary directories
    this.mkdir('css');
    this.mkdir('images');
    this.mkdir('css');
    this.mkdir('scss');
    this.mkdir('scss/partials');
    this.mkdir('scripts');

    // Create the README
    this.write('README.md', this.createReadMe());

    // Setup base theme
    this.createBaseTheme();

    // Copy the package and bower files
    this.template('_package.json', 'package.json');
    this.template('_bower.json', 'bower.json');
    this.copy('gitignore', '.gitignore');
    this.copy('editorconfig', '.editorconfig');
    this.copy('jshintrc', '.jshintrc');

    // Copy the Gruntfile
    this.template('_Gruntfile.js', 'Gruntfile.js');
  }
});

module.exports = SequenceGenerator;
