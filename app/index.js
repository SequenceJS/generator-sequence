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

    case "GPL-3.0":
      return "http://opensource.org/licenses/gpl-3.0";
    break;

    case "MIT":
      return "http://opensource.org/licenses/MIT";
    break;

    default:
      return "";
  }
};

function cleanName(name) {

  name = name.replace(/[_-]/g, ' ');
  name = name.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
  return name;
};

// Replace hypens/underscores with spaces and capitalize so the
// following examples:
// modern-slide-in
// modern_slide_in
// Become:
// Modern Slide In
function slugName(name) {

  name = name.toLowerCase().replace(/[ ]/g, '-');

  return name;
};

function getYear() {

  var d = new Date(),
      year = d.getFullYear();

  return year;
};

function getDate() {

  var d = new Date(),
      dd = d.getDate(),
      mm = d.getMonth()+1, //January is 0!
      yyyy = d.getFullYear();

  if (dd<10) {
    dd='0'+dd
  }

  if (mm<10) {
    mm='0'+mm
  }

  return mm + '/' + dd + '/' + yyyy;
};

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
      this.spawnCommand('grunt', ['default']);
    });
  },

  askFor: function () {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay('Welcome to the Sequence.js theme generator. We\'ll have you creating a Sequence.js theme in no time!'));

    var prompts = [
    {
      name: 'themeName',
      message: 'What would you like to call your Sequence.js theme?',
      default: function() {
        var themeName = process.cwd().split(path.sep).pop();
        themeName = cleanName(themeName);

        return themeName;
      }
    },

    {
      name: 'themeDescription',
      message: 'Briefly describe your theme:'
    },

    {
      name: 'themeUrl',
      message: 'Theme URL:'
    },

    {
      name: 'themeAuthorName',
      message: 'Author Name:'
    },

    {
      name: 'themeAuthorUrl',
      message: 'Author URL:'
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
      name: 'themeLicense',
      message: 'License:',
      choices: ["GPL-3.0", "MIT", "Apache 2.0", "Other", "None"],
      default: 'GPL-3.0',
      when: function(answers) {
        if (answers.themeOpen === "Yes") {
          return true;
        }
      }
    }
    ];

    this.prompt(prompts, function (props) {

      var year = getYear(),
          date = getDate();

      this.properties = {};
      var properties = this.properties;

      // Defaults
      properties.themeName = props.themeName;
      properties.themeSlug = slugName(properties.themeName);
      properties.themePrivate = (props.themeOpen === "Yes") ? false: true;
      properties.themeDescription = "";
      properties.themeDescriptionFull = "<Description of theme>";
      properties.themeLicenseDescription = "";
      properties.themeLicense = "";
      properties.themeLink = "";
      properties.themeLinkFull = "<Theme Link>";
      properties.authorName = "";
      properties.authorNameFull = "<Author Name>";
      properties.authorLink = "";
      properties.authorLinkFull = "<Author Link>";
      properties.year = year;
      properties.date = date;
      properties.themeLayoutSlug = 'starter-basic';


      if (props.themeDescription !== "") {
        properties.themeDescription = props.themeDescription;
        properties.themeDescriptionFull = props.themeDescription;
      }

      if (props.themeUrl !== "") {
        properties.themeLink = props.themeUrl;
        properties.themeLinkFull = props.themeUrl;
      }

      if (props.themeAuthorName !== "") {
        properties.authorName = props.themeAuthorName;
        properties.authorNameFull = props.themeAuthorName;
      }

      if (props.themeAuthorUrl !== "") {
        properties.authorLink = props.themeAuthorUrl;
        properties.authorLinkFull = props.themeAuthorUrl;
      }

      if (props.themeLicense !== "" && props.themeLicense !== undefined) {
        properties.themeLicense = props.themeLicense;
      }


      switch(props.themeLicense) {
        case undefined:
          properties.themeLicenseDescription = "This theme is for private use only.";
          break

        case "None":
          properties.themeLicenseDescription = "This theme has no license.";
          properties.themeLicense = "";
          break;

        case "Other":
          properties.themeLicenseDescription = "This theme is made available under a [<License>](<License URL>).";
          properties.themeLicense = "";
          break;

        default:
          var licenseUrl = getLicenseUrl(props.themeLicense);
          properties.themeLicenseDescription = "This theme is made available under a [" + props.themeLicense + " license](" + licenseUrl + ").";
      }

      done();
    }.bind(this));
  },

  app: function () {

    // Make necessary directories
    this.mkdir('css');
    this.mkdir('images');
    this.mkdir('css');
    this.mkdir('scss');
    this.mkdir('scss/partials');
    this.mkdir('scripts');

    this.template('base-themes/' + this.properties.themeLayoutSlug + '/_index.html', 'index.html');
    this.copy('base-themes/' + this.properties.themeLayoutSlug + '/scss/partials/mixins.scss', 'scss/partials/mixins.scss');
    this.template('base-themes/' + this.properties.themeLayoutSlug + '/scss/_sequence-theme.scss', 'scss/sequence-theme.' + this.properties.themeSlug + '.scss');
    this.template('base-themes/' + this.properties.themeLayoutSlug + '/scripts/_sequence-theme.js', 'scripts/sequence-theme.' + this.properties.themeSlug + '.js');

    // Copy the package and bower files
    this.template('_package.json', 'package.json');
    this.template('_bower.json', 'bower.json');
    this.copy('gitignore', '.gitignore');
    this.template('_README.md', 'README.md');
    this.template('_CHANGELOG.md', 'CHANGELOG.md');
    this.template('_LICENSE.md', 'LICENSE.md');

    // Copy the Gruntfile
    this.template('_Gruntfile.js', 'Gruntfile.js');
  }
});

module.exports = SequenceGenerator;
