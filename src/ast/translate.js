/*  *************************************************************************************
 *   copyright: Copyright (c) 2021 Lowell D. Thomas, all rights reserved
 *     license: BSD-2-Clause (https://opensource.org/licenses/BSD-2-Clause)
 *   ********************************************************************************* */
// Parse the input string and get the `AST` object.
const setup = require('./setup');

const ast = setup();
// Call the translator, passing in the user data object to collect phone number parts.
// Translates the `AST` with the callback functions defined in `setup.js`.
const phoneParts = [];
ast.translate(phoneParts);
console.log();
console.log('test: translate AST');
console.log('phone number: ');
console.log(`   area-code: ${phoneParts['area-code']}`);
console.log(`      office: ${phoneParts.office}`);
console.log(`  subscriber: ${phoneParts.subscriber}`);
