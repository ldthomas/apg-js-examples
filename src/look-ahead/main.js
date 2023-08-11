/*  *************************************************************************************
 *   copyright: Copyright (c) 2021 Lowell D. Thomas, all rights reserved
 *     license: BSD-2-Clause (https://opensource.org/licenses/BSD-2-Clause)
 *   ********************************************************************************* */
// This is a demonstration of the look ahead operators &(AND) and !(NOT)
module.exports = function main(args) {
  /* display the program arguments */
  console.log('look-ahead args');
  console.dir(args);

  /* the help screen */
  let desc = '';
  desc += 'The "look-ahead" example demonstrates the use of the look ahead operators,\n';
  desc += '&(AND) and !(NOT).\n';
  desc += 'Examine or run a debugger on this module, "apg-js-examples/src/look-ahead/main.js" to study the example.\n';
  let help = '';
  help += 'Usage: npm run look-ahead [-- arg]\n';
  help += '  arg: help     (or no arg) to display this help screen.\n';
  help += '       and      demonstrate the & operator\n';
  help += '       not      demonstrate the ! operator\n';
  help += '       compound demonstrate nested look ahead operators\n';
  help += '       all      run all demonstrations\n';
  if (!args[0]) {
    /* display the help screen and exit */
    console.log(desc);
    console.log(help);
    return;
  }
  switch (args[0]) {
    case 'help':
      console.log(help);
      return;
    case 'and':
      require('./and');
      break;
    case 'not':
      require('./not');
      break;
    case 'compound':
      require('./compound');
      break;
    case 'all':
      require('./and');
      require('./not');
      require('./compound');
      break;
    default:
      console.log(`unrecognized argument: ${args[0]}`);
      console.log(help);
  }
};
