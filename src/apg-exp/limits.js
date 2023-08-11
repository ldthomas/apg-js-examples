/* eslint-disable new-cap */
/*  *************************************************************************************
 *   copyright: Copyright (c) 2021 Lowell D. Thomas, all rights reserved
 *     license: BSD-2-Clause (https://opensource.org/licenses/BSD-2-Clause)
 *   ********************************************************************************* */
// This module demonstrates limiting parse tree depth and the number of parsing node hits (parser's unit steps) in case of
// an exponential, runaway grammar.
// Exponential, runaway grammars in the SABNF syntax of `apg` parsers are not nearly as frequent a problem as is
// [catastophic backtracking](http://www.regular-expressions.info/catastrophic.html) in most `regex` engines.
// The reason for this is that the SABNF repetitions (quantifiers) are always possessively greedy.
// That is, the repetition `*`, or star operator, always acts like the `regex` possesive quantifier `*+`.
// The result is that runaway grammars are a little harder to find in the SABNF syntax than in `regex` expressions,
// but they exist none the less and `apg-exp` provides a means of putting the brakes on if a runaway is suspected.
//
// This example will use a nasty grammar that I found in a discussion
// [here](https://lists.csail.mit.edu/pipermail/peg/2009-March/000206.html).
(function limitsExample() {
  try {
    const apgJs = require('apg-js');

    const { apgExp } = apgJs;
    let grammar;
    let exp;
    let result;
    let str;
    grammar = '';
    grammar += 'S = *A\n';
    grammar += 'A = B / C / "a"\n';
    grammar += 'B = "a" S "b"\n';
    grammar += 'C = "a" S "c"\n';
    const flags = '';
    // Let's watch the tree depth and node hits grow as the string of "a"s gets longer.
    exp = new apgExp(grammar, flags);
    console.log();
    console.log('Demonstrate limiting the parse tree depth and the number of parse tree node');
    console.log();
    console.log('SABNF grammar:');
    console.log(exp.sourceToText());
    str = 'aaaaa';
    console.log('          : node hits as the string grows from 5 to 9');
    for (let i = 0; i < 5; i += 1) {
      result = exp.exec(str);
      if (result === null) {
        throw new Error('limit.js: result should never be null');
      }
      console.log(`    string: (${str.length}): ${str}`);
      console.log(` node hits: ${result.nodeHits}`);
      console.log(`tree depth: ${result.treeDepth}`);
      str += 'a';
    }
    // Without doing a log plot, it's a good guess that this is exponential growth in the node hits.
    // In any case it is clear that as the string length gets up around 10-12, the parsing time is very long.
    //
    // First lets limit the node hits to under a 100,000 and see what happens.
    console.log();
    console.log('          : limit the node hits to < 100,000');
    exp = new apgExp(grammar, flags, 100000);
    str = 'aaaaa';
    try {
      for (let i = 0; i < 5; i += 1) {
        result = exp.exec(str);
        if (result === null) {
          throw new Error('limit.js: result should never be null');
        }
        console.log(`    string: (${str.length}): ${str}`);
        console.log(` node hits: ${result.nodeHits}`);
        console.log(`tree depth: ${result.treeDepth}`);
        str += 'a';
      }
    } catch (e) {
      console.log(`NODE HITS EXCEPTION: ${e.message}`);
    }
    // The tree depth is not a real problem here. You can see that the upper bound of stack recursions is ample
    // with this little tool to check it out for your system.
    const max = exp.maxCallStackDepth();
    console.log();
    console.log('          : estimate an upper bound to the call stack depth');
    console.log(`call depth: ${max}`);
    // But we can also limit depth of the parse tree if needed.
    console.log();
    console.log('          : limit the tree depth to < 40');
    exp = new apgExp(grammar, flags, null, 40);
    str = 'aaaaa';
    try {
      for (let i = 0; i < 5; i += 1) {
        result = exp.exec(str);
        if (result === null) {
          throw new Error('limit.js: result should never be null');
        }
        console.log(`    string: (${str.length}): ${str}`);
        console.log(` node hits: ${result.nodeHits}`);
        console.log(`tree depth: ${result.treeDepth}`);
        str += 'a';
      }
    } catch (e) {
      console.log(`TREE DEPTH EXCEPTION: ${e.message}`);
    }
  } catch (e) {
    console.log(`EXCEPTION: ${e.message}`);
  }
})();
