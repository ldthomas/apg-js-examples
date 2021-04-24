/*  *************************************************************************************
 *   copyright: Copyright (c) 2021 Lowell D. Thomas, all rights reserved
 *     license: BSD-2-Clause (https://opensource.org/licenses/BSD-2-Clause)
 *     website: https://sabnf.com/
 *   ***********************************************************************************/
// This module provides an example of how a more "real world" parser might be built.
// It parses the [INI file format](https://en.wikipedia.org/wiki/INI_file), commonly
// used as a configuration file for many types of applications.
// The grammar (ini-file.bnf) presented here includes "error productions".
// That is, rules are defined to catch errors in the configuration file format.
// This way, instead of simply having the parser fail on bad input (a very frustrating user experience)
// the application can provide callback functions to catch the errors and report them to the user.
//
// To keep things modular the syntax and `AST` callback functions are defined in separate modules,
// `parser-callbacks.js` and `ast-callbacks.js`, resectively,
// and "require()"ed by the application as needed.
//
// - *input* - the input string to parse
// - *trace* - if `true` display the trace
// - *stats* - if `true` display the stats
module.exports = function (input, trace, stats) {
    "use strict";
    let thisFileName = "setup.js: ";
    let nodeUtil = require("util");
    let writeHtml = require("../writeHtml.js");
    let inspectOptions = {
        showHidden: true,
        depth: null,
    };
    /* build an array of names (strings) and sort them alphabetically */
    let sortNames = function (obj) {
        let count = 0;
        let names = [];
        for (let name in obj) {
            count += 1;
            names.push(name);
        }
        return names.sort();
    };
    try {
        if (typeof input !== "string") {
            throw new Error(thisFileName + "invalid input string");
        }
        if (trace === null || typeof trace !== "object" || trace.traceObject !== "traceObject") {
            trace = null;
        }
        if (stats === null || typeof stats !== "object" || stats.statsObject !== "statsObject") {
            stats = null;
        }

        /* Get the required parser components (see [`simple/setup.js`](../simple/setup.html) for the basics of setting up the parser */
        let apgLib = require("apg-js").apgLib;
        let parser = new apgLib.parser();
        let grammar = new (require("./ini-file.js"))();
        let parserCallbacks = new (require("./parser-callbacks.js"))();
        let astCallbacks = new (require("./ast-callbacks.js"))();
        parser.ast = new apgLib.ast();

        /* Define the syntax callback functions to the parser. */
        parser.callbacks = parserCallbacks.callbacks;

        /* Define the semantic (`AST`) callback functions to the parser. */
        parser.ast.callbacks = astCallbacks.callbacks;
        parser.trace = trace;
        parser.stats = stats;
        let id = apgLib.ids;
        let inputCharacterCodes = apgLib.utils.stringToChars(input);

        /* object to hold error messages from the syntax callback functions */
        let syntaxData = {};

        /*
        Parse the input string. The syntax callback functions simply
        monitor the parser, reporting any syntax errors it finds in the input string.
        */
        let result = parser.parse(grammar, 0, inputCharacterCodes, syntaxData);
        console.log();
        console.log("the parser's results");
        console.dir(result, inspectOptions);
        if (result.success !== true) {
            throw new Error(thisFileName + "parse failed");
        }
        if (syntaxData.errors.length > 0) {
            console.log();
            console.log("syntax errors found:");
            syntaxData.errors.forEach(function (error) {
                console.log(error);
            });
        }
        let html, dir, pageName;
        if (parser.stats !== null) {
            html = parser.stats.toHtmlPage("hits", "rules ordered by hit count", "IniFile Stats");
            writeHtml(html, "ini-file-stats");
        }
        if (parser.trace !== null) {
            /* Display the trace, if requested */
            html = parser.trace.toHtmlPage("ascii", "IniFile Trace", "IniFile Trace");
            writeHtml(html, "ini-file-trace");
        }

        /* object to hold the parsed data */
        let data = {};

        /*
        The syntax is correct, so translate the ini file format data into a JSON-like object.
        Alphabetize the section names and the key names within each section and display on the console.
        */
        parser.ast.translate(data);
        console.log();
        console.log("alphabetized AST translation data:");
        console.log();
        let sectionNames = sortNames(data);
        sectionNames.forEach(function (sectionName) {
            if (sectionName !== "0") {
                console.log();
                console.log("[" + sectionName + "]");
            }
            let keys = sortNames(data[sectionName]);
            keys.forEach(function (keyName) {
                console.log(keyName + ": " + data[sectionName][keyName]);
            });
        });
    } catch (e) {
        let msg = "\nEXCEPTION THROWN: ";
        +"\n";
        if (e instanceof Error) {
            msg += e.name + ": " + e.message;
        } else if (typeof e === "string") {
            msg += e;
        } else {
            msg += nodeUtil.inspect(e, inspectOptions);
        }
        process.exitCode = 1;
        console.log(msg);
        throw e;
    }
};
