/*  *************************************************************************************
 *   copyright: Copyright (c) 2021 Lowell D. Thomas, all rights reserved
 *     license: BSD-2-Clause (https://opensource.org/licenses/BSD-2-Clause)
 *     website: https://sabnf.com/
 *   ***********************************************************************************/
// Demonstrates configuring and using the trace facility.
module.exports = function (args) {
    "use strict";

    /* display the program arguments */
    console.log("trace args");
    console.dir(args);

    /* the help screen */
    let desc = "";
    desc += 'The "trace" example demonstrates tracing the parser\n';
    desc += "as it moves from node to node through the parse tree.\n";
    desc += "It serves as the primary debugging tool for finding errors.\n";
    desc += "Errors may be due to an incorrectly written SABNF grammar or,\n";
    desc += "if the grammar is known to be correct, in the input string.\n";
    desc += "Examine or run a debugger on this module,\n";
    desc += '"apg-js-examples/src/trace/main.js", to study the example.\n';
    let help = "";
    help += "Usage: npm run trace [-- arg]\n";
    help += "  arg: help             (or no arg) to display this help screen.\n";
    help += "       default          by default all rule names and no other operators are traced\n";
    help += "       all              demonstrate tracing ALL operators\n";
    help += "       limited-lines    demonstrate how to limit the number of lines in the trace\n";
    help += "       select-rules     demonstrate how to trace only a selected set of rule names\n";
    help += "       select-operators demonstrate how to trace only a selected set of non-rule operators\n";
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
        case "default":
            require("./default.js");
            break;
        case "all":
            require("./all-operators.js");
            break;
        case "limited-lines":
            require("./limited-lines.js");
            break;
        case "select-rules":
            require("./select-rules.js");
            break;
        case "select-operators":
            require("./select-operators.js");
            break;
        default:
            console.log(`unrecognized argument: ${args[0]}`);
            console.log(help);
            return;
    }
};
