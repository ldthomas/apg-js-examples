/* eslint-disable new-cap */
/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
/*  *************************************************************************************
 *   copyright: Copyright (c) 2025 Lowell D. Thomas, all rights reserved
 *     license: BSD-2-Clause (https://opensource.org/licenses/BSD-2-Clause)
 *   ********************************************************************************* */
// This module illustrates a complete and well-tested URI parser.
//

module.exports = function parser(input) {
  /* if trace or statisctis are needed they must be enabled here */
  const TRACE_ENABLED = false;
  const STATS_ENABLED = false;
  const THIS_FILE = 'parser.js: ';

  // Initialize parser and grammar
  const { apgLib } = require('apg-js');
  const parser = new apgLib.parser();
  const grammar = new (require('./grammar'))();

  if (TRACE_ENABLED) parser.trace = new apgLib.trace();
  if (STATS_ENABLED) parser.stats = new apgLib.stats();

  // Register callbacks
  const cb = require('./callbacks');
  Object.assign(parser.callbacks, {
    URI: cb.URI,
    scheme: cb.scheme,
    'userinfo-at': cb.userinfoAt,
    host: cb.host,
    'IP-literal': cb.ipLiteral,
    port: cb.port,
    'path-abempty': cb.pathAbempty,
    'path-absolute': cb.pathAbsolute,
    'path-rootless': cb.pathRootless,
    'path-empty': cb.pathEmpty,
    query: cb.query,
    fragment: cb.fragment,
    h16: cb.h16,
    nodcolon: cb.nodcolon,
    dcolon: cb.dcolon,
    'dec-octet': cb.decOctet,
    'dec-digit': cb.decDigit,
  });

  // Convert input to character codes
  const inputCharacterCodes = apgLib.utils.stringToChars(input);

  // Data object for parse state and results
  const data = { uriElements: {} };

  // Parse input
  const result = parser.parse(grammar, 0, inputCharacterCodes, data);

  if (!result.success) {
    console.log('\nparse failed');
    console.dir(result);
    throw new Error(`${THIS_FILE}parse failed`);
  }

  console.log();
  console.log(`URI ${data.uri}`);
  console.log('URI elements');
  console.dir(data.uriElements);

  if (parser.stats) {
    const writeHtml = require('../writeHtml');
    const html = parser.stats.toHtmlPage('hits', 'rules ordered by hit count', 'URI parser Stats');
    writeHtml(html, 'uri-stats');
  }
  if (parser.trace) {
    const writeHtml = require('../writeHtml');
    const html = parser.trace.toHtmlPage('ascii', 'IniFile Trace', 'URI parser Trace');
    writeHtml(html, 'uri-trace');
  }
};
