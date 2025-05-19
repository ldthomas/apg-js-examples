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
  const example = 'http://user@example.com:123/abs/path?q1=a1#body';
  const desc = [
    '',
    'Description: The URI example features a complete and well-tested URI (RFC 3986) parser.',
    'With this test any URI can be parsed into its components:',
    '  scheme',
    '  userinfo',
    '  host',
    '  port',
    '  path',
    '  query',
    '  fragment',
    'Examine or run a debugger on the module, "apg-js-examples/src/uri/parser.js" to study the example.',
  ].join('\n');

  const help = [
    '',
    'Usage: npm run uri [-- arg]',
    '  arg: <none>    (no arg) displays example description and help screen.',
    '       --help    display help screen.',
    '       -h        display help screen.',
    '       help      display help screen.',
    '       URI       the URI string to parse, e.g. http://user@example.com:123/path?query#fragment',
    '       all       to verify that all is well, parses the specific URI:',
    `                 ${example}`,
  ].join('\n');
  if (!args[0]) {
    console.log(desc);
    console.log(help);
    return;
  }
  switch (args[0]) {
    case 'help':
    case '--help':
    case '-h':
      console.log(help);
      return;
    case 'all':
      require('./parser')(example);
      break;
    default:
      require('./parser')(args[0]);
  }
};
