/* eslint-disable func-names */
/* eslint-disable new-cap */
/* eslint-disable no-undef */
/*  *************************************************************************************
 *   copyright: Copyright (c) 2021 Lowell D. Thomas, all rights reserved
 *     license: BSD-2-Clause (https://opensource.org/licenses/BSD-2-Clause)
 *   ********************************************************************************* */
// This is a demonstration of the bare minimum needed to set up a parser
// and parse a given input string.
//
// It is the same "`simple`" example but modified to use `apgLib.js` and run in a browser web page.
// It works with the companion file `browser.html`.
const setup = function setup() {
  let htmlResult;
  let htmlStats;
  let htmlTrace;
  const doStats = true;
  const doTrace = true;
  try {
    // Get the apg library. The variable `apgLib` has references to all of the library objects
    // and object contructors.<br>
    // **NOTE:** the variable `apgLib` (= `window.apgLib`) has been defined in `apgLib-min.js`.
    //
    // Create a parser object. This gets further definition later with the
    // `grammar` object, the `stats` and `trace` objects and the callback function references.
    const parser = new apgLib.parser();
    // The `grammar` object defines the SABNF grammar the parser will use to
    // parse an input string.
    // `phone-number.js` is the output of `apg` for the SABNF grammar
    // defined by the `phone-number.bnf` file.
    const grammar = new grammarObject();
    // These identifiers are used by the callback functions to identify the state of the parser
    // at the time the callback function was called.
    const id = apgLib.ids;
    // The utility library in `apg-lib` has a number of utility functions that are often helpful, even essential
    // for handling string, character codes, HTML display of results and other things.
    const { utils } = apgLib;
    if (doStats) {
      // This creates a `stats` object and attaches it to the parser. When attached,
      // the parser will initialize the object and collect parsing statistics with it
      // for each parse tree node it visits.
      parser.stats = new apgLib.stats();
    }
    if (doTrace) {
      // This creates a `trace` object and attaches it to the parser. When attached,
      // the parser will initialize the object and collect tracing records
      // for each parse tree node it visits
      // (see the `./src/trace` example for details on filtering the records).
      parser.trace = new apgLib.trace();
    }
    // The next four variables define the parser callback functions for the rule name phrases we are interested in.
    // Callback functions are optional and can be defined for all or none of the rule names
    // defined by the SABNF grammar.
    // Normally, these will be defined in a module of their own to keep the flow of the application clean,
    // but are included here to keep things simple.
    // The callback function arguments are:
    // - *result* - communicates the parsing results to and from the callback functions
    // (see the `parser.parse()` function in `apg-lib` for a complete description).
    // Here only `result.state` and `result.phraseLength` are of interest.
    // - *chars* - the array of character codes for the input string being parsed.
    // - *phraseIndex* - index to the first character in *chars* of the phrase the parser is attempting to match
    // - *data* - an optional user data object passed to `parser.parse()` by the user.
    // For callback function use only. The parser never modifies or uses this in any way.
    //
    // For the `phoneNumber()` function, a general case is displayed. In general,
    // a callback function may want to respond to all of the parser states.
    // - *ACTIVE* indicates that the parser is visiting this node on the way down the parse tree.
    // At this point there is no matched phrase - it is not even known whether a phrase will be matched or not.
    // - *EMPTY* indicates that the parser is visiting this node on the way up the parse tree and an empty phrase has been matched.
    // - *MATCH* indicates that the parser is visiting this node on the way up the parse tree
    // and a phrase of `result.phraseLength` (\> 0) has been matched.
    // - *NOMATCH* indicates that the parser is visiting this node on the way up the parse tree
    // and the parser failed to match any phrase at all.
    //
    // For these functions, it is assumed that *data* is an array that they will use to collect the matched phrases in.
    // (See `let phoneParts` below.)
    const phoneNumber = function (result, chars, phraseIndex, data) {
      switch (result.state) {
        case id.ACTIVE:
          if (Array.isArray(data) === false) {
            throw new Error("parser's user data must be an array");
          }
          data.length = 0;
          break;
        /* the following cases not used in this example */
        case id.EMPTY:
          break;
        case id.MATCH:
          break;
        case id.NOMATCH:
          break;
        default:
          throw new Error('unrecognized state');
      }
    };
    const areaCode = function (result, chars, phraseIndex, data) {
      if (result.state === id.MATCH) {
        /* capture the area code */
        data['area-code'] = utils.charsToString(chars, phraseIndex, result.phraseLength);
      }
    };
    const office = function (result, chars, phraseIndex, data) {
      if (result.state === id.MATCH) {
        /* capture the 3-digit central office or exchange number */
        data.office = utils.charsToString(chars, phraseIndex, result.phraseLength);
      }
    };
    const subscriber = function (result, chars, phraseIndex, data) {
      if (result.state === id.MATCH) {
        /* capture the 4-digit subscriber number */
        data.subscriber = utils.charsToString(chars, phraseIndex, result.phraseLength);
      }
    };
    // Define which rules the parser will call callback functions for.
    parser.callbacks['phone-number'] = phoneNumber;
    parser.callbacks['area-code'] = areaCode;
    parser.callbacks.office = office;
    parser.callbacks.subscriber = subscriber;
    /* use a hard-coded input string for this example */
    const inputString = $('#string').val();
    /* convert string to character codes */
    const inputCharacterCodes = utils.stringToChars(inputString);
    /* set the parser's "start rule" */
    const startRule = 'phone-number';
    /* the callback function's *data* */
    const phoneParts = [];
    // This is the call that will finally parse the input string.
    const result = parser.parse(grammar, startRule, inputCharacterCodes, phoneParts);
    /* display parser results */
    htmlResult = '';
    htmlResult += '<h3>Parser Result</h3>';
    htmlResult += apgLib.utils.parserResultToHtml(result);
    if (result.success) {
      /* display phone number parts, captured as matched phrases in the callback functions */
      htmlResult += '<pre>';
      htmlResult += `phone number: ${inputString}`;
      htmlResult += '&#10;';
      htmlResult += `   area-code: ${phoneParts['area-code']}`;
      htmlResult += '&#10;';
      htmlResult += `      office: ${phoneParts.office}`;
      htmlResult += '&#10;';
      htmlResult += `  subscriber: ${phoneParts.subscriber}`;
      htmlResult += '&#10;';
      htmlResult += '</pre>';
      $('#result').html(htmlResult);
    } else {
      $('#result').html(htmlResult);
      return;
    }
    if (doStats) {
      // This section will demonstrate all of the options for the display of the
      // parsing statistics. Finally, all options will be displayed
      // on a single web page. See the page `html/simple-stats.html` for the results.
      htmlStats = '';
      htmlStats += parser.stats.toHtml('ops', 'ops-only stats');
      htmlStats += parser.stats.toHtml('index', 'rules ordered by index');
      htmlStats += parser.stats.toHtml('alpha', 'rules ordered alphabetically');
      htmlStats += parser.stats.toHtml('hits', 'rules ordered by hit count');
      $('#tabs-stats').html(htmlStats);
    }

    if (doTrace) {
      // This section will demonstrate the display of the
      // parser's trace.
      // See the page `html/simple-trace.html` for the results.
      htmlTrace = parser.trace.toHtmlPage('ascii', 'good phone number, default trace');
      $('#tabs-trace').html(htmlTrace);
    }
  } catch (e) {
    let msg = 'EXCEPTION THROWN: ';
    if (e instanceof Error) {
      msg += `${e.name}: ${e.message}`;
    } else if (typeof e === 'string') {
      msg += e;
    } else {
      msg += 'unknown';
    }
    $('#result').html(msg);
  }
};
$(document).ready(() => {
  const con = new grammarObject();
  $('#grammar-bnf').html(con.toString());
  $('#parse').click(setup);
  $('#string').val('(850)555-4567');
  $('#tabs').tabs();
});
