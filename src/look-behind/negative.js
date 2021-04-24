// This is a simple demonstration of the negative `look-behind` operator.
// The grammar defines two types of text (ASCII printing characters,)
// Comment text begins with `//`, other text does not.
// Both of these input lines will parse successfully.
// Look at the trace to see that in the one case `other-text` is matched,
// while in the other case `comment-text` is matched.
// In a more realistic application the `AST` would be used to translate
// or otherwise distiguish between the two types of text.
(function () {
    "use strict";
    let input = "// this is a comment";
    let grammar = new (require("./negative-grammar.js"))();
    let setup = require("./setup.js");
    setup(input, grammar, "negative-comment");
    input = "this is not a comment";
    setup(input, grammar, "negative-no-comment");
})();
