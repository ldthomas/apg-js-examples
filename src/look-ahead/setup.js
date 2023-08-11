/* eslint-disable new-cap */
// This module demonstrates a grammar with syntactic predicates.
// These are the `AND(&)` and `NOT(!)` operators.
// They have the feature of looking ahead in the input string for an
// SABNF grammar-defined phrase and making parsing decisions based on what they find.
// The `AND` operator fails if the grammar-defined phrase *is not* found.
// The `NOT` operator fails if the grammar-defined phrase *is* found.
// Neither of these operators ever returns a matched phrase.
// They either return a `NOMATCH` state or an empty string, both having phrase length = 0.
// The effect of this is that no nodes are ever retained on the `AST`
// for any rule names (or `UDT` names) that appear in
// the grammar-defined phrases behind the syntactic predicate operators.
// even if they are explicitly defined to be kept in the `AST`.
// In fact, the parser has an internal mechanism that suppresses `AST` node collection
// while it is parsing syntactic predicate phrases.
//
// This example demonstrates that the parser correctly suppresses `AST` node collection
// within syntactic predicate phrases.
module.exports = function setup(grammar, callbacks, input) {
  const nodeUtil = require('node:util');
  const inspectOptions = {
    showHidden: true,
    depth: null,
  };
  try {
    // See [`simple/setup.js`](../simple/setup.html) for the basics of setting up the parser objects.
    const { apgLib } = require('apg-js');
    const parser = new apgLib.parser();
    parser.ast = new apgLib.ast();
    parser.ast.callbacks = callbacks;
    const inputCharacterCodes = apgLib.utils.stringToChars(input);
    const startRule = 0;
    const result = parser.parse(grammar, startRule, inputCharacterCodes);
    /* display parser results on the console */
    console.log();
    console.log("the parser's results");
    console.dir(result, inspectOptions);
    if (result.success === false) {
      throw new Error(`input string: '${input}' : parse failed`);
    }

    // Generate and display the `AST` in `XML` format,
    // demonstrating that the syntactic predicate phrases are not present
    // even though we have requested to see them on the `AST`.
    const xml = parser.ast.toXml();
    console.log();
    console.log('AST in XML format');
    console.log('Note that the look-ahead phrases are not on the AST even though they have been requested.');
    console.log(xml);
  } catch (e) {
    let msg = '\nEXCEPTION THROWN: \n';
    if (e instanceof Error) {
      msg += `${e.name}: ${e.message}`;
    } else if (typeof e === 'string') {
      msg += e;
    } else {
      msg += nodeUtil.inspect(e, inspectOptions);
    }
    process.exitCode = 1;
    console.log(msg);
    throw e;
  }
};
