/*  *************************************************************************************
 *   copyright: Copyright (c) 2021 Lowell D. Thomas, all rights reserved
 *     license: BSD-2-Clause (https://opensource.org/licenses/BSD-2-Clause)
 *   ********************************************************************************* */
// Demonstrations of parsing sub-strings of the input string.
module.exports = function main(args) {
  /* display the program arguments */
  console.log('look-behind args');
  console.dir(args);

  /* the help screen */
  let desc = '';
  desc += 'The "substrings" example demonstrates the ability of the parser\n';
  desc += 'to parse only a substring of the full input string.\n';
  desc += 'Examine or run a debugger on this module, "apg-js-examples/src/substrings/main.js" to study the example.\n';
  let help = '';
  help += 'Usage: npm run substrings [-- arg]\n';
  help += '  arg: help       (or no arg) to display this help screen.\n';
  help += '       lookaround demonstrates setting the substring to allow look around operations\n';
  help += '       simple     demonstrates simply parsing a phrase that is in the middle of a string\n';
  help += '       all        run all demonstrations\n';
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
    case 'lookaround':
      console.log('\nDemonstrate: setting the substring to allow look around operations');
      require('./lookaround');
      break;
    case 'simple':
      console.log('\nDemonstrate: simply parsing a phrase that is in the middle of a string');
      require('./simple');
      break;
    case 'all':
      console.log('\nDemonstrate: setting the substring to allow look around operations');
      require('./lookaround');
      console.log('\nDemonstrate: simply parsing a phrase that is in the middle of a string');
      require('./simple');
      break;
    default:
      console.log(`unrecognized argument: ${args[0]}`);
      console.log(help);
  }
};
