/*  *************************************************************************************
 *   copyright: Copyright (c) 2021 Lowell D. Thomas, all rights reserved
 *     license: BSD-2-Clause (https://opensource.org/licenses/BSD-2-Clause)
 *   ********************************************************************************* */
// `apg` parsers provide an optional tracing facility which is essentially the "debugger".
// When something is going wrong with either the grammar or the string being parsed,
// the trace gives a step-by-step picture of how the parser is operating.
// Using the debug flag, `d`, will make the trace also available to
// `apg-exp` and a simple demonstration of that is given here.
//
// This example assumes that you are already familiar with the trace object in `apg` parsers.
// If not, check out the trace examples to get started.
// We will use the floating point grammar and turn on the tracing facility to
// have a look at how the parser operates.
(function trace() {
  try {
    const { apgExp: ApgExp, apgLib } = require('apg-js');
    const writeHtml = require('../writeHtml');
    const grammar = new (require('./grammars/float'))();

    // let apgJs = require("apg-js");
    // let apgExp = apgJs.apgExp;
    // let apgLib = apgJs.apgLib;
    let exp;
    let result;
    let str;
    let html;
    str = '';
    str += '|||123.0e-10|||';
    console.log();
    console.log('input string:');
    console.log(str);
    const flags = 'd';
    exp = new ApgExp(grammar, flags);
    // By default, the trace will show only the rule name operators.
    result = exp.exec(str);
    console.log();
    console.log(`result[0]: default trace: ${result[0]}`);
    html = '';
    html += '<h3>grammar source</h3>\n';
    html += exp.sourceToHtml();
    html += '<h3>input string</h3>\n';
    html += `<pre>${str}</pre>\n`;
    html += '<h3>the matched phrase</h3>\n';
    html += `<pre>${result[0]}</pre>\n`;
    html += '<h3>the default trace configuration (all rule names, no operators) </h3>\n';
    html += exp.trace.toHtml();
    html += '<h3> trace configured to display ALL steps taken </h3>\n';
    exp = new ApgExp(grammar, flags);
    // For anything other than the default, the trace object needs to be configured prior to calling exp.exec().
    exp.trace.filter.operators['<all>'] = true;
    result = exp.exec(str);
    console.log();
    console.log(`result[0]: configured trace: ${result[0]}`);
    html += exp.trace.toHtml();
    /* finally, write the HTML page */
    const page = apgLib.utils.htmlToPage(html);
    const htmlName = 'trace';
    writeHtml(page, htmlName);
  } catch (e) {
    console.log(`EXCEPTION: ${e.message}`);
  }
})();
