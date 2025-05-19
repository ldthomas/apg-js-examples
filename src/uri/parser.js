/* eslint-disable new-cap */
/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
/*  *************************************************************************************
 *   copyright: Copyright (c) 2025 Lowell D. Thomas, all rights reserved
 *     license: BSD-2-Clause (https://opensource.org/licenses/BSD-2-Clause)
 *   ********************************************************************************* */
// This module illustrates a complete and well-tested URI parser.
//

const { devNull } = require('node:os');

// - *input* - the input string to parse
module.exports = function parser(input) {
  /* note: if trace or stats are needed they must be set by hand here */
  const trace = false;
  const stats = false;
  const thisFileName = 'setup.js: ';
  const nodeUtil = require('node:util');
  const writeHtml = require('../writeHtml');
  const inspectOptions = {
    showHidden: true,
    depth: devNull,
  };

  /* Get the required parser components */
  const { apgLib } = require('apg-js');
  const parser = new apgLib.parser();
  const grammar = new (require('./grammar'))();
  if (trace) {
    parser.trace = new apgLib.trace();
  }
  if (stats) {
    parser.stats = new apgLib.stats();
  }

  /* Define the syntax callback functions to the parser. */
  const cb = require('./callbacks');
  parser.callbacks.URI = cb.URI;
  parser.callbacks.scheme = cb.scheme;
  parser.callbacks['userinfo-at'] = cb.userinfoAt;
  parser.callbacks.host = cb.host;
  parser.callbacks['IP-literal'] = cb.ipLiteral;
  parser.callbacks.port = cb.port;
  parser.callbacks['path-abempty'] = cb.pathAbempty;
  parser.callbacks['path-absolute'] = cb.pathAbsolute;
  parser.callbacks['path-rootless'] = cb.pathRootless;
  parser.callbacks['path-empty'] = cb.pathEmpty;
  parser.callbacks.query = cb.query;
  parser.callbacks.fragment = cb.fragment;
  parser.callbacks.h16 = cb.h16;
  parser.callbacks.nodcolon = cb.nodcolon;
  parser.callbacks.dcolon = cb.dcolon;
  parser.callbacks['dec-octet'] = cb.decOctet;
  parser.callbacks['dec-digit'] = cb.decDigit;

  const inputCharacterCodes = apgLib.utils.stringToChars(input);

  /* object to hold error messages from the syntax callback functions */
  const data = { uriElements: {} };

  /*
        Parse the input string. The syntax callback functions simply
        monitor the parser, reporting any syntax errors it finds in the input string.
        */
  const result = parser.parse(grammar, 0, inputCharacterCodes, data);
  console.log();
  console.log("the parser's results");
  console.dir(result, inspectOptions);
  if (result.success !== true) {
    throw new Error(`${thisFileName}parse failed`);
  }
  console.log();
  console.log('URI elements');
  console.dir(data.uriElements, inspectOptions);
  let html;
  if (parser.stats !== null) {
    html = parser.stats.toHtmlPage('hits', 'rules ordered by hit count', 'IniFile Stats');
    writeHtml(html, 'ini-file-stats');
  }
  if (parser.trace !== null) {
    /* Display the trace, if requested */
    html = parser.trace.toHtmlPage('ascii', 'IniFile Trace', 'IniFile Trace');
    writeHtml(html, 'ini-file-trace');
  }
};
