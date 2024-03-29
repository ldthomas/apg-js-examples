/*  *************************************************************************************
 *   copyright: Copyright (c) 2021 Lowell D. Thomas, all rights reserved
 *     license: BSD-2-Clause (https://opensource.org/licenses/BSD-2-Clause)
 *   ********************************************************************************* */
// This is a demonstration of the JavaScript APG API, apg-api.
module.exports = function main(args) {
  const separate = require('./separate');
  const single = require('./single');

  /* display the program arguments */
  console.log('apg-api args');
  console.dir(args);

  /* the help screen */
  let help = '';
  help += 'The "apg-api" example is a demonstration of the basics of creating a parser \n';
  help += 'with the JavaScript APG API. There are two examples.\n';
  help += 'One generates the parser in all of the required separate steps.\n';
  help += 'The other solves the same problem with a single call that wraps it all into a single step.\n';
  help += 'Examine or run a debugger on these modules, "apg-examples/src/apg-api/separate.js"\n';
  help += 'or "apg-examples/src/apg-api/generate.js" to study the examples.\n';
  help += 'Examine and double-click "apg-examples/src/apg-api/web-apg-api.html" for web page usage.\n';
  help += '\n';
  help += 'Usage: npm run apg-api [-- arg]\n';
  help += '  arg: help      (or no arg) to display this help screen.\n';
  help += '       separate  to generate a parser in separate steps.\n';
  help += '       single    to generate a parser in a single step.\n';
  help += '       all       run all options.\n';
  switch (args[0]) {
    case 'separate':
      console.log('\nDemonstrate: generating a parser in separate steps');
      separate();
      break;
    case 'single':
      console.log('\nDemonstrate: generating a parser in a single');
      single();
      break;
    case 'all':
      console.log('\nDemonstrate: generating a parser in separate steps');
      separate();
      console.log('\nDemonstrate: generating a parser in a single');
      single();
      break;
    default:
      console.log(help);
      break;
  }
};
