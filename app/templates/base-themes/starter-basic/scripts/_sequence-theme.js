/**
 * Theme Name: <%= properties.themeName %>
 * Version: 0.0.0
 * Theme URL: <%= properties.themeLinkFull %>
 *
 * <%= properties.themeDescriptionFull %>
 *
 * This theme is powered by Sequence.js - The
 * responsive CSS animation framework for creating unique sliders,
 * presentations, banners, and other step-based applications.
 *
 * Author: <%= properties.authorNameFull %>
 * Author URL: <%= properties.authorLinkFull %>
 *
 * Theme License: <%= properties.themeLicenseDescription %>
 * Sequence.js Licenses: http://sequencejs.com/licenses/
 *
 * Copyright © <%= properties.year %> [<%= properties.authorNameFull %>](<%= properties.authorLinkFull %>) unless otherwise stated.
 */

// Get the Sequence element
var sequenceElement = document.getElementById("sequence");

// Place your Sequence options here to override defaults
// See: http://sequencejs.com/documentation/#options
var options = {
  
}

// Launch Sequence on the element, and with the options we specified above
var mySequence = sequence(sequenceElement, options);
