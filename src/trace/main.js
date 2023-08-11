/*  *************************************************************************************
 *   copyright: Copyright (c) 2021 Lowell D. Thomas, all rights reserved
 *     license: BSD-2-Clause (https://opensource.org/licenses/BSD-2-Clause)
 *   ********************************************************************************* */
// Demonstrates configuring and using the trace facility.
module.exports = function main(args) {
  /* display the program arguments */
  console.log('trace args');
  console.dir(args);

  /* the help screen */
  let desc = '';
  desc += 'The "trace" example demonstrates tracing the parser\n';
  desc += 'as it moves from node to node through the parse tree.\n';
  desc += 'It serves as the primary debugging tool for finding errors.\n';
  desc += 'Errors may be due to an incorrectly written SABNF grammar or,\n';
  desc += 'if the grammar is known to be correct, in the input string.\n';
  desc += 'Examine or run a debugger on this module,\n';
  desc += '"apg-js-examples/src/trace/main.js", to study the example.\n';
  let help = '';
  help += 'Usage: npm run trace [-- arg]\n';
  help += '  arg: help             (or no arg) to display this help screen.\n';
  help += '       default          by default all rule names and no other operators are traced\n';
  help += '       all-ops          demonstrate tracing ALL operators\n';
  help += '       limited-lines    demonstrate how to limit the number of lines in the trace\n';
  help += '       select-rules     demonstrate how to trace only a selected set of rule names\n';
  help += '       select-operators demonstrate how to trace only a selected set of non-rule operators\n';
  help += '       all              run all demonstrations\n';
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
    case 'default':
      console.log('\nDemonstrate: by default all rule names and no other operators are traced');
      require('./default');
      break;
    case 'all-ops':
      console.log('\nDemonstrate: demonstrate tracing ALL operators');
      require('./all-operators');
      break;
    case 'limited-lines':
      console.log('\nDemonstrate: demonstrate how to limit the number of lines in the trace');
      require('./limited-lines');
      break;
    case 'select-rules':
      console.log('\nDemonstrate: demonstrate how to trace only a selected set of rule names');
      require('./select-rules');
      break;
    case 'select-operators':
      console.log('\nDemonstrate: demonstrate how to trace only a selected set of non-rule operators');
      require('./select-operators');
      break;
    case 'all':
      console.log('\nDemonstrate: by default all rule names and no other operators are traced');
      require('./default');
      console.log('\nDemonstrate: demonstrate tracing ALL operators');
      require('./all-operators');
      console.log('\nDemonstrate: demonstrate how to limit the number of lines in the trace');
      require('./limited-lines');
      console.log('\nDemonstrate: demonstrate how to trace only a selected set of rule names');
      require('./select-rules');
      console.log('\nDemonstrate: demonstrate how to trace only a selected set of non-rule operators');
      require('./select-operators');
      break;
    default:
      console.log(`unrecognized argument: ${args[0]}`);
      console.log(help);
  }
};
