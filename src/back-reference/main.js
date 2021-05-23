/*  *************************************************************************************
 *   copyright: Copyright (c) 2021 Lowell D. Thomas, all rights reserved
 *     license: BSD-2-Clause (https://opensource.org/licenses/BSD-2-Clause)
 *   ********************************************************************************* */
// This is a demonstration of the using the back reference operators.
module.exports = function main(args) {
  /* display the program arguments */
  console.log('back-reference args');
  console.dir(args);

  /* the help screen */
  let desc = '';
  desc += 'The "back-reference" example is a demonstration of using back referencing\n';
  desc += 'in pattern matching.\n';
  desc +=
    'Examine or run a debugger on this module, "apg-js-examples/src/back-reference/main.js" to study the example.\n';
  let help = '';
  help += 'Usage: npm run back-reference [-- arg]\n';
  help += '  arg: help        (or no arg) to display this help screen.\n';
  help += '       branch-fail back-reference not matched (see the trace output)\n';
  help += '       parent      demonstrate parent-mode back reference to match HTML tags\n';
  help += '       universal   a very simple demonstration of universal-mode back referencing\n';
  if (!args[0]) {
    /* display the help screen and exit */
    console.log(desc);
    console.log(help);
    return;
  }
  let input;
  let grammar;
  let displayname;
  let doTrace;
  let setup = require('./setup');
  switch (args[0]) {
    case 'help':
      console.log(help);
      return;
    case 'branch-fail':
      input = 'ayaa';
      grammar = new (require('./branch-fail-grammar'))();
      displayname = 'branch-fail';
      doTrace = true;
      break;
    case 'parent':
      setup = require('./setup');
      input = '<ROOT><next><ToP>...</ToP></next></ROOT>';
      grammar = new (require('./parent-mode-grammar'))();
      displayname = 'parent-mode matched';
      doTrace = true;
      setup(input, grammar, displayname, doTrace);
      input = '<root><next><top>...</top></next></notroot>';
      displayname = 'parent-mode not matched';
      break;
    case 'universal':
      input = 'xXXx';
      grammar = new (require('./universal-mode-grammar'))();
      displayname = 'universal-mode';
      doTrace = true;
      break;
    default:
      console.log(`unrecognized argument: ${args[0]}`);
      console.log(help);
      return;
  }

  setup(input, grammar, displayname, doTrace);
};
