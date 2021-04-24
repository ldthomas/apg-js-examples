// This is a simple demonstration of the positive 'look-behind' operator.
// The grammar defines a line of any ASCII printing characters,
// but the line must end with the word `end`.
(function () {
    "use strict";
    let input = "this line must end";
    let grammar = new (require("./positive-grammar.js"))();
    let setup = require("./setup.js");
    setup(input, grammar, "positive-ok");
    input = "this line does not end correctly";
    setup(input, grammar, "positive-fail");
})();
