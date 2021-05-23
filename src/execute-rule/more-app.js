/* eslint-disable func-names */
/*  *************************************************************************************
 *   copyright: Copyright (c) 2021 Lowell D. Thomas, all rights reserved
 *     license: BSD-2-Clause (https://opensource.org/licenses/BSD-2-Clause)
 *   ********************************************************************************* */
// This module defines the `UDT` callback functions for the demonstration.
// One `UDT` will match a phrase directly, the normal `UDT` function.
// One `UDT` will match a phrase by calling one of the rule name operators defined by the SABNF grammar.
// A strange thing to do, you might think, and you might well be right.
// But look at the trace of the parse tree and in this case you will see that there is a `RNM` operator
// below the `UDT` operator in the tree. There can be cases where this will turn out to be
// useful when translating the `AST`.
//
// This module calls `more-setup.js` twice, once for each case described above.
// The stat and trace displays are collected and shown on a single web page for easy comparison.
(function moreApp() {
  const { apgLib } = require('apg-js');
  const htmlWrite = require('../writeHtml');
  const setup = require('./more-setup');
  const fileName = 'more-evaluate-rule';
  const id = apgLib.ids;
  // This `UDT` callback will do phrase matching with a call to `evaluateRule()`.
  const evalRuleCallback = function (result, chars, phraseIndex) {
    let phrase = phraseIndex;
    let length = 0;
    while (phrase + 5 <= chars.length) {
      /* call evaluateRule() here */
      result.evaluateRule(1, phrase, result);
      if (result.state === id.MATCH) {
        length += result.phraseLength;
        phrase += result.phraseLength;
      } else {
        break;
      }
    }
    if (length > 0) {
      result.state = id.MATCH;
      result.phraseLength = length;
    } else {
      result.state = id.NOMATCH;
      result.phraseLength = 0;
    }
  };
  // This `UDT` callback will simply match a phrase on its own.
  const udtCallback = function (result, chars, phraseIndex) {
    let phrase = phraseIndex;

    let length = 0;
    while (phrase + 5 <= chars.length) {
      if (
        chars[phrase] === 32 &&
        chars[phrase + 1] === 109 &&
        chars[phrase + 2] === 111 &&
        chars[phrase + 3] === 114 &&
        chars[phrase + 4] === 101
      ) {
        length += 5;
        phrase += 5;
      } else {
        break;
      }
    }
    if (length > 0) {
      result.state = id.MATCH;
      result.phraseLength = length;
    } else {
      result.state = id.NOMATCH;
      result.phraseLength = 0;
    }
  };
  let html = '';
  /* get the "regular" UDT phrase */
  html += setup(udtCallback, 'more parsed with UDT');
  /* get the phrase with a call to evaluateRule() */
  html += setup(evalRuleCallback, 'more parsed with evaluateRule()');
  // Display it all on the web page.
  html = apgLib.utils.htmlToPage(html, 'more app');
  htmlWrite(html, fileName);
})();
