/*  *************************************************************************************
 *   copyright: Copyright (c) 2021 Lowell D. Thomas, all rights reserved
 *     license: BSD-2-Clause (https://opensource.org/licenses/BSD-2-Clause)
 *     website: https://sabnf.com/
 *   ***********************************************************************************/
// This is a demonstration of the bare minimum needed to set up a parser
// and parse a given input string.
module.exports = function (args) {
    "use strict";

    /* display the program arguments */
    console.log("apg-lib args");
    console.dir(args);

    /* the help screen */
    let desc = "";
    desc += 'The "apg-lib" example is a simple demonstration using of the JavaScript APG library, apg-lib.\n';
    desc += "It is also a demonstration of the basics of creating and using a JavaScript APG parser.\n";
    desc += "A simple phone number grammar is used to parse an input phone number string.\n";
    desc += "It defines and uses callback functions and generates statistics and a trace of the parse tree.\n";
    desc += 'Examine or run a debugger on this module, "apg-examples/src/apg-lib/main.js", to study the example.\n';
    desc += "\n";
    desc += "The ABNF grammar is in the file phone-number.bnf. The grammar object, phone-number.js\n";
    desc += "can be regenerated with:\n";
    desc += "npm run apg -- -i src/apg-lib/phone-number.bnf -o src/apg-lib/phone-number\n";
    desc += "\n";
    desc += "Note that for web page usage, the generated grammar function needs to be renamed. e.g.\n";
    desc += "npm run apg -- -i src/apg-lib/phone-number.bnf -o src/apg-lib/web-phone-number -n grammarObject\n";
    desc += "\n";
    let help = "Usage: npm run simple [-- arg]\n";
    help += "       or\n";
    help += "       ./src/apg-lib/main.sh [arg]\n";
    help += "  arg: help - (or no arg) to display this help screen.\n";
    help += '       go   - (or any other argument other than "help") to parse a phone number.\n';
    if (!args[0]) {
        /* display the description and help screen and exit */
        console.log(desc);
        console.log(help);
        return;
    }
    if (args[0] === "help") {
        /* display the help screen and exit */
        console.log(help);
        return;
    }

    let nodeUtil = require("util");
    let fs = require("fs");
    let inspectOptions = {
        showHidden: true,
        depth: null,
    };
    let doStats = true;
    let doTrace = true;
    try {
        // Get the apg library. The variable `apgLib` has references to all of the library objects
        // and object contructors.
        let apgLib = require("apg-js").apgLib;

        // Create a parser object. This gets further definition later with the
        // `grammar` object, the `stats` and `trace` objects and the callback function references.
        let parser = new apgLib.parser();

        // The `grammar` object defines the SABNF grammar the parser will use to
        // parse an input string.
        // `phone-number.js` is the output of `apg` for the SABNF grammar
        // defined by the `./phone-number.bnf` file.
        let obj = require("./phone-number.js");
        let grammar = new obj();

        // These identifiers are used by the callback functions to identify the state of the parser
        // at the time the callback function was called.
        let id = apgLib.ids;
        // This creates a `stats` object and attaches it to the parser. When attached,
        // the parser will initialize the object and collect parsing statistics with it
        // for each parse tree node it visits.
        if (doStats) {
            parser.stats = new apgLib.stats();
        }
        // This creates a `trace` object and attaches it to the parser. When attached,
        // the parser will initialize the object and collect tracing records
        // for each parse tree node it visits
        // (see the `./src/trace` example for details on filtering the records).
        if (doTrace) {
            parser.trace = new apgLib.trace();
        }

        // The utility library in `apg-lib` has a number of utility functions that are often helpful, even essential
        // for handling string, character codes, HTML display of results and other things.
        let utils = apgLib.utils;

        // The next four variables define the parser callback functions for the rule name phrases we are interested in.
        // Callback functions are optional and can be defined for all or none of the rule names
        // defined by the SABNF grammar.
        // Normally, these will be defined in a module of their own to keep the flow of the application clean,
        // but are included here to keep things simple.
        //The callback function arguments are:
        // - *result* - communicates the parsing results to and from the callback functions
        // (see the `parser.parse()` function in `apg-lib` for a complete description).
        // Here only `result.state` and `result.phraseLength` are of interest.
        // - *chars* - the array of character codes for the input string being parsed.
        // - *phraseIndex* - index to the first character in *chars* of the phrase the parser is attempting to match
        // - *data* - an optional user data object passed to `parser.parse()` by the user.
        // For callback function use only. The parser never modifies or uses this in any way.
        let phoneNumber = function (result, chars, phraseIndex, data) {
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
            }
        };

        let areaCode = function (result, chars, phraseIndex, data) {
            if (result.state === id.MATCH) {
                /* capture the area code */
                data["area-code"] = utils.charsToString(chars, phraseIndex, result.phraseLength);
            }
        };
        let office = function (result, chars, phraseIndex, data) {
            if (result.state === id.MATCH) {
                /* capture the 3-digit central office or exchange number */
                data["office"] = utils.charsToString(chars, phraseIndex, result.phraseLength);
            }
        };
        let subscriber = function (result, chars, phraseIndex, data) {
            if (result.state === id.MATCH) {
                /* capture the 4-digit subscriber number */
                data["subscriber"] = utils.charsToString(chars, phraseIndex, result.phraseLength);
            }
        };

        // Define which rules the parser will call callback functions for.
        // (*NOTE: the generated grammar object,
        // `phone-number.js` in this case, will have a pre-defined `callbacks` array for all rule names.*)
        parser.callbacks["phone-number"] = phoneNumber;
        parser.callbacks["area-code"] = areaCode;
        parser.callbacks["office"] = office;
        parser.callbacks["subscriber"] = subscriber;

        /* use a hard-coded input string for this example */
        let inputString = "(555)234-5678";

        /* convert string to character codes */
        let inputCharacterCodes = utils.stringToChars(inputString);

        /* set the parser's "start rule" */
        let startRule = "phone-number";

        /* the callback function's *data* */
        let phoneParts = [];

        // This is the call that will finally parse the input string.
        let result = parser.parse(grammar, startRule, inputCharacterCodes, phoneParts);

        /* display parser results */
        console.log();
        console.log("the parser's results");
        console.dir(result, inspectOptions);
        if (result.success === false) {
            throw new Error("input string: '" + inputString + "' : parse failed");
        }

        /* display phone number parts, captured as matched phrases in the callback functions */
        console.log();
        console.log("phone number: " + inputString);
        console.log("   area-code: " + phoneParts["area-code"]);
        console.log("      office: " + phoneParts["office"]);
        console.log("  subscriber: " + phoneParts["subscriber"]);
        console.log();
        let dir = process.cwd() + "/output";
        if (doStats) {
            // This section will demonstrate all of the options for the display of the
            // parsing statistics. Finally, all options will be displayed
            // on a single web page. See the page `html/simple-stats.html` for the results.
            let html = "";
            html += parser.stats.toHtml("ops", "ops-only stats");
            html += parser.stats.toHtml("index", "rules ordered by index");
            html += parser.stats.toHtml("alpha", "rules ordered alphabetically");
            html += parser.stats.toHtml("hits", "rules ordered by hit count");
            let name = dir + "/simple-stats.html";
            try {
                fs.mkdirSync(dir);
            } catch (e) {
                if (e.code !== "EEXIST") {
                    throw new Error("fs.mkdir failed: " + e.message);
                }
            }
            html = utils.htmlToPage(html, "simple-stats");
            fs.writeFileSync(name, html);
            console.log('view "' + name + '" in any browser to display parsing statistics');
        }

        if (doTrace) {
            // This section will demonstrate the display of the
            // parser's trace.
            // See the page `html/simple-trace.html` for the results.
            let html = parser.trace.toHtmlPage("ascii", "good phone number, default trace");
            let name = dir + "/simple-trace.html";
            try {
                fs.mkdirSync(dir);
            } catch (e) {
                if (e.code !== "EEXIST") {
                    throw new Error("fs.mkdir failed: " + e.message);
                }
            }
            fs.writeFileSync(name, html);
            console.log('view "' + name + "\" in any browser to display parser's trace");
        }
    } catch (e) {
        let msg = "\nEXCEPTION THROWN: \n";
        if (e instanceof Error) {
            msg += e.name + ": " + e.message;
        } else if (typeof e === "string") {
            msg += e;
        } else {
            msg += nodeUtil.inspect(e, inspectOptions);
        }
        console.log(msg);
        throw e;
    }
};
