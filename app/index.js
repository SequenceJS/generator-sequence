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
      this.spawnCommand('grunt', ['run']);
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
        if(answers.themeOpen === "Yes") {
          return true;
        }
      }
    },

    {
      name: 'themeUrl',
      message: 'Theme URL:',
      when: function(answers) {
        if(answers.themeOpen === "Yes") {
          return true;
        }
      }
    },

    {
      name: 'themeAuthorName',
      message: 'Author Name:',
      when: function(answers) {
        if(answers.themeOpen === "Yes") {
          return true;
        }
      }
    },

    {
      name: 'themeAuthorEmail',
      message: 'Author Email:',
      when: function(answers) {
        if(answers.themeOpen === "Yes") {
          return true;
        }
      }
    },

    {
      name: 'themeAuthorUrl',
      message: 'Author Website:',
      when: function(answers) {
        if(answers.themeOpen === "Yes") {
          return true;
        }
      }
    },

    {
      name: 'themeAuthorTwitter',
      message: 'Twitter Username:',
      when: function(answers) {
        if(answers.themeOpen === "Yes") {
          return true;
        }
      }
    },

    {
      name: 'themeAuthorGitHub',
      message: 'Github Username:',
      when: function(answers) {
        if(answers.themeOpen === "Yes") {
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
        if(answers.themeOpen === "Yes") {
          return true;
        }
      }
    },

    {
      name: 'themeLicenseUrl',
      message: 'License URL:',
      when: function(answers) {
        if(answers.themeOpen === "Yes" && answers.themeLicense === "Other") {
          return true;
        }
      }
    }
    ];

    this.prompt(prompts, function (props) {
      this.props = props;
      this.themeName = props.themeName;
      this.themeSlug = this.themeName.toLowerCase().replace(/[^\w ]+/g,'').replace(/ +/g,'-');
      this.themeOpen = props.themeOpen;
      this.themePrivate = (props.themeOpen === "Yes") ? false: true;
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
      this.readme = {};

      var themeLayout = props.themeLayout;

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

    var readme = {};

    readme.themeName = this.themeName;
    readme.themeDescription = "> Description of theme";
    readme.themeSlug = this.themeSlug;
    readme.themeUrl = "";
    readme.authorName = "";
    readme.authorDetails = "";
    readme.authorEmail = "";
    readme.licenseDetails = "";

    if (this.themeOpen === "Yes") {

      if (this.themeDescription !== "") {
        readme.themeDescription = "> " + this.themeDescription;
      }

      if (this.themeUrl !== "") {
        readme.themeUrl = "Theme URL: [" + this.themeUrl + "](" + this.themeUrl + ")";
      }

      if (this.themeAuthorName !== "" || this.themeAuthorUrl !== "" || this.themeAuthorGitHub !== "" || this.themeAuthorTwitter !== "" || this.themeAuthorEmail !== "") {
        readme.authorDetails += "## Author" + "\n\n";
      }

      if (this.themeAuthorName !== "") {

        if (this.themeAuthorUrl !== "") {
          readme.authorDetails += "Name: [" + this.themeAuthorName + "](" + this.themeAuthorUrl + ")  ";
        } else {
          readme.authorDetails += "Name: " + this.themeAuthorName + "  ";
        }
      } else if (this.themeAuthorUrl !== "") {
          readme.authorDetails += "Website: [" + this.themeAuthorUrl + "](" + this.themeAuthorUrl + ")  ";
      }

      if (this.themeAuthorGitHub !== "") {
        readme.authorGitHub = "Github: [@" + this.themeAuthorGitHub.replace("@", "") + "](https://github.com/" + this.themeAuthorGitHub.replace("@", "") + ")  ";
      }

      if(this.themeAuthorTwitter !== "") {
        readme.authorTwitter = "Twitter: [@" + this.themeAuthorTwitter.replace("@", "") + "](https://twitter.com/" + this.themeAuthorTwitter.replace("@", "") + ")  ";
      }

      if (this.themeAuthorEmail !== "") {
        readme.authorEmail = "Email: [" + this.themeAuthorEmail + "](mailto://" + this.themeAuthorEmail + ")  ";
      }

      if (this.themeLicense !== "") {

        if (this.themeOpen === "Yes" && this.themeLicense !== "None") {

          var themeLicenseUrl;

          readme.licenseDetails = "## " + this.themeName + " License\n\n";

          if (this.themeLicense !== "Other") {
            themeLicenseUrl = getLicenseUrl(this.themeLicense);
          } else {
            themeLicenseUrl = this.props.themeLicenseUrl;
          }

          if (this.themeLicense === "Other" && this.themeLicenseUrl !== "") {
            readme.licenseDetails += "License information [here](" + this.themeLicenseUrl + ").";
          } else if(this.themeLicense === "Other") {
            readme.licenseDetails += "License information here.";
          } else {
            readme.licenseDetails += this.themeName + " is made available under a [" + this.themeLicense + " license](" + themeLicenseUrl + ").";
          }
        }

        var d = new Date();
        var year = d.getFullYear();

        readme.year = "Copyright © " + year;

        if (this.themeAuthorName !== "" && this.themeAuthorUrl !== "") {
          readme.copyrightHolder = " [" + this.themeAuthorName + "](" + this.themeAuthorUrl + ")";
        } else if (this.themeAuthorName !== "") {
          readme.copyrightHolder = " " + this.themeAuthorName;
        }
      }
    }





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
      this.optionFile.desc += this.themeDescription + '\n * \n * ' + 'Powered by Sequence.js - The open-source CSS animation framework for creating responsive sliders, presentations, banners, and other step-based applications.';
    }else{
      this.optionFile.desc += 'Powered by Sequence.js - The open-source CSS animation framework for creating responsive sliders, presentations, banners, and other step-based applications.';
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

    // Setup base theme
    this.createBaseTheme();

    // Create the README
    this.readme = this.createReadMe();

    // Copy the package and bower files
    this.template('_package.json', 'package.json');
    this.template('_bower.json', 'bower.json');
    this.copy('gitignore', '.gitignore');

    if (this.themePrivate === false) {
      this.template('_README-public.md', 'README.md');
    } else {
      this.template('_README-private.md', 'README.md');
    }

    // Copy the Gruntfile
    this.template('_Gruntfile.js', 'Gruntfile.js');
  }
});

module.exports = SequenceGenerator;
