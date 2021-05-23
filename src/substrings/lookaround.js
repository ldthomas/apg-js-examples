/*  *************************************************************************************
 *   copyright: Copyright (c) 2021 Lowell D. Thomas, all rights reserved
 *     license: BSD-2-Clause (https://opensource.org/licenses/BSD-2-Clause)
 *   ********************************************************************************* */
// Look ahead and look behind parsing is allowed to look at the entire string, not just the substring being parsed.
// This is an important feature for the phrase matching engine (see `apg-exp`).
// It allows you to match a substring, but only if it is preceded and/or followed by specific phrases.
//
// This grammar is for a simplified area code.
// The parsed substring is only a match if it is preceded and followed by open and closed parentheses
// which fall outside of the area code number.
// You can see in the trace of the second string that the look behind finds the `(` preceding the defined substring
// and the look ahead finds `)` following the defined substring.
(function lookaround() {
  let input;
  const grammar = new (require('./area-code'))();
  const setup = require('./setup');
  input = '800-555-1234';
  setup(input, 0, 3, grammar, 'area-code-fail');
  input = '(800)555-1234';
  setup(input, 1, 3, grammar, 'area-code-ok');
})();
