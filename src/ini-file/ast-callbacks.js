/* eslint-disable func-names */
/* eslint-disable no-restricted-syntax */
/*  *************************************************************************************
 *   copyright: Copyright (c) 2021 Lowell D. Thomas, all rights reserved
 *     license: BSD-2-Clause (https://opensource.org/licenses/BSD-2-Clause)
 *   ********************************************************************************* */
// This module defines the `AST` translation callback functions functions. This is where the real work is done
// manipulating the data gleaned from the INI file format.
module.exports = function astCallbacks() {
  const { apgLib } = require('apg-js');
  const id = apgLib.ids;
  let currentSection;
  let currentKey;
  // Find a specific named key in a section object.
  const findKey = function (keyname, section) {
    const lower = keyname.toLowerCase();
    for (const name in section) {
      if (name.toLowerCase() === lower) {
        return section[keyname];
      }
    }
    return undefined;
  };
  // Find a specific named section in a list of sections.
  const findSection = function (sectionname, sections) {
    const lower = sectionname.toLowerCase();
    for (const name in sections) {
      if (name.toLowerCase() === lower) {
        return sections[sectionname];
      }
    }
    return undefined;
  };
  // Initialize the collection data object.
  function astIniFile(state, chars, phraseIndex, phraseLength, data) {
    const ret = id.SEM_OK;
    if (state === id.SEM_PRE) {
      currentSection = {};
      data[0] = currentSection;
      currentKey = undefined;
    }
    return ret;
  }
  // Collect key name and as set it the current key object.
  function astKeyName(state, chars, phraseIndex, phraseLength) {
    const ret = id.SEM_OK;
    if (state === id.SEM_PRE) {
      const name = apgLib.utils.charsToString(chars, phraseIndex, phraseLength);
      currentKey = findKey(name, currentSection);
      if (currentKey === undefined) {
        currentKey = [];
        currentSection[name] = currentKey;
      }
    }
    return ret;
  }
  // Collect section name and as set it the current section object.
  function astSectionName(state, chars, phraseIndex, phraseLength, data) {
    const ret = id.SEM_OK;
    if (state === id.SEM_PRE) {
      const name = apgLib.utils.charsToString(chars, phraseIndex, phraseLength);
      currentSection = findSection(name, data);
      if (currentSection === undefined) {
        currentSection = {};
        data[name] = currentSection;
      }
    }
    return ret;
  }
  // Push a value into the current key object.
  function astValue(state, chars, phraseIndex, phraseLength) {
    const ret = id.SEM_OK;
    if (state === id.SEM_PRE) {
      const value = apgLib.utils.charsToString(chars, phraseIndex, phraseLength);
      currentKey.push(value);
    }
    return ret;
  }
  // Define all of the callback functions that will be used.
  this.callbacks = [];
  this.callbacks.alpha = false;
  this.callbacks.alphadigit = false;
  this.callbacks.any = false;
  this.callbacks.badblankline = false;
  this.callbacks.badsectionline = false;
  this.callbacks.badvalueline = false;
  this.callbacks.blankline = false;
  this.callbacks.comment = false;
  this.callbacks.digit = false;
  this.callbacks.dquotedstring = false;
  this.callbacks.goodblankline = false;
  this.callbacks.goodsectionline = false;
  this.callbacks.goodvalueline = false;
  this.callbacks.inifile = astIniFile;
  this.callbacks.keyname = astKeyName;
  this.callbacks.lineend = false;
  this.callbacks.section = false;
  this.callbacks.sectionline = false;
  this.callbacks.sectionname = astSectionName;
  this.callbacks.squotedstring = false;
  this.callbacks.value = astValue;
  this.callbacks.valuearray = false;
  this.callbacks.valueline = false;
  this.callbacks.wsp = false;
};
