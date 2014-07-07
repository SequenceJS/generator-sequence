# <%= readme.themeName %>

<%= readme.themeDescription %>

<%= themeName %> is powered by [Sequence](http://sequencejs.com/) - The open-source CSS animation framework for creating responsive sliders, presentations, banners, and other step-based applications.";

<%= readme.authorDetails %>
<%= readme.authorGithub %>
<%= readme.authorTwitter %>
<%= readme.authorEmail %>  


if(themeLicense !== "") {

  if(themeOpen === true && themeLicense !== "None") {

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

if(themeOpen === true) {
  readme += "## How to Use";
  readme += "\n\n";

  readme += "1. From the `" + themeSlud + "` folder, copy `css`, `images`, `scripts`, and `scss` Move the `" + themeSlug + "` directory to the same directory as the page you'd like the theme to appear on."
  readme += "\n";
  readme += "2. Add the stylesheet within the `<head></head>` tags on your page below existing stylesheets, using the following:";
  readme += "\n";
  readme += '`<link rel="stylesheet" href="' + themeSlug + '/css/sequence-theme.' + themeSlug + '.css" />`';
  readme += "\n";
  readme += "3. From index.html in the downloaded theme, copy everything inside the <body></body> tags, then paste into the page you'd like the theme to appear on.";
  readme += "\n";
  readme += "4. Add a reference to the Sequence library, its third-party dependencies, and the theme options just before the closing `</body>` element on your page:";
  readme += "\n";
  readme += "```";
  readme += "\n";
  readme += '<script src="scripts/imagesloaded.pkgd.min.js"></script>';
  readme += "\n";
  readme += '<script src="scripts/hammer.min.js"></script>';
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

if(themeOpen === true && (themeSupportEmail !== "" || themeSupportUrl !== "")) {
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

readme += "## Sequence License"
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
