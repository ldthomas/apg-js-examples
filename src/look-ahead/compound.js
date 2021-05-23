/*  *************************************************************************************
 *   copyright: Copyright (c) 2021 Lowell D. Thomas, all rights reserved
 *     license: BSD-2-Clause (https://opensource.org/licenses/BSD-2-Clause)
 *   ********************************************************************************* */
// This is a check that `AST` suppression works correctly when
// multiple syntactic predicate operators are nested within one another.
(function compound() {
  const setup = require('./setup');
  const grammar = new (require('./nested'))();
  const input = 'aabbcc aaaa aaabbbccc';
  console.log(`the grammar:`);
  console.log(grammar.toString());
  console.log(`the input string:`);
  console.log(input);
  const callbacks = [];
  callbacks.anbn = false;
  callbacks.anbncn = true;
  callbacks.any = false;
  callbacks.begin = true;
  callbacks.bncn = true;
  callbacks.comment = true;
  callbacks.consumeas = true;
  callbacks.end = true;
  callbacks.prefix = true;
  setup(grammar, callbacks, input);
})();
