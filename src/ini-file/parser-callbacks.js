/* eslint-disable func-names */
/*  *************************************************************************************
 *   copyright: Copyright (c) 2021 Lowell D. Thomas, all rights reserved
 *     license: BSD-2-Clause (https://opensource.org/licenses/BSD-2-Clause)
 *   ********************************************************************************* */
// This module defines the syntax callback functions.
// Called by the parser during parsing or syntax analysis.
module.exports = function parserCallbacks() {
  const { apgLib } = require('apg-js');
  const id = apgLib.ids;
  const thisFileName = 'parser-callbacks.js: ';
  let msg = '';
  const synIniFile = function (result, chars, phraseIndex, data) {
    switch (result.state) {
      case id.ACTIVE:
        /* initialize the data object */
        data.errors = [];
        data.lineNo = 0;
        break;
      case id.EMPTY:
        break;
      case id.MATCH:
        break;
      case id.NOMATCH:
        break;
      default:
        throw new Error('unrecognized state');
    }
  };
  const synBadSectionLine = function (result, chars, phraseIndex, data) {
    const funcName = `${thisFileName}synBadSectionLine: `;
    switch (result.state) {
      case id.ACTIVE:
        break;
      case id.EMPTY:
        break;
      case id.MATCH:
        /* report this line of text as a section line error */
        msg = `${funcName}line no: ${data.lineNo}: bad section definition:\n`;
        msg += apgLib.utils.charsToString(chars, phraseIndex, result.phraseLength);
        data.errors.push(msg);
        break;
      case id.NOMATCH:
        break;
      default:
        throw new Error('unrecognized state');
    }
  };
  const synBadValueLine = function (result, chars, phraseIndex, data) {
    const funcName = `${thisFileName}synBadValueLine: `;
    switch (result.state) {
      case id.ACTIVE:
        break;
      case id.EMPTY:
        break;
      case id.MATCH:
        /* report this line of text as a vaLue line error */
        msg = `${funcName}line no: ${data.lineNo}: bad key/value definition:\n`;
        msg += apgLib.utils.charsToString(chars, phraseIndex, result.phraseLength);
        data.errors.push(msg);
        break;
      case id.NOMATCH:
        break;
      default:
        throw new Error('unrecognized state');
    }
  };
  const synBadBlankLine = function (result, chars, phraseIndex, data) {
    const funcName = `${thisFileName}synBadBlankLine: `;
    switch (result.state) {
      case id.ACTIVE:
        break;
      case id.EMPTY:
        break;
      case id.MATCH:
        /* report this line of text as a blank line error */
        msg = `${funcName}line no: ${data.lineNo}: blank lines only allowed to have white space and comments\n`;
        msg += apgLib.utils.charsToString(chars, phraseIndex, result.phraseLength);
        data.errors.push(msg);
        break;
      case id.NOMATCH:
        break;
      default:
        throw new Error('unrecognized state');
    }
  };
  const synLineEnd = function (result, chars, phraseIndex, data) {
    switch (result.state) {
      case id.ACTIVE:
        break;
      case id.EMPTY:
        break;
      case id.MATCH:
        /* count the lines */
        data.lineNo += 1;
        break;
      case id.NOMATCH:
        break;
      default:
        throw new Error('unrecognized state');
    }
  };
  // Define all of the callback functions that will be used.
  this.callbacks = [];
  this.callbacks.alpha = false;
  this.callbacks.alphadigit = false;
  this.callbacks.any = false;
  this.callbacks.badblankline = synBadBlankLine;
  this.callbacks.badsectionline = synBadSectionLine;
  this.callbacks.badvalueline = synBadValueLine;
  this.callbacks.blankline = false;
  this.callbacks.comment = false;
  this.callbacks.digit = false;
  this.callbacks.dquotedstring = false;
  this.callbacks.goodblankline = false;
  this.callbacks.goodsectionline = false;
  this.callbacks.goodvalueline = false;
  this.callbacks.inifile = synIniFile;
  this.callbacks.keyname = false;
  this.callbacks.lineend = synLineEnd;
  this.callbacks.section = false;
  this.callbacks.sectionline = false;
  this.callbacks.sectionname = false;
  this.callbacks.squotedstring = false;
  this.callbacks.value = false;
  this.callbacks.valuearray = false;
  this.callbacks.valueline = false;
  this.callbacks.wsp = false;
};
