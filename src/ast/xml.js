/*  *************************************************************************************
 *   copyright: Copyright (c) 2021 Lowell D. Thomas, all rights reserved
 *     license: BSD-2-Clause (https://opensource.org/licenses/BSD-2-Clause)
 *     website: https://sabnf.com/
 *   ***********************************************************************************/
// Parse the input string and get the `AST` object.
var setup = require("./setup.js");
var ast = setup();
// Convert the `AST` to `XML` format and display it on the console.
var xml = ast.toXml();
console.log();
console.log("test: display AST in XML");
console.log(xml);
