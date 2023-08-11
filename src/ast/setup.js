/* eslint-disable func-names */
/* eslint-disable new-cap */
/*  *************************************************************************************
 *   copyright: Copyright (c) 2021 Lowell D. Thomas, all rights reserved
 *     license: BSD-2-Clause (https://opensource.org/licenses/BSD-2-Clause)
 *   ********************************************************************************* */
// This is the general set up for demonstrating both
// the translation and `XML` display of the `AST`.
module.exports = function setup() {
  const nodeUtil = require('node:util');
  const grammar = new (require('./phone-number'))();

  const inspectOptions = {
    showHidden: true,
    depth: null,
  };
  try {
    /* Acquire the required parser components. */
    const apgJs = require('apg-js');
    const { apgLib } = apgJs;
    const parser = new apgLib.parser();

    /* Construct an `AST` object and attach it to the parser. */
    parser.ast = new apgLib.ast();
    const id = apgLib.ids;

    // The `AST` translating callback functions. These are similar to the parsers syntax callback functions
    // in that they are each called twice, once down the tree and once up the tree, with matched phrase information.
    // With the `AST`, however, the matched phrase is known in the down direction as well as up.
    // - *state* - `SEM_PRE` (down) or `SEM_POST` (up)
    // - *chars* - the array of character codes for the entire input string.
    // - *phraseIndex* - the index in *chars* of the first character of the matched phrase
    // - *phraseLength* - the number of characters in the matched phrase
    // - *data* - the user's optional data object, passed to the translator when it is called
    // - *return value* - normally `SEM_OK`. Can also be `SEM_SKIP` in the `SEM_PRE`
    // state to skip the translation of the branch below the current node.
    const phoneNumber = function (state, chars, phraseIndex, phraseLength, data) {
      const ret = id.SEM_OK;
      if (state === id.SEM_PRE) {
        if (Array.isArray(data) === false) {
          throw new Error("parser's user data must be an array");
        }
        data.length = 0;
      } else if (state === id.SEM_POST) {
        /* not used in this example */
      }
      return ret;
    };
    const areaCode = function (state, chars, phraseIndex, phraseLength, data) {
      const ret = id.SEM_OK;
      if (state === id.SEM_PRE) {
        data['area-code'] = apgLib.utils.charsToString(chars, phraseIndex, phraseLength);
      } else if (state === id.SEM_POST) {
        /* not used in this example */
      }
      return ret;
    };
    const office = function (state, chars, phraseIndex, phraseLength, data) {
      const ret = id.SEM_OK;
      if (state === id.SEM_PRE) {
        data.office = apgLib.utils.charsToString(chars, phraseIndex, phraseLength);
      } else if (state === id.SEM_POST) {
        /* not used in this example */
      }
      return ret;
    };
    const subscriber = function (state, chars, phraseIndex, phraseLength, data) {
      const ret = id.SEM_OK;
      if (state === id.SEM_PRE) {
        data.subscriber = apgLib.utils.charsToString(chars, phraseIndex, phraseLength);
      } else if (state === id.SEM_POST) {
        /* not used in this example */
      }
      return ret;
    };

    // Attach the callback functions to the AST.
    parser.ast.callbacks['phone-number'] = phoneNumber;
    parser.ast.callbacks['area-code'] = areaCode;
    parser.ast.callbacks.office = office;
    parser.ast.callbacks.subscriber = subscriber;

    /* use a hard coded input string */
    const inputString = 'xxxx(555)234-5678xxxx';
    const inputCharacterCodes = apgLib.utils.stringToChars(inputString);
    const startRule = 'phone-number';

    /* parse the string here, generating an `AST` */
    const result = parser.parseSubstring(grammar, startRule, inputCharacterCodes, 4, 13);
    console.log();
    console.log("the parser's results");
    console.dir(result, inspectOptions);
    if (result.success === false) {
      throw new Error(`input string: '${inputString}' : parse failed`);
    }

    /* Return the `AST` object for further processing. */
    return parser.ast;
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
