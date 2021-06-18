/*  *************************************************************************************
 *   copyright: Copyright (c) 2021 Lowell D. Thomas, all rights reserved
 *     license: BSD-2-Clause (https://opensource.org/licenses/BSD-2-Clause)
 *   ********************************************************************************* */
module.exports = function parent() {
  try {
    const { apgLib } = require('apg-js');
    const grammar = new (require('./parent-u'))();
    const { parser: ParserCtor, ids } = apgLib;
    const parser = new ParserCtor();

    /* define the UDT callback function */
    const isAlpha = function isAlpha(n) {
      if (n >= 65 && n <= 90) return true;
      if (n >= 97 && n <= 122) return true;
      return false;
    };
    const isAlphaNum = function isAlphaNum(n) {
      if (n >= 65 && n <= 90) return true;
      if (n >= 97 && n <= 122) return true;
      if (n >= 48 && n <= 57) return true;
      return false;
    };
    const UDTHtml = function UDTHtml(result, chars, phraseIndex, data) {
      if (isAlpha(chars[phraseIndex])) {
        let len = 1;
        for (let i = phraseIndex + 1; i < chars.length; i += 1) {
          if (isAlphaNum(chars[i])) {
            len += 1;
          } else {
            break;
          }
        }
        result.state = ids.MATCH;
        result.phraseLength = len;
      } else {
        result.state = ids.NOMATCH;
        result.phraseLength = 0;
      }
    };
    parser.callbacks.u_name = UDTHtml;

    /* the matched nodes string */
    let inputString = '<ROOT><Parent><child>...</child></Parent></ROOT>';
    let inputCharacterCodes = apgLib.utils.stringToChars(inputString);

    /* Parse correct HTML tags */
    console.log('the grammar:');
    console.log(grammar.toString());
    console.log('parent mode should match all HTML tag names');
    console.log('a proper input string:');
    console.log(inputString);
    const startRule = 'HTML';
    let result = parser.parse(grammar, startRule, inputCharacterCodes);
    console.log();
    console.log("the parser's results");
    console.dir(result);
    if (result.success === false) {
      throw new Error(`input string: '${inputString}' : parse failed`);
    }

    /* the umatched nodes string */
    inputString = '<ROOT><Parent><child>...</child><child><child>';
    inputCharacterCodes = apgLib.utils.stringToChars(inputString);

    /* Parse unmatched HTML tags */
    console.log('the grammar:');
    console.log(grammar.toString());
    console.log('incorrect input string for parent mode:');
    console.log(inputString);
    result = parser.parse(grammar, startRule, inputCharacterCodes);
    console.log();
    console.log("the parser's results");
    console.dir(result);
    if (result.success === false) {
      throw new Error(`input string: '${inputString}' : parse failed`);
    }
  } catch (e) {
    console.log('EXCEPTION THROWN:');
    if (e instanceof Error) {
      console.log(`${e.name}: ${e.message}`);
    } else if (typeof e === 'string') {
      console.log(e);
    } else {
      console.log('unknown exception thrown');
    }
  }
};
