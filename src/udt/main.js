/*  *************************************************************************************
 *   copyright: Copyright (c) 2021 Lowell D. Thomas, all rights reserved
 *     license: BSD-2-Clause (https://opensource.org/licenses/BSD-2-Clause)
 *   ********************************************************************************* */
// Demonstration of using User-Defined Terminals (UDTs).
// That is, hand-written code snippets for matching specific phrases.
module.exports = function main(args) {
  /* display the program arguments */
  console.log('udt args');
  console.dir(args);

  /* the help screen */
  let desc = '';
  desc += 'The "udt" example demonstrates the use of User-Defined Terminals (UDTs)\n';
  desc += 'in the SABNF grammar.\n';
  desc += 'Examine or run a debugger on this module,\n';
  desc += '"apg-js-examples/src/udt/main.js", to study the example.\n';
  let help = '';
  help += 'Usage: npm run udt [-- arg]\n';
  help += '  arg: help      (or no arg) to display this help screen.\n';
  help += '       minimal   minimal procedures for setting up a parser for a grammar with UDTs\n';
  help += '       stats     minimal with statistics generated\n';
  help += '       trace     minimal with trace generated\n';
  help += '       parent    parent-mode back referencing of UDT\n';
  help += '       universal universal-mode back referencing of UDT\n';
  help += '       all       run all demonstrations\n';
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
    case 'minimal':
      console.log('\nDemonstrate: minimal procedures for setting up a parser for a grammar with UDTs');
      require('./minimal');
      break;
    case 'stats':
      console.log('\nDemonstrate: minimal with statistics generated');
      require('./stats');
      break;
    case 'trace':
      console.log('\nDemonstrate: inimal with trace generated');
      require('./trace');
      break;
    case 'parent':
      console.log('\nDemonstrate: arent-mode back referencing of UDT');
      require('./parent')();
      break;
    case 'universal':
      console.log('\nDemonstrate: universal-mode back referencing of UDT');
      require('./universal')();
      break;
    case 'all':
      console.log('\nDemonstrate: minimal procedures for setting up a parser for a grammar with UDTs');
      require('./minimal');
      console.log('\nDemonstrate: minimal with statistics generated');
      require('./stats');
      console.log('\nDemonstrate: inimal with trace generated');
      require('./trace');
      console.log('\nDemonstrate: parent-mode back referencing of UDT');
      require('./parent')();
      console.log('\nDemonstrate: universal-mode back referencing of UDT');
      require('./universal')();
      break;
    default:
      console.log(`unrecognized argument: ${args[0]}`);
      console.log(help);
  }
};
