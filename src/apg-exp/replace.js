/* eslint-disable no-template-curly-in-string */
/* eslint-disable new-cap */
/*  *************************************************************************************
 *   copyright: Copyright (c) 2021 Lowell D. Thomas, all rights reserved
 *     license: BSD-2-Clause (https://opensource.org/licenses/BSD-2-Clause)
 *   ********************************************************************************* */
// This module demonstrates the `replace()` function.
// It is roughly equivalent to the JavaScript string `String.replace(regex, string | function)` function
// (It follows closely the [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replace) description.)
// If the global flag `g` is not set, only the first matched phrase is replaced.
// If the global flag `g` is set, all matched phrases will be replaced.
// If the sticky flag `y` is set, all matched 'consecutive' phrases will be replaced.
// If the unicode flag `u` is set, an exception will be thrown. `replace()` only works on strings, not character code arrays.
// Consider something like:
// ```
// exp = new apgExp('rule = "abc"\n);
// str = "---abc---";
// restr = "xyz";
// let re = exp.replace(str, restr);
// ```
// This will replace `abc` with `xyz` and return the result in `re`.
// The string `restr` may contain replacement patterns.
// ```
// $$ - insert the character $ - is the escape sequence for the $ character
// $` - insert the prefix to the matched pattern
// $& - insert the matched pattern
// $' - insert the suffix of the matched pattern
// ${name} - insert the last match to the rule "name"
// ```
// `restr` may also be a user-written function of the form
// ```
// let restr = function(result, exp){
// // result is the result object from the pattern match
// // exp is the "last match" object
// }
// ```
// There is quite a bit of redundancy here with both the `result` object and the `apg-exp` object being passed to the
// replacement function. However, this provides the user with a great deal of flexibility in what might be the
// most convenient way to create the replacement. Also, the `apg-exp` object has the AST which is a powerful
// translation tool for really tough replacement jobs. We'll see some examples of that elsewhere.
(function replace() {
  try {
    const apgJs = require('apg-js');
    const { apgExp } = apgJs;
    let grammar = '';
    let exp;
    let flags;
    let str;
    let restr;
    let patternString;
    grammar += 'rule = ABC / XYZ\n';
    grammar += 'ABC  = A BC\n';
    grammar += 'A    = "a"\n';
    grammar += 'BC   = "bc"\n';
    grammar += 'XYZ  = X YZ\n';
    grammar += 'X    = "x"\n';
    grammar += 'YZ   = "yz"\n';
    flags = '';
    exp = new apgExp(grammar, flags);
    console.log();
    console.log('Demonstrate replacing matched phrases.');
    console.log();
    console.log(`  grammar: ${exp.source}`);
    str = '---abc---xyz---ABC---';
    console.log('        : simple replacement of a single match');
    console.log(`   flags: '${exp.flags}'`);
    console.log(`   input: ${str}`);
    restr = exp.replace(str, 'replace abc with this');
    console.log(`replaced: ${restr}`);

    flags = 'g';
    exp = new apgExp(grammar, flags);
    console.log();
    console.log('        : global replacement of all matches');
    console.log(`   flags: '${exp.flags}'`);
    console.log(`   input: ${str}`);
    restr = exp.replace(str, '555');
    console.log(`replaced: ${restr}`);

    flags = '';
    str = '<<<abc>>>';
    patternString = "$'---$`";
    exp = new apgExp(grammar, flags);
    console.log();
    console.log("        : use 'pattern' string replacement");
    console.log(`   flags: '${exp.flags}'`);
    console.log(`   input: ${str}`);
    console.log(` pattern: ${patternString}`);
    restr = exp.replace(str, patternString);
    console.log(`replaced: ${restr}`);

    flags = '';
    patternString = '${BC}';
    exp = new apgExp(grammar, flags);
    console.log();
    console.log("        : use rule 'pattern' string replacement");
    console.log(`   flags: '${exp.flags}'`);
    console.log(`   input: ${str}`);
    console.log(` pattern: ${patternString}`);
    restr = exp.replace(str, patternString);
    console.log(`replaced: ${restr}`);

    flags = '';
    const patternFunc = function patternFunc(result, expArg) {
      let a;
      let bc;
      let restrr;
      if (result.rules.ABC) {
        a = result.rules.A[0].phrase;
        bc = result.rules.BC[0].phrase;
        restrr = bc + a;
      } else if (expArg['${XYZ}']) {
        a = expArg['${X}'];
        bc = expArg['${YZ}'];
        restrr = bc + a;
      }
      return restrr;
    };
    exp = new apgExp(grammar, flags);
    console.log();
    console.log('        : function replacement - manipulate matched sub-rules for string replacement');
    console.log(`   flags: '${exp.flags}'`);
    console.log(`   input: ${str}`);
    restr = exp.replace(str, patternFunc);
    console.log(`replaced: ${restr}`);
    str = '---xyz---';
    console.log(`   input: ${str}`);
    restr = exp.replace(str, patternFunc);
    console.log(`replaced: ${restr}`);

    flags = 'u';
    exp = new apgExp(grammar, flags);
    console.log();
    console.log("        : can't do replace with the unicode, 'u', flag set");
    console.log(`   flags: '${exp.flags}'`);
    console.log(`   input: ${str}`);
    restr = exp.replace(str, '555');
  } catch (e) {
    console.log(`EXCEPTION: ${e.message}`);
  }
})();
