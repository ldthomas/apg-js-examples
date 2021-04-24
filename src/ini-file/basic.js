/*  *************************************************************************************
 *   copyright: Copyright (c) 2021 Lowell D. Thomas, all rights reserved
 *     license: BSD-2-Clause (https://opensource.org/licenses/BSD-2-Clause)
 *     website: https://sabnf.com/
 *   ***********************************************************************************/
// This application will read an initialization file with anonymous keys, disjointed sections
// and disjointed keys.
// It will collect the key values in each section found and then display the found data
// alphabetizing the section names and the key names within each section.
(function () {
    let fs = require("fs");
    let setup = require("./setup.js");
    try {
        let inputStr = fs.readFileSync("./src/ini-file/basic.txt", "utf8");
        setup(inputStr, null, null);
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
