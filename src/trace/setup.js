/*  *************************************************************************************
 *   copyright: Copyright (c) 2021 Lowell D. Thomas, all rights reserved
 *     license: BSD-2-Clause (https://opensource.org/licenses/BSD-2-Clause)
 *     website: https://sabnf.com/
 *   ***********************************************************************************/
// This module demonstrates how to control the output of the parser's tracing facility.
// (See the [`apg-lib`](https://github.com/ldthomas/apg-js2-lib) `trace.js` documentation for a lengthy discussion of tracing.
// Here we will just concentrate on how to filter the trace records.
// This module is the basic parser set up.
// - *trace* - the trace object. It will be constructed and the filter's set in individual demonstrations
// and passed into this general parser.
// - *phoneNumber* - the input string, a phone number in this case.
// - *name* - a unique name to identify the HTML page associated with each test
module.exports = function (trace, phoneNumber, name) {
    "use strict";
    let thisFileName = "setup.js: ";
    let nodeUtil = require("util");
    let inspectOptions = {
        showHidden: true,
        depth: null,
    };
    try {
        let apgLib = require("apg-js").apgLib;
        let writeHtml = require("../writeHtml.js");
        let parser = new apgLib.parser();
        let grammar = new (require("./fancy-number.js"))();
        let id = apgLib.ids;

        // The u_office(), hand-written UDT.
        parser.callbacks["u_office"] = function (result, chars, phraseIndex, data) {
            let matchFound = false;
            while (true) {
                if (chars + phraseIndex + 3 <= chars.length) {
                    /* not three digits left in the string */
                    break;
                }
                let dig1 = chars[phraseIndex];
                let dig2 = chars[phraseIndex + 1];
                let dig3 = chars[phraseIndex + 2];
                if (dig1 < 50 || dig1 > 57) {
                    /* first digit must be in range 2-9 */
                    break;
                }
                if (dig2 < 48 || dig2 > 57 || dig3 < 48 || dig3 > 57) {
                    /* second & third digits must be in range 0-9 */
                    break;
                }
                if (dig2 === 49 && dig3 === 49) {
                    /* if the second digit is "1" then the third digit cannot also be "1" */
                    throw new Error("UDT u_office: digits 2 and 3 cannot both be 1");
                    break;
                }
                matchFound = true;
                break;
            }
            if (matchFound === true) {
                result.state = id.MATCH;
                result.phraseLength = 3;
            } else {
                result.state = id.NOMATCH;
                result.phraseLength = 0;
            }
        };
        let inputCharacterCodes;
        if (typeof trace === "object" && trace.traceObject === "traceObject") {
            parser.trace = trace;
        } else {
            throw new Error(thisFileName + "valid trace object required");
        }
        if (typeof phoneNumber === "string") {
            inputCharacterCodes = apgLib.utils.stringToChars(phoneNumber);
        } else if (Array.isArray(phoneNumber) && typeof (phoneNumber[0] === "number")) {
            inputCharacterCodes = phoneNumber;
        } else {
            throw new Error(thisFileName + "input phoneNumber must be string or array of integers");
        }
        if (typeof name !== "string") {
            name = "default";
        }
        let result = parser.parse(grammar, 0, inputCharacterCodes);
        console.log();
        console.log("parser input:");
        console.log(phoneNumber);
        console.log();
        console.log("parser results");
        console.dir(result, inspectOptions);
        let html;

        // Display the trace in ASCII format.
        html = parser.trace.toHtml("ascii", "ASCII display");

        // Display the trace in hexidecimal format.
        html += parser.trace.toHtml("hex", "hexidecimal display");

        // Display the trace in decimal format.
        html += parser.trace.toHtml("dec", "decimal display");

        // Display the trace in unicode format.
        html += parser.trace.toHtml("uni", "UNICODE display");
        html = apgLib.utils.htmlToPage(html, name);
        writeHtml(html, name);
    } catch (e) {
        let msg = "\nEXCEPTION THROWN:\n";
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
