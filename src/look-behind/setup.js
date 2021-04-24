/*  *************************************************************************************
 *   copyright: Copyright (c) 2021 Lowell D. Thomas, all rights reserved
 *     license: BSD-2-Clause (https://opensource.org/licenses/BSD-2-Clause)
 *     website: https://sabnf.com/
 *   ***********************************************************************************/
// General execution module for the substring examples.
module.exports = function (input, grammar, name) {
    "use strict";
    let nodeUtil = require("util");
    let opts = {
        showHidden: true,
        depth: null,
    };
    // Quick and dirty conversion of ascii chars to HTML format.
    // Needed for HTML display of grammars that contain HTML entity characters.
    let charsToHtml = function (chars) {
        let html = "";
        chars.forEach(function (char) {
            switch (char) {
                case 32:
                    html += "&nbsp;";
                    break;
                case 38:
                    html += "&#38;";
                    break;
                case 39:
                    html += "&#39;";
                    break;
                case 60:
                    html += "&#60;";
                    break;
                case 62:
                    html += "&#62;";
                    break;
                case 92:
                    html += "&#92;";
                    break;
                default:
                    html += String.fromCharCode(char);
            }
        });
        return html;
    };
    try {
        let html = "";
        let chars;
        let apgLib = require("apg-js").apgLib;
        let writeHtml = require("../writeHtml.js");
        let parser = new apgLib.parser();
        parser.trace = new apgLib.trace();
        parser.trace.filter.operators["<ALL>"] = true;
        let id = apgLib.ids;

        /* parse the input string */
        let result = parser.parse(grammar, 0, input);

        /* output info to console */
        console.log();
        console.log("     input: " + input);
        console.log("   results:");
        console.dir(result, opts);

        /* put input, results and trace on HTML page */
        html += "<h3>Grammar Source</h3>";
        html += "<pre>";
        chars = apgLib.utils.stringToChars(grammar.toString());
        html += charsToHtml(chars);
        html += "</pre>";
        html += "<h3>Input String</h3>";
        html += "<pre>";
        chars = apgLib.utils.stringToChars(input);
        html += apgLib.utils.charsToAsciiHtml(chars);
        html += "</pre>";
        html += apgLib.utils.parserResultToHtml(result);
        html += parser.trace.toHtml();
        html = apgLib.utils.htmlToPage(html);
        writeHtml(html, name);
    } catch (e) {
        let msg = "\nEXCEPTION THROWN: ";
        +"\n";
        if (e instanceof Error) {
            msg += e.name + ": " + e.message;
        } else if (typeof e === "string") {
            msg += e;
        } else {
            msg += nodeUtil.inspect(e, opts);
        }
        process.exitCode = 1;
        console.log(msg);
        throw e;
    }
};
