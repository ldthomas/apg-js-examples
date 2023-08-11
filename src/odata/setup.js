/*  *************************************************************************************
 *   copyright: Copyright (c) 2021 Lowell D. Thomas, all rights reserved
 *     license: BSD-2-Clause (https://opensource.org/licenses/BSD-2-Clause)
 *   ********************************************************************************* */
// This module provides all of the set up common to all tests.
//  - a universal callback function is provided to check each rule against a map of rule constraints
//  - the parser object is constructed
//  - the grammar object is constructed
//  - a trace object is contructed for the trace test which will trace ALL rules and operators
//  - a map of contraints - that is, some rules allow only a fixed set of strings to be matched
//  - the universal callback function is assigned to every rule
module.exports = function setup() {
  /* get all the "require"d modules */
  const fs = require('node:fs');
  const { apgLib } = require('apg-js');
  const GrammarCtor = require('./odata-grammar');
  const { parser: ParserCtor, ids, utils, trace: TraceCtor } = apgLib;
  const fileName = './src/odata/odata-abnf-testcases.json';

  /* the callback function to match constraints to rules */
  const universalCallback = function universalCallback(result, chars, phraseIndex, userData) {
    if (result.state === ids.MATCH) {
      userData.rulesTouched[result.ruleIndex] = true;
      const value = userData.map.get(result.ruleIndex);
      if (value) {
        const phrase = utils.charsToString(chars, phraseIndex, result.phraseLength);
        const found = value.find((element) => element === phrase);
        if (!found) {
          if (userData.trace) {
            console.log(
              `=> universalCallback[${result.ruleIndex}]: phrase "${phrase}" not found in mapped list of phrases for this rule`
            );
          }
          result.state = ids.NOMATCH;
          result.phraseLength = 0;
        }
      }
    }
  };
  try {
    /* read the JSON tests and parse into a JSON object */
    const data = fs.readFileSync(fileName);
    const tests = JSON.parse(data.toString());

    /* construct the parser, grammar and trace objects */
    const odataParser = new ParserCtor();
    const odataGrammar = new GrammarCtor();
    const odataTrace = new TraceCtor();

    /* trace all rules and operators */
    odataTrace.filter.rules['<ALL>'] = true;
    odataTrace.filter.operators['<ALL>'] = true;

    /* set a call back for every rule */
    /* note that only callbacks for mapped rules are needed, but we are going to keep track of all rules that are touched */
    odataGrammar.rules.forEach((rule) => {
      odataParser.callbacks[rule.lower] = universalCallback;
    });

    /* create the map of constraints */
    const map = new Map();
    tests.constraints.forEach((c) => {
      const key = parseInt(c.ruleId, 10);
      const value = [];
      c.match.forEach((s) => {
        value.push(s);
      });
      map.set(key, value);
    });

    /* return the necessary setup info to the example functions */
    return { odataParser, odataTrace, odataGrammar, utils, tests, map };
  } catch (e) {
    console.log('setup error');
    console.log(e.message);
    return {};
  }
};
