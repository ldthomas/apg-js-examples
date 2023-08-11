/*  *************************************************************************************
 *   copyright: Copyright (c) 2021 Lowell D. Thomas, all rights reserved
 *     license: BSD-2-Clause (https://opensource.org/licenses/BSD-2-Clause)
 *   ********************************************************************************* */
module.exports = function main(args) {
  // This is the driver.
  // It looks for a command line argument specifying a test name.
  // If the name is found, that test is executed.
  // If not found, an error is displayed along with a list of valid test names.
  // If no argument is specified, all tests are executed.
  /* match the test function with the name */
  const desc = 'This is a demonstration of the APG pattern-matching engine, apg-exp.\n';
  let help = '';
  help += 'Usage: npm run apg-exp [-- arg]\n';
  help += '  arg: help (or no arg) to display this help screen.\n';
  help += '       ast             demonstration of using the AST\n';
  help += '       csv             demonstration for Comma Separated Values\n';
  help += '       dangling-else   the famous ambiguity\n';
  help += '       display         demonstration of various displays available\n';
  help += '       flags           demonstration of the apg-exp flags\n';
  help += '       float           floating point grammar comparison with regex\n';
  help += '       limits          limiting the node hits and tree depth\n';
  help += '       multiline-mode  demonstration of defining and using line boundaries\n';
  help += '       recursive       demonstration of recursion (not available in RegExp)\n';
  help += '       replace         demonstration of the replacement function\n';
  help += '       rules           specifying the rules to capture and display\n';
  help += '       split           demonstration of the split function\n';
  help += '       test            demonstration of the test-only mode\n';
  help += '       trace           demonstration of capturing and examining a trace the parser tree\n';
  help += '       udt             demonstration of using UDTs for hand-written phrase matching\n';
  help += '       unicode         demonstration of using unicode mode for finding Greek words\n';
  help += '       word-boundaries demonstration of defining and using word boundaries\n';
  help += '       all             run all demonstrations\n';
  try {
    if (!args[0]) {
      console.log(desc);
      console.log(help);
      return;
    }
    switch (args[0]) {
      case 'ast':
        require('./ast');
        break;
      case 'csv':
        require('./csv');
        break;
      case 'dangling-else':
        require('./dangling-else');
        break;
      case 'display':
        require('./display');
        break;
      case 'flags':
        require('./flags');
        break;
      case 'float':
        require('./float');
        break;
      case 'limits':
        require('./limits');
        break;
      case 'multiline-mode':
        require('./multiline-mode');
        break;
      case 'recursive':
        require('./recursive');
        break;
      case 'replace':
        require('./replace');
        break;
      case 'rules':
        require('./rules');
        break;
      case 'split':
        require('./split');
        break;
      case 'test':
        require('./test');
        break;
      case 'trace':
        require('./trace');
        break;
      case 'udt':
        require('./udt');
        break;
      case 'unicode':
        require('./unicode');
        break;
      case 'word-boundaries':
        require('./word-boundaries');
        break;
      case 'all':
        require('./ast');
        require('./csv');
        require('./dangling-else');
        require('./display');
        require('./flags');
        require('./float');
        require('./limits');
        require('./multiline-mode');
        require('./recursive');
        require('./replace');
        require('./rules');
        require('./split');
        require('./test');
        require('./trace');
        require('./udt');
        require('./unicode');
        require('./trace');
        require('./word-boundaries');
        break;
      case 'help':
        console.log(desc);
        console.log(help);
        break;
      default:
        console.log(`argument not recognized: ${args[0]}`);
        console.log(help);
        break;
    }
  } catch (e) {
    console.log(`EXCEPTION: ${e.message}`);
  }
};
