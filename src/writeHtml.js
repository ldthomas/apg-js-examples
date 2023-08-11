/*  *************************************************************************************
 *   copyright: Copyright (c) 2021 Lowell D. Thomas, all rights reserved
 *     license: BSD-2-Clause (https://opensource.org/licenses/BSD-2-Clause)
 *   ********************************************************************************* */
// This is a simple utility function used by many of the examples to write HTML output to a file that can be viewed in a browser.
// <ul>
// <li>
// <strong>html</strong> - a string with the HTML text to write
// </li>
// <li>
// <strong>name</strong> - the name of the file
// </li>
// <li>
// The file name will be "/current-working-diectory/output/name.html".<br>
// If the ./output directory does not exist, it will be created.
// </li>
// </ul>
module.exports = function writeHtml(html, name) {
  const fs = require('node:fs');
  const dir = `${process.cwd()}/output`;
  const htmlName = `${dir}/${name}.html`;
  try {
    fs.mkdirSync(dir);
  } catch (e) {
    if (e.code !== 'EEXIST') {
      throw new Error(`fs.mkdir failed: ${e.message}`);
    }
  }
  fs.writeFileSync(htmlName, html);
  console.log(`writeHtml.js: file written to: ${htmlName}`);
};
