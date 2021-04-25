/*  *************************************************************************************
 *   copyright: Copyright (c) 2021 Lowell D. Thomas, all rights reserved
 *     license: BSD-2-Clause (https://opensource.org/licenses/BSD-2-Clause)
 *     website: https://sabnf.com/
 *   ***********************************************************************************/
// Demonstration of using User-Defined Terminals (UDTs).
// That is, hand-written code snippets for matching specific phrases.
module.exports = function (args) {
    "use strict";

    /* display the program arguments */
    console.log("udt args");
    console.dir(args);

    /* the help screen */
    let desc = "";
    desc += 'The "udt" example demonstrates the use of User-Defined Terminals (UDTs)\n';
    desc += "in the SABNF grammar.\n";
    desc += "Examine or run a debugger on this module,\n";
    desc += '"apg-js-examples/src/udt/main.js", to study the example.\n';
    let help = "";
    help += "Usage: npm run udt [-- arg]\n";
    help += "  arg: help    (or no arg) to display this help screen.\n";
    help += "       minimal minimal procedures for setting up a parser for a grammar with UDTs\n";
    help += "       stats   minimal with statistics generated\n";
    help += "       trace   minimal with trace generated\n";
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
        case "minimal":
            require("./minimal.js");
            break;
        case "stats":
            require("./stats.js");
            break;
        case "trace":
            require("./trace.js");
            break;
        default:
            console.log(`unrecognized argument: ${args[0]}`);
            console.log(help);
            return;
    }
};
