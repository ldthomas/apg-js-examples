/*  *************************************************************************************
 *   copyright: Copyright (c) 2025 Lowell D. Thomas, all rights reserved
 *     license: BSD-2-Clause (https://opensource.org/licenses/BSD-2-Clause)
 *   ********************************************************************************* */
// Driver for the URI example.
module.exports = function main(args) {
  /* display the program arguments */
  console.log('uri args');
  console.dir(args);

  /* the help screen */
  const example = 'https://user@example.com:123/one/two?q1=a1#body'
  let desc = '';
  desc += 'The URI example features a complete and well-tested URI (RFC 3986) parser.\n';
  desc += 'With this test any URI can be parsed into its components:\n';
  desc += '  scheme\n';
  desc += '  userinfo\n';
  desc += '  host\n';
  desc += '  port\n';
  desc += '  path\n';
  desc += '  query\n';
  desc += '  fragment\n';
  desc +=
    'Examine or run a debugger on this module, "apg-js-examples/src/uri/main.js" to study the example.\n';
  let help = '';
  help += 'Usage: npm run uri [-- arg]\n';
  help += '  arg: help      (or no arg) to display this help screen.\n';
  help += '       [uri]     the URI string to parse\n';
  help += '       all       to verify that all is well, parses the specific URI:\n';
  help += `                 ${example}\n`;
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
    case 'all':
      require('./parser')(example);
      break;
    default:
      require('./parser')(args[0]);
  }
};
