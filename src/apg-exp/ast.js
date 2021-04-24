/*  *************************************************************************************
 *   copyright: Copyright (c) 2021 Lowell D. Thomas, all rights reserved
 *     license: BSD-2-Clause (https://opensource.org/licenses/BSD-2-Clause)
 *     website: https://sabnf.com/
 *   ***********************************************************************************/
// With recursive descent parsers, an Abstract Syntax Tree (AST) can be thought of as a subset of the full parse tree.
// Each node of the AST holds the phrase that was matched at the corresponding parse tree node.
// The AST is very useful for translating the parsed string.
// `apg` parsers generate ASTs and `apg-exp` uses the AST internally for all except the `test()` functions.
// Additionally, it always makes it available to the user as well.
//
// This example assumes that you are already familiar with the AST object in `apg` parsers.
// If not, check out the `./src/ast` examples to get started.
// We will use the floating point grammar and put the numbers in normal form as we did in the `./src/float` example
// except this time we will do it with a translation of the AST.
/* get some utility tools */
(function () {
    let apgJs = require("apg-js");
    let apgExp = apgJs.apgExp;
    let apgLib = apgJs.apgLib;
    let id = apgLib.ids;
    let charsToString = apgLib.utils.charsToString;
    /* define the AST callback functions */
    let astFloat = function (state, chars, phraseIndex, phraseLength, data) {
        let ret = id.SEM_OK;
        if (state == id.SEM_PRE) {
            /* set all values to default */
            data.sign = "";
            data.integer = "0";
            data.fraction = "0";
            data.esign = "+";
            data.exp = 0;
        } else if (state == id.SEM_POST) {
            /* compute the normalized form */
            let exponent = data.exp === 0 ? "" : "e" + data.esign + data.exp;
            data.normal = data.sign + data.integer + "." + data.fraction + exponent;
        }
        return ret;
    };
    let astSign = function (state, chars, phraseIndex, phraseLength, data) {
        let ret = id.SEM_OK;
        if (state == id.SEM_PRE) {
            if (chars[phraseIndex] === 45) {
                data.sign = "-";
            }
        } else if (state == id.SEM_POST) {
        }
        return ret;
    };
    let astInteger = function (state, chars, phraseIndex, phraseLength, data) {
        let ret = id.SEM_OK;
        if (state == id.SEM_PRE) {
            data.integer = charsToString(chars, phraseIndex, phraseLength);
        } else if (state == id.SEM_POST) {
        }
        return ret;
    };
    let astFraction = function (state, chars, phraseIndex, phraseLength, data) {
        let ret = id.SEM_OK;
        if (state == id.SEM_PRE) {
            data.fraction = charsToString(chars, phraseIndex, phraseLength);
        } else if (state == id.SEM_POST) {
        }
        return ret;
    };
    let astEsign = function (state, chars, phraseIndex, phraseLength, data) {
        let ret = id.SEM_OK;
        if (state == id.SEM_PRE) {
            data.esign = charsToString(chars, phraseIndex, phraseLength);
        } else if (state == id.SEM_POST) {
        }
        return ret;
    };
    let astExp = function (state, chars, phraseIndex, phraseLength, data) {
        let ret = id.SEM_OK;
        if (state == id.SEM_PRE) {
            let exp = charsToString(chars, phraseIndex, phraseLength);
            data.exp = parseInt(exp, 10);
        } else if (state == id.SEM_POST) {
        }
        return ret;
    };
    try {
        let writeHtml = require("../writeHtml.js");
        let grammar, exp, flags, result, str, html, page, htmlName;
        grammar = new (require("./grammars/float.js"))();
        str = "";
        str += "|||123|||123.|||.123|||-1.23|||+.123|||123.e2|||+.123E+1|||-123.123456789e-10|||";
        str += "123e0|||+1.23e-0|||-.123e-001|||123e-000|||";
        console.log();
        console.log("input string:");
        console.log(str);
        flags = "g";
        exp = new apgExp(grammar, flags);
        // The AST callback translation functions need to be configured before the call to exec().
        exp.ast.callbacks["float"] = astFloat;
        exp.ast.callbacks["sign"] = astSign;
        exp.ast.callbacks["integer"] = astInteger;
        exp.ast.callbacks["fraction"] = astFraction;
        exp.ast.callbacks["esign"] = astEsign;
        exp.ast.callbacks["exp"] = astExp;
        /* initialize the HTML output */
        html = "";
        html += "<h3>grammar source</h3>\n";
        html += exp.sourceToHtml();
        html += "<h3>input string</h3>\n";
        html += "<pre>" + str + "</pre>\n";
        html += "<h3>floating point numbers</h3>\n";
        html += '<table class="' + apgLib.style.CLASS_STATS + '">\n';
        html += "<tr><th>result[0]</th><th>normal form</th></tr>\n";
        console.log();
        console.log("apg-exp result:");
        let data = {};
        while (true) {
            result = exp.exec(str);
            if (result == null) {
                break;
            }
            exp.ast.translate(data);
            html += "<tr><td>" + result[0] + "</td><td>" + data.normal + "</td></tr>\n";
            console.log("result[0]: " + result[0] + " :normal form: " + data.normal);
        }
        html += "</table>\n";
        // Just for fun, let's also use the AST in a replacement function.
        let func = function (result, exp) {
            let data = {};
            exp.ast.translate(data);
            return data.normal;
        };
        str = exp.replace(str, func);
        console.log();
        console.log("replacement string:");
        console.log(str);
        console.log();
        html += "<h3>replacement function exp.replace()</h3>\n";
        html += "<pre>" + str + "</pre>\n";
        /* finally, write the HTML page */
        page = apgLib.utils.htmlToPage(html);
        htmlName = "ast";
        writeHtml(page, htmlName);
    } catch (e) {
        console.log("EXCEPTION: " + e.message);
    }
})();
