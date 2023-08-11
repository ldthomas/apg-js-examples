/* eslint-disable new-cap */
/*  *************************************************************************************
 *   copyright: Copyright (c) 2021 Lowell D. Thomas, all rights reserved
 *     license: BSD-2-Clause (https://opensource.org/licenses/BSD-2-Clause)
 *   ********************************************************************************* */
// This is the general set up for the back reference examples.
module.exports = function setup(input, grammar, name, doTrace) {
  const nodeUtil = require('node:util');
  const inspectOptions = {
    showHidden: true,
    depth: null,
  };
  // Quick and dirty conversion of ASCII characters to HTML format.
  // Needed for HTML display of grammars that contain HTML entity characters.
  const charsToHtml = function charsToHtml(chars) {
    let html = '';
    chars.forEach((char) => {
      switch (char) {
        case 32:
          html += '&nbsp;';
          break;
        case 38:
          html += '&#38;';
          break;
        case 39:
          html += '&#39;';
          break;
        case 60:
          html += '&#60;';
          break;
        case 62:
          html += '&#62;';
          break;
        case 92:
          html += '&#92;';
          break;
        default:
          html += String.fromCharCode(char);
      }
    });
    return html;
  };
  try {
    let chars;
    let html = '';
    const { apgLib } = require('apg-js');
    const writeHtml = require('../writeHtml');
    const parser = new apgLib.parser();
    if (doTrace === true) {
      parser.trace = new apgLib.trace();
      parser.trace.filter.operators['<ALL>'] = true;
    }

    /* display the grammar */
    console.log('The grammar:');
    console.log(grammar.toString());

    /* display the input string */
    console.log('The input string:');
    console.log(input);

    /* parse the input string */
    const result = parser.parse(grammar, 0, input);

    /* output to console */
    console.log();
    console.log(`result for ${name}`);
    console.dir(result, inspectOptions);

    /* display input, results and trace on HMTL page */
    html += '<h3>Grammar Source</h3>';
    html += '<pre>';
    chars = apgLib.utils.stringToChars(grammar.toString());
    html += charsToHtml(chars);
    html += '</pre>';
    html += '<h3>Input String</h3>';
    html += '<pre>';
    chars = apgLib.utils.stringToChars(input);
    html += apgLib.utils.charsToAsciiHtml(chars);
    html += '</pre>';
    html += apgLib.utils.parserResultToHtml(result, 'Parser Results');
    if (doTrace) {
      html += parser.trace.toHtml('ascii', name);
    }
    html = apgLib.utils.htmlToPage(html, name, name);
    writeHtml(html, name);
  } catch (e) {
    let msg = '\nEXCEPTION THROWN: \n';
    if (e instanceof Error) {
      msg += `${e.name}: ${e.message}`;
    } else if (typeof e === 'string') {
      msg += e;
    } else {
      msg += nodeUtil.inspect(e, inspectOptions);
    }
    process.exitCode = 1;
    console.log(msg);
    throw e;
  }
};
