/*  *************************************************************************************
 *   copyright: Copyright (c) 2021 Lowell D. Thomas, all rights reserved
 *     license: BSD-2-Clause (https://opensource.org/licenses/BSD-2-Clause)
 *     website: https://sabnf.com/
 *   ***********************************************************************************/
// Same as the `bad-input.js` example, except that
// the parse is trace is displayed on a web page.
(function () {
    let fs = require("fs");
    let setup = require("./setup.js");
    let apgLib = require("apg-js").apgLib;
    let trace = new apgLib.trace();
    let stats = new apgLib.stats();
    try {
        /* Configure the trace rule name filter */
        trace.filter.rules["alpha"] = false;
        trace.filter.rules["alphadigit"] = false;
        trace.filter.rules["any"] = false;
        trace.filter.rules["badblankline"] = true;
        trace.filter.rules["badsectionline"] = true;
        trace.filter.rules["badvalueline"] = true;
        trace.filter.rules["blankline"] = true;
        trace.filter.rules["comment"] = false;
        trace.filter.rules["digit"] = false;
        trace.filter.rules["dquotedstring"] = true;
        trace.filter.rules["goodblankline"] = true;
        trace.filter.rules["goodsectionline"] = true;
        trace.filter.rules["goodvalueline"] = true;
        trace.filter.rules["inifile"] = true;
        trace.filter.rules["keyname"] = true;
        trace.filter.rules["lineend"] = false;
        trace.filter.rules["section"] = false;
        trace.filter.rules["sectionline"] = true;
        trace.filter.rules["sectionname"] = true;
        trace.filter.rules["squotedstring"] = true;
        trace.filter.rules["value"] = true;
        trace.filter.rules["valuearray"] = true;
        trace.filter.rules["valueline"] = true;
        trace.filter.rules["wsp"] = false;
        let inputStr = fs.readFileSync("./src/ini-file/bad.txt", "utf8");
        setup(inputStr, trace, stats);
    } catch (e) {
        console.log();
        console.log("input error");
        console.dir(e, {
            showHidden: true,
            depth: null,
            colors: true,
        });
    }
})();
