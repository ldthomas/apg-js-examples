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
    console.log("example ast: args");
    console.dir(args);

    /* the help screen */
    let desc = "";
    desc += 'The "ast" example is a demonstration of using the parser to generate an\n';
    desc += "Abstract Syntax Tree (AST). The AST is used to translate the input string\n";
    desc += "and it is converted to XML format.\n";
    let help = "";
    help += "Usage: npm run ast [-- arg]\n";
    help += "  arg: help      (or no arg) to display this help screen.\n";
    help += "       translate translate the input string with the AST.\n";
    help += "       xml       convert the AST to XML format.\n";
    if (!args[0]) {
        /* display the help screen and exit */
        console.log(desc);
        console.log(help);
        return;
    }
    switch (args[0]) {
        case "help":
            console.log(help);
            return;
        case "translate":
            console.log(help);
            break;
        case "xml":
            console.log(help);
            break;
        default:
            console.log(`unrecognized argument: ${args[0]}`);
            console.log(help);
            return;
    }

    let nodeUtil = require("util");
    let fs = require("fs");
    let inspectOptions = {
        showHidden: true,
        depth: null,
    };
    try {
        // Acquire the required parser components.
        let grammar = new (require("./phone-number.js"))();
        let apgJs = require("apg-js");
        let apgLib = apgJs.apgLib;
        let parser = new apgLib.parser();
        // Construct an `AST` object and attach it to the parser.
        parser.ast = new apgLib.ast();
        let id = apgLib.ids;
        // The `AST` translating callback functions. These are similar to the parsers syntax callback functions
        // in that they are each called twice, once down the tree and once up the tree, with matched phrase information.
        // With the `AST`, however, the matched phrase is known in the down direction as well as up.
        // - *state* - `SEM_PRE` (down) or `SEM_POST` (up)
        // - *chars* - the array of character codes for the entire input string.
        // - *phraseIndex* - the index in *chars* of the first character of the matched phrase
        // - *phraseLength* - the number of characters in the matched phrase
        // - *data* - the user's optional data object, passed to the translator when it is called
        // - *return value* - normally `SEM_OK`. Can also be `SEM_SKIP` in the `SEM_PRE`
        // state to skip the translation of the branch below the current node.
        let phoneNumber = function (state, chars, phraseIndex, phraseLength, data) {
            let ret = id.SEM_OK;
            if (state == id.SEM_PRE) {
                if (Array.isArray(data) === false) {
                    throw new Error("parser's user data must be an array");
                }
                data.length = 0;
            } else if (state == id.SEM_POST) {
                /* not used in this example */
            }
            return ret;
        };
        let areaCode = function (state, chars, phraseIndex, phraseLength, data) {
            let ret = id.SEM_OK;
            if (state == id.SEM_PRE) {
                data["area-code"] = apgLib.utils.charsToString(chars, phraseIndex, phraseLength);
            } else if (state == id.SEM_POST) {
                /* not used in this example */
            }
            return ret;
        };
        let office = function (state, chars, phraseIndex, phraseLength, data) {
            let ret = id.SEM_OK;
            if (state == id.SEM_PRE) {
                data["office"] = apgLib.utils.charsToString(chars, phraseIndex, phraseLength);
            } else if (state == id.SEM_POST) {
                /* not used in this example */
            }
            return ret;
        };
        let subscriber = function (state, chars, phraseIndex, phraseLength, data) {
            let ret = id.SEM_OK;
            if (state == id.SEM_PRE) {
                data["subscriber"] = apgLib.utils.charsToString(chars, phraseIndex, phraseLength);
            } else if (state == id.SEM_POST) {
                /* not used in this example */
            }
            return ret;
        };
        parser.ast.callbacks["phone-number"] = phoneNumber;
        parser.ast.callbacks["area-code"] = areaCode;
        parser.ast.callbacks["office"] = office;
        parser.ast.callbacks["subscriber"] = subscriber;
        /* use a hard coded input string */
        let inputString = "xxxx(555)234-5678xxxx";
        let inputCharacterCodes = apgLib.utils.stringToChars(inputString);
        let startRule = "phone-number";
        /* parse the string here, generating an `AST` */
        let result = parser.parseSubstring(grammar, startRule, inputCharacterCodes, 4, 13);
        console.log();
        console.log("the parser's results");
        console.dir(result, inspectOptions);
        if (result.success === false) {
            throw new Error("input string: '" + inputString + "' : parse failed");
        }
        // Return the `AST` object for further processing.
        if (args[0] === "translate") {
            let phoneParts = [];
            parser.ast.translate(phoneParts);
            console.log();
            console.log("test: translate AST");
            console.log("phone number: ");
            console.log("   area-code: " + phoneParts["area-code"]);
            console.log("      office: " + phoneParts["office"]);
            console.log("  subscriber: " + phoneParts["subscriber"]);
        } else if (args[0] === "xml") {
            let xml = parser.ast.toXml();
            console.log();
            console.log("test: display AST in XML");
            console.log(xml);
        }
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
