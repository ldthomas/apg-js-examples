/*  *************************************************************************************
 *   copyright: Copyright (c) 2021 Lowell D. Thomas, all rights reserved
 *     license: BSD-2-Clause (https://opensource.org/licenses/BSD-2-Clause)
 *   ********************************************************************************* */
// This example will emulate the Java [OData test tool](https://github.com/oasis-tcs/odata-abnf).
// An OData parser will parse the OData test cases and verify the success or failure of
// each test as required. Any individual test case can also be traced.
//
// The test cases have been converted from the original XML format to JSON format.
// (See the C-laguage example, [ex-odata](https://github.com/ldthomas/apg-7.0/tree/main/examples/ex-odata).)
// In the JSON format, the examples are separated into "valid", those that parse successfully and
// "invalid", those that are expected, by design, to fail. No attempt is made to match the character
// at which any test is expected to fail.
//
// This main program provides for running:
//  - all valid tests
//  - all invalid tests
//  - all tests, valid and invalid combined
//  - tracing any individual test
module.exports = function main(args) {
  /* display the program arguments */
  console.log('odata args');
  console.dir(args);

  /* the help screen */
  let desc = '';
  desc += 'The OData example demonstrates parsing the OData grammar and executing the parser\n';
  desc += 'against the large set of test cases given at https://github.com/oasis-tcs/odata-abnf.\n';
  let help = '';
  help += 'Usage: npm run odata [-- args]\n';
  help += '  args: help     (or no arg) to display this help screen.\n';
  help += '        valid    run all of the valid test cases\n';
  help += '        invalid  run all of the test cases expected to fail\n';
  help += '        all      run all of the test cases\n';
  help += '        trace n  parse and trace the nth test case where n is an index from the list\n';
  if (!args[0]) {
    /* display the help screen and exit */
    console.log(desc);
    console.log(help);
    return;
  }
  /* select the test to run */
  let index;
  switch (args[0]) {
    case 'help':
      console.log(help);
      return;
    case 'valid':
      require('./run')('valid');
      break;
    case 'invalid':
      require('./run')('invalid');
      break;
    case 'all':
      require('./run')('all');
      break;
    case 'trace':
      if (args[1] === undefined) {
        console.log('trace requires and integer index argument');
        console.log();
        console.log(help);
        break;
      }
      index = parseInt(args[1], 10);
      if (Number.isNaN(index)) {
        console.log(`index argument = ${args[1]} but must be a number`);
        console.log();
        console.log(help);
        break;
      }
      require('./run')('trace', index);
      break;
    default:
      console.log(`unrecognized argument: ${args[0]}`);
      console.log(help);
  }
};
