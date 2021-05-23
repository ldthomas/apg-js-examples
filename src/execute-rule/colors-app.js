/* eslint-disable new-cap */
/*  *************************************************************************************
 *   copyright: Copyright (c) 2021 Lowell D. Thomas, all rights reserved
 *     license: BSD-2-Clause (https://opensource.org/licenses/BSD-2-Clause)
 *   ********************************************************************************* */
// This example demonstrates how to call a `UDT` from a rule name callback function.
// This is something you will probably never need to do and you might want to just skip over this example.
// Using this feature changes the grammar that the parser will recognize in unpredictable ways,
// unless you really, really know what you are doing and exactly how the `UDT` you are calling works.
// The only reason these examples are here, is to verify that the
// `evaluateRule()` and `evaluateUdt()` functions are working.
// And the only reason this feature exists at all is because there was a case at one time where
// I really wanted to use a `UDT` but I also really wanted some rule name nodes below it on the `AST`
// for easy translation. For completeness, `evaluateRule()` was added along with `evaluateUdt()`.
//
// There are actually three demonstrations here.
// - the first and most common case is that the syntax callback functions just monitor the parsing process without altering it.
// This might include looking for specific rules designed to locate errors, or tabulating data, or some other administrative activity.
// - in the second demonstration, the callback function actually alters the flow of the parser.
// In this case, it simply causes the parser to fail no matter what the input string is, correct or not.
// A more realistic use of this might be to examine two alternatives, both of which are correct syntactically,
// but reject one based on some type of semantic criteria.
// - in the third demonstration, the syntax callback alters the parsing process by ignoring the prescribed grammar
// altogether and matching phrases with available `UDT` functions.
//
// All three demonstrations are done and the traces of them displayed on a single web page for comparison
// of how the parser actually performed. For the basics of setting up and executing the parser
// see `setup.js`.
(function colorsApp() {
  const nodeUtil = require('util');
  const inspectOptions = {
    showHidden: true,
    depth: null,
  };
  try {
    let result;
    let inputString;
    let inputCharacterCodes;
    let html;
    const { apgLib } = require('apg-js');
    const grammar = new (require('./colors'))();
    const callbacks = require('./colors-callbacks');
    const writeHtml = require('../writeHtml');
    const fileName = 'colors-app';
    const parser = new apgLib.parser();

    /* set up the parser */
    parser.trace = new apgLib.trace();
    inputString = 'red,white,blue';
    inputCharacterCodes = apgLib.utils.stringToChars(inputString);
    const startRule = 0;

    /* define the callback fuctions for demo one */
    parser.callbacks.start = callbacks.startCallback;
    parser.callbacks.u_blue = callbacks.u_blueCallback;
    parser.callbacks.u_red = callbacks.u_redCallback;
    parser.callbacks.u_white = callbacks.u_whiteCallback;
    parser.callbacks.u_yellow = callbacks.u_yellowCallback;
    // In this case, the `color` callback function just monitors the parser's flow without altering it.
    // The input string is parsed and the trace saved for later display on a web page.
    // (See `colors-callbacks.js` for the callback functions.)
    const data = [];
    parser.callbacks.color = callbacks.monitorCallback;
    result = parser.parse(grammar, startRule, inputCharacterCodes, data);
    console.log();
    console.log('the monitor callback results');
    console.dir(result, inspectOptions);
    html = parser.trace.toHtml(null, 'monitor callback');
    // In this case, the `color` callback function actually modifies the parsing process
    // by returning a non-`ACTIVE` state. The action in this case is to always fail,
    // which is simply to demonstrate how modification from a syntax callback function can be done.
    parser.callbacks.color = callbacks.modifyCallback;
    result = parser.parse(grammar, startRule, inputCharacterCodes, data);
    console.log();
    console.log('the modify callback results');
    console.dir(result, inspectOptions);
    html += parser.trace.toHtml(null, 'modify callback');
    // In this case the `color` callback function modifies the parsing process by calling a `UDT` function to do its work.
    // In addition to accepting the colors red, white and blue, it uses a `UDT` to accept yellow as well.
    inputString = 'red,white,blue,yellow';
    inputCharacterCodes = apgLib.utils.stringToChars(inputString);
    parser.callbacks.color = callbacks.callUdtCallback;
    result = parser.parse(grammar, startRule, inputCharacterCodes, data);
    console.log();
    console.log('the evaluateUdt() callback results');
    console.dir(result, inspectOptions);
    html += parser.trace.toHtml('ascii', 'evaluateUdt() callback');
    html = apgLib.utils.htmlToPage(html, 'colors app');
    writeHtml(html, fileName);
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
})();
