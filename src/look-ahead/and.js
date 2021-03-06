/*  *************************************************************************************
 *   copyright: Copyright (c) 2021 Lowell D. Thomas, all rights reserved
 *     license: BSD-2-Clause (https://opensource.org/licenses/BSD-2-Clause)
 *   ********************************************************************************* */
// Demonstration for the `AND(&)` syntactic predicate operator.
// This is the classic example of a grammar
// which can be represented with syntactic predicates, but not
// with a strictly context-free grammar.
// It is the grammar for a<sup>n</sup>b<sup>n</sup>c<sup>n</sup>.
(function and() {
  const setup = require('./setup');
  const grammar = new (require('./anbncn'))();
  const input = 'aaaabbbbcccc';
  const callbacks = [];
  console.log(`the grammar:`);
  console.log(grammar.toString());
  console.log(`the input string:`);
  console.log(input);
  callbacks.anbn = true;
  callbacks.anbncn = true;
  callbacks.bncn = true;
  callbacks.consumeas = true;
  callbacks.prefix = true;
  setup(grammar, callbacks, input);
})();
