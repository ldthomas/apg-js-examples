/*  *************************************************************************************
 *   copyright: Copyright (c) 2021 Lowell D. Thomas, all rights reserved
 *     license: BSD-2-Clause (https://opensource.org/licenses/BSD-2-Clause)
 *     website: https://sabnf.com/
 *   ***********************************************************************************/
module.exports = function (args) {
    "use strict";

    /* display the program arguments */
    console.log("execute-rule args");
    console.dir(args);

    /* the help screen */
    let desc = "";
    desc += 'The "execute-rule" example is a demonstration of how to call a UDT or rule name\n';
    desc += "from a call back function.\n";
    desc +=
        'Examine or run a debugger on this module, "apg-js-examples/src/execute-rule/main.js" to study the example.\n';
    let help = "";
    help += "Usage: npm run execute-rule [-- arg]\n";
    help += "  arg: help (or no arg) to display this help screen.\n";
    help += "       rule demonstrates executing a rule (RNM operator) from a UDT call back function\n";
    help += "       udt  demonstrates executing a UDT operator from a rule callback function\n";
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
        case "rule":
            require("./more-app.js");
            break;
        case "udt":
            require("./colors-app.js");
            break;
        default:
            console.log(`unrecognized argument: ${args[0]}`);
            console.log(help);
            return;
    }
};
