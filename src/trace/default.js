/*  *************************************************************************************
 *   copyright: Copyright (c) 2021 Lowell D. Thomas, all rights reserved
 *     license: BSD-2-Clause (https://opensource.org/licenses/BSD-2-Clause)
 *     website: https://sabnf.com/
 *   ***********************************************************************************/
// This is the default trace filtering. It includes all rule and `UDT` names and excludes all other operator nodes.
(function () {
    "use strict";
    let setup = require("./setup.js");
    let trace = new (require("apg-lib").trace)();
    let number;
    number = "(555)888-9999\n";
    setup(trace, number, "default");
})();
