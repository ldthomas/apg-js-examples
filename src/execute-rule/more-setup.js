/* eslint-disable new-cap */
/*  *************************************************************************************
 *   copyright: Copyright (c) 2021 Lowell D. Thomas, all rights reserved
 *     license: BSD-2-Clause (https://opensource.org/licenses/BSD-2-Clause)
 *   ********************************************************************************* */
// This module sets up an application to demonstrate how to call any arbitrary rule name `RNM`
// callback function from any other callback function - in this case from a `UDT` callback.
// (See the initial discussion for `colors-app.js` for the motivation
// and cautionary tales of doing this kind of craziness.)
module.exports = function moreSetup(udtcallback, title) {
  const nodeUtil = require('node:util');
  const inspectOptions = {
    showHidden: true,
    depth: null,
  };
  try {
    const { apgLib } = require('apg-js');
    const grammar = new (require('./more'))();
    const parser = new apgLib.parser();
    parser.stats = new apgLib.stats();
    parser.trace = new apgLib.trace();
    parser.callbacks.u_more = udtcallback;
    const inputString = 'start more more';
    const inputCharacterCodes = apgLib.utils.stringToChars(inputString);
    const startRule = 0;

    /* parse the input string */
    const result = parser.parse(grammar, startRule, inputCharacterCodes);

    /* display parser results */
    console.log();
    console.log("the parser's results");
    console.dir(result, inspectOptions);
    if (result.success === false) {
      throw new Error(`input string: '${inputString}' : parse failed`);
    }
    let html = '';
    html += parser.stats.toHtml('hits', title);
    html += parser.trace.toHtml(title);

    /* Returns the statistics and trace displays to the application.
        The application will decide how to display it. */
    return html;
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
