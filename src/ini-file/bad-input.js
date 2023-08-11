/*  *************************************************************************************
 *   copyright: Copyright (c) 2021 Lowell D. Thomas, all rights reserved
 *     license: BSD-2-Clause (https://opensource.org/licenses/BSD-2-Clause)
 *   ********************************************************************************* */
// This application will read an initialization file with anonymous keys, disjointed sections
// and disjointed keys.
// It will collect the key values in each section found and then display the found data
// alphabetizing the section names and the key names within each section.
// Same as the `basic.js` example, except that there is some bad data, data that
// does not follow the defining SABNF grammar.
// This demonstrates how "error productions" can be used to ignore and/or report bad data.
// See, for example, `BadSectionLine`, `BadValueLine`, `BadBlankLine`.
(function badInput() {
  const fs = require('node:fs');
  const setup = require('./setup');
  try {
    const inputStr = fs.readFileSync('./src/ini-file/bad.txt', 'utf8');
    setup(inputStr, null, null);
  } catch (e) {
    console.log();
    console.log('input error');
    console.dir(e, {
      showHidden: true,
      depth: null,
      colors: true,
    });
  }
})();
