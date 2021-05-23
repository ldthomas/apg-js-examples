/*  *************************************************************************************
 *   copyright: Copyright (c) 2021 Lowell D. Thomas, all rights reserved
 *     license: BSD-2-Clause (https://opensource.org/licenses/BSD-2-Clause)
 *   ********************************************************************************* */
// Driver for the ini-file example.
module.exports = function main(args) {
  /* display the program arguments */
  console.log('ini-file args');
  console.dir(args);

  /* the help screen */
  let desc = '';
  desc += 'The "ini-file" example is a "real world" demonstration of how apg-exp might\n';
  desc += 'be used to process an initialization file, the common "ini" format.\n';
  desc +=
    'Examine or run a debugger on this module, "apg-js-examples/src/back-reference/main.js" to study the example.\n';
  let help = '';
  help += 'Usage: npm run ini-file [-- arg]\n';
  help += '  arg: help      (or no arg) to display this help screen.\n';
  help += '       bad-input demonstration with a poorly-formed ini file\n';
  help += '       basic     demonstration of a basic parsing of an ini file\n';
  help += '       trace     \n';
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
    case 'bad-input':
      require('./bad-input');
      break;
    case 'basic':
      require('./basic');
      break;
    case 'trace':
      require('./trace');
      break;
    default:
      console.log(`unrecognized argument: ${args[0]}`);
      console.log(help);
  }
};
