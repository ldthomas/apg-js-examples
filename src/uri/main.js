/*  *************************************************************************************
 *   copyright: Copyright (c) 2025 Lowell D. Thomas, all rights reserved
 *     license: BSD-2-Clause (https://opensource.org/licenses/BSD-2-Clause)
 *   ********************************************************************************* */
// This is the driver for the URI example.
module.exports = function main(args) {
  /* display the program arguments */
  console.log('uri args');
  console.dir(args);
  /* the example description */
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
  ].join('\n');

  /* the help screen */
  const example = 'http://user@example.com:123/abs/path?q1=a1#body';
  const help = [
    '',
    'Usage: npm run uri [-- arg]',
    '  arg: <none>    (no arg) displays example description and help screen.',
    '       --help    display help screen.',
    '       -h        display help screen.',
    '       URI       the URI string to parse, e.g. http://user@example.com:123/path?query#fragment',
    '       all       to verify that all is well, parses the specific URI:',
    `                 ${example}`,
  ].join('\n');
  if (!args[0]) {
    // If no args, display the description and the help screen.
    console.log(desc);
    console.log(help);
  } else if (args[0] === '--help' || args[0] === '-h') {
    // If `--help` or `-h`, display the help screen only.
    console.log(help);
  } else if (args[0] === 'all') {
    // If `all`, parse a fixed example.
    // Note: the `all` option is used by the script `src/all.sh`.
    // It runs all the examples in the src directory as a sort of unit test.
    // This is a bit of a hack, but it works.
    console.log(`Parsing example URI: ${example}`);
    console.dir(require('./parser')(example));
  } else {
    // Otherwise, parse the URI passed as an argument.
    console.dir(require('./parser')(args[0]));
  }
};
