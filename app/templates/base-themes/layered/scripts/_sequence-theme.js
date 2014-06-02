/*!
 * Theme Name: <%= themeName %>
 * Version: 0.1.0
 * Theme URL: <%= themeUrl %>
 *
 * <%= optionFile.desc %>
 *
 * Author: <%= optionFile.author %>
 * Author URL: <%= optionFile.authorUrl %>
 *
 * <%= themeName %> Sequence Theme <%= optionFile.copyright %>
 * License: <%= themeLicense %> <%= optionFile.themeLicenseUrl %>
 *
 * Sequence.js and its dependencies are copyright (c) Ian Lunn 2014 unless otherwise stated.
 */

// Get the Sequence element
var sequenceElement = document.getElementById("sequence");

// Place your Sequence options here to override defaults
// See: https://github.com/IanLunn/Sequence/blob/v2/DOCUMENTATION.md
var options = {
  animateCanvas: false,
  phaseThreshold: 500
}

// Launch Sequence on the element, and with the options we specified above
var mySequence = sequence(sequenceElement, options);
