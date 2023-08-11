/* eslint-disable func-names */
/*  *************************************************************************************
 *   copyright: Copyright (c) 2021 Lowell D. Thomas, all rights reserved
 *     license: BSD-2-Clause (https://opensource.org/licenses/BSD-2-Clause)
 *   ********************************************************************************* */
// This module demonstrates how to control the output of the parser's tracing facility.
// (See the [`apg-lib`](https://github.com/ldthomas/apg-js2-lib) `trace.js` documentation for a lengthy discussion of tracing.
// Here we will just concentrate on how to filter the trace records.
// This module is the basic parser set up.
// - *trace* - the trace object. It will be constructed and the filter's set in individual demonstrations
// and passed into this general parser.
// - *phoneNumber* - the input string, a phone number in this case.
// - *name* - a unique name to identify the HTML page associated with each test
module.exports = function setup(trace, phoneNumber, nameArg) {
  let name = nameArg;
  const thisFileName = 'setup.js: ';
  const nodeUtil = require('node:util');
  const inspectOptions = {
    showHidden: true,
    depth: null,
  };
  try {
    const { apgLib } = require('apg-js');
    const writeHtml = require('../writeHtml');
    // eslint-disable-next-line new-cap
    const parser = new apgLib.parser();
    const grammar = new (require('./fancy-number'))();
    const id = apgLib.ids;

    // The u_office(), hand-written UDT.
    parser.callbacks.u_office = function (result, chars, phraseIndex) {
      let matchFound = false;
      const TRUE = true;
      while (TRUE) {
        if (chars + phraseIndex + 3 <= chars.length) {
          /* not three digits left in the string */
          break;
        }
        const dig1 = chars[phraseIndex];
        const dig2 = chars[phraseIndex + 1];
        const dig3 = chars[phraseIndex + 2];
        if (dig1 < 50 || dig1 > 57) {
          /* first digit must be in range 2-9 */
          break;
        }
        if (dig2 < 48 || dig2 > 57 || dig3 < 48 || dig3 > 57) {
          /* second & third digits must be in range 0-9 */
          break;
        }
        if (dig2 === 49 && dig3 === 49) {
          /* if the second digit is "1" then the third digit cannot also be "1" */
          throw new Error('UDT u_office: digits 2 and 3 cannot both be 1');
        }
        matchFound = true;
        break;
      }
      if (matchFound === true) {
        result.state = id.MATCH;
        result.phraseLength = 3;
      } else {
        result.state = id.NOMATCH;
        result.phraseLength = 0;
      }
    };
    let inputCharacterCodes;
    if (typeof trace === 'object' && trace.traceObject === 'traceObject') {
      parser.trace = trace;
    } else {
      throw new Error(`${thisFileName}valid trace object required`);
    }
    if (typeof phoneNumber === 'string') {
      inputCharacterCodes = apgLib.utils.stringToChars(phoneNumber);
    } else if (Array.isArray(phoneNumber) && typeof (phoneNumber[0] === 'number')) {
      inputCharacterCodes = phoneNumber;
    } else {
      throw new Error(`${thisFileName}input phoneNumber must be string or array of integers`);
    }
    if (typeof name !== 'string') {
      name = 'default';
    }
    const result = parser.parse(grammar, 0, inputCharacterCodes);
    console.log();
    console.log('parser input:');
    console.log(phoneNumber);
    console.log();
    console.log('parser results');
    console.dir(result, inspectOptions);
    let html;

    // Display the trace in ASCII format.
    html = parser.trace.toHtml('ascii', 'ASCII display');

    // Display the trace in hexidecimal format.
    html += parser.trace.toHtml('hex', 'hexidecimal display');

    // Display the trace in decimal format.
    html += parser.trace.toHtml('dec', 'decimal display');

    // Display the trace in unicode format.
    html += parser.trace.toHtml('uni', 'UNICODE display');
    html = apgLib.utils.htmlToPage(html, name);
    writeHtml(html, name);
  } catch (e) {
    let msg = '\nEXCEPTION THROWN:\n';
    if (e instanceof Error) {
      msg += `${e.name}: ${e.message}`;
    } else if (typeof e === 'string') {
      msg += e;
    } else {
      msg += nodeUtil.inspect(e, inspectOptions);
    }
    console.log(msg);
    throw e;
  }
};
