/* eslint-disable new-cap */
/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
/*  *************************************************************************************
 *   copyright: Copyright (c) 2025 Lowell D. Thomas, all rights reserved
 *     license: BSD-2-Clause (https://opensource.org/licenses/BSD-2-Clause)
 *   ********************************************************************************* */
// This module illustrates a complete and well-tested URI parser.
module.exports = function parser(input) {
  // If trace or statistics are needed they are available
  // but must be enabled here manually.
  const TRACE_ENABLED = false;
  const STATS_ENABLED = false;
  const THIS_FILE = 'parser.js: ';

  // Initialize parser and grammar.
  const { apgLib } = require('apg-js');
  const parser = new apgLib.parser();
  const grammar = new (require('./grammar'))();

  if (TRACE_ENABLED) {
    parser.trace = new apgLib.trace();
    parser.trace.filter.operators['<ALL>'] = true;
  }
  if (STATS_ENABLED) parser.stats = new apgLib.stats();

  // Register callbacks.
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
    IPv4address: cb.ipv4,
    h16: cb.h16,
    h16c: cb.h16,
    h16n: cb.h16,
    h16cn: cb.h16,
    nodcolon: cb.nodcolon,
    dcolon: cb.dcolon,
    'dec-octet': cb.decOctet,
    'dec-digit': cb.decDigit,
  });

  // Data object for parse state and URI elements.
  const data = { uriElements: {} };

  // Parse the input URI string.
  const result = parser.parse(grammar, 0, input, data);

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

  if (!result.success) {
    throw new Error(`${THIS_FILE}parse failed: ${JSON.stringify(result)}`);
  }

  // Return the parsed URI elements as an object.
  return data.uriElements;
};
