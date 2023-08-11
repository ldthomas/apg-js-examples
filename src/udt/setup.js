/* eslint-disable func-names */
/* eslint-disable new-cap */
/*  *************************************************************************************
 *   copyright: Copyright (c) 2021 Lowell D. Thomas, all rights reserved
 *     license: BSD-2-Clause (https://opensource.org/licenses/BSD-2-Clause)
 *   ********************************************************************************* */
// This is the driver program for all examples.
module.exports = function setup(doStats, doTrace) {
  const nodeUtil = require('node:util');
  let html;
  const inspectOptions = {
    showHidden: true,
    depth: null,
  };
  try {
    const { apgLib } = require('apg-js');
    const writeHtml = require('../writeHtml');
    const grammar = new (require('./phone-number'))();
    const parser = new apgLib.parser();

    const id = apgLib.ids;
    if (doStats) {
      parser.stats = new apgLib.stats();
    }
    if (doTrace) {
      parser.trace = new apgLib.trace();
    }
    // This is the required `UDT` callback function.
    // Rule name callback functions are optional, however
    // when `UDT`s are present in the grammar,
    // the parser will fail with an error message if all of the `UDT`s in the grammar
    // do not have callback functions defined for them.
    const UDToffice = function (result, chars, phraseIndex, data) {
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
        if (data !== null) {
          data.u_office = apgLib.utils.charsToString(chars, phraseIndex, result.phraseLength);
        }
      } else {
        result.state = id.NOMATCH;
        result.phraseLength = 0;
      }
    };

    // Define some rule name (`RNM`) callback functions.
    const phoneNumber = function (result, chars, phraseIndex, data) {
      if (result.state === id.MATCH) {
        if (Array.isArray(data) === false) {
          throw new Error("parser's user data must be an array");
        }
        /* initialize the data array length to zero */
        data.length = 0;
      }
    };
    const areaCode = function (result, chars, phraseIndex, data) {
      if (result.state === id.MATCH) {
        /* capture the area code */
        data['area-code'] = apgLib.utils.charsToString(chars, phraseIndex, result.phraseLength);
      }
    };
    const subscriber = function (result, chars, phraseIndex, data) {
      if (result.state === id.MATCH) {
        /* capture the 4-digit subscriber number */
        data.subscriber = apgLib.utils.charsToString(chars, phraseIndex, result.phraseLength);
      }
    };
    parser.callbacks['phone-number'] = phoneNumber;
    parser.callbacks['area-code'] = areaCode;
    parser.callbacks.u_office = UDToffice;
    parser.callbacks.subscriber = subscriber;
    const inputString = '(555)234-5678';
    const inputCharacterCodes = apgLib.utils.stringToChars(inputString);
    const startRule = 'phone-number';
    const phoneParts = [];

    // Parse the phone number.
    console.log('the grammar:');
    console.log(grammar.toString());
    console.log('the input string:');
    console.log(inputString);
    const result = parser.parse(grammar, startRule, inputCharacterCodes, phoneParts);
    console.log();
    console.log("the parser's results");
    console.dir(result, inspectOptions);
    if (result.success === false) {
      throw new Error(`input string: '${inputString}' : parse failed`);
    }

    // Display parsed phone number parts on the console.
    console.log();
    console.log(`phone number: ${inputString}`);
    console.log(`   area-code: ${phoneParts['area-code']}`);
    console.log(`    u_office: ${phoneParts.u_office}`);
    console.log(`  subscriber: ${phoneParts.subscriber}`);
    if (doStats) {
      /* If requested, display the stats in all orderings on a web page. */
      html = '';
      html += parser.stats.toHtml('ops', 'ops-only stats');
      html += parser.stats.toHtml('index', 'rules ordered by index');
      html += parser.stats.toHtml('alpha', 'rules ordered alphabetically');
      html += parser.stats.toHtml('hits', 'rules ordered by hit count');
      html = apgLib.utils.htmlToPage(html, 'udt-stats');
      writeHtml(html, 'udt-stats');
    }
    if (doTrace) {
      /* If requested, display the trace on a web page. */
      html = parser.trace.toHtmlPage('ascii', 'udt trace');
      writeHtml(html, 'udt-trace');
    }
  } catch (e) {
    let msg = '\nEXCEPTION THROWN: \n';
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
