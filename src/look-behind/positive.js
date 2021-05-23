// This is a simple demonstration of the positive 'look-behind' operator.
// The grammar defines a line of any ASCII printing characters,
// but the line must end with the word `end`.
(function positive() {
  let input = 'this line must end';
  const grammar = new (require('./positive-grammar'))();
  const setup = require('./setup');
  setup(input, grammar, 'positive-ok');
  input = 'this line does not end correctly';
  setup(input, grammar, 'positive-fail');
})();
