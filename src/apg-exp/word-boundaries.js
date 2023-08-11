/*  *************************************************************************************
 *   copyright: Copyright (c) 2021 Lowell D. Thomas, all rights reserved
 *     license: BSD-2-Clause (https://opensource.org/licenses/BSD-2-Clause)
 *   ********************************************************************************* */
// Unlike most `regex` engines, `apg-exp` has no built-in notation for word boundaries.
// `apg-exp` makes no assumptions about what is or isn't a word boundary.
// Nonetheless, it is very easy to create word-boundary anchors, once you have decided
// what constitutes a word.
//
// This example will demonstrate matching words which consist only of ASCII alphabetic characters.
// Once this word character set has been defined, word boundary anchors can be created
// with the look around operators. A word must be preceded by a non-word character or the beginning of the string
// and followed by a non-word character or the end of string. You can see how these anchors are created
// in the grammar below.
//
// This example will show the word "cat" is matched at the beginning of a line, in the middle of the line
// and at the end of the line. However, the character string "cat" is not found as a word when part of a longer string,
// in this case in the words "Bobcat" and "caterpillar".
(function wordBoundaries() {
  try {
    const { apgExp: ApgExp, apgLib } = require('apg-js');
    const writeHtml = require('../writeHtml');

    let grammar;
    let result;
    let str;
    let html;
    grammar = '';
    grammar += 'word-to-find = abw "cat" aew\n';
    grammar += 'word-char    = %d65-90/%d97-122\n';
    grammar += 'abw          = (!!word-char / %^) ; anchor begin of word\n';
    grammar += 'aew          = (!word-char / %$)  ; anchor end of word\n';
    const flags = 'g';
    const exp = new ApgExp(grammar, flags);
    console.log();
    console.log('Demonstrate defining and using word boundaries.');
    console.log();
    console.log('SABNF grammar:');
    console.log(exp.sourceToText());
    str = '';
    str += 'Cat - a Bobcat is a cat but a caterpillar is not a cat';
    console.log();
    console.log('input string:');
    console.log(str);
    html = '';
    html += '<h3>grammar source</h3>\n';
    html += exp.sourceToHtml();
    html += '<h3>found words</h3>\n';
    const TRUE = true;
    while (TRUE) {
      result = exp.exec(str);
      if (result == null) {
        break;
      }
      html += `<p>${result.toHtml()}</p>`;
      console.log(result.toText());
    }
    const page = apgLib.utils.htmlToPage(html);
    const htmlName = 'word-boundaries';
    writeHtml(page, htmlName);
  } catch (e) {
    console.log(`EXCEPTION: ${e.message}`);
  }
})();
