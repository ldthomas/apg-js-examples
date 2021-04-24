/*  *************************************************************************************
 *   copyright: Copyright (c) 2021 Lowell D. Thomas, all rights reserved
 *     license: BSD-2-Clause (https://opensource.org/licenses/BSD-2-Clause)
 *     website: https://sabnf.com/
 *   ***********************************************************************************/
// This is a demonstration of the look behind operators && and !!.
module.exports = function (args) {
    "use strict";

    /* display the program arguments */
    console.log("look-behind args");
    console.dir(args);

    /* the help screen */
    let desc = "";
    desc += 'The "look-behind" example demonstrates the use of the look behind operators, && and !!\n';
    desc +=
        'Examine or run a debugger on this module, "apg-js-examples/src/look-behind/main.js" to study the example.\n';
    let help = "";
    help += "Usage: npm run look-behind [-- arg]\n";
    help += "  arg: help       (or no arg) to display this help screen.\n";
    help += "       boundaries using look-behind to define word and line boundaries\n";
    help += "       comment    a cautionary example of using rules in look behind\n";
    help += "       negative   a simple example of using !!\n";
    help += "       positive   a simple example of using &&\n";
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
        case "boundaries":
            require("./boundaries.js");
            break;
        case "comment":
            require("./comment.js");
            break;
        case "negative":
            require("./negative.js");
            break;
        case "positive":
            require("./positive.js");
            break;
        default:
            console.log(`unrecognized argument: ${args[0]}`);
            console.log(help);
            return;
    }
};
