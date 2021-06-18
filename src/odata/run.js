/*  *************************************************************************************
 *   copyright: Copyright (c) 2021 Lowell D. Thomas, all rights reserved
 *     license: BSD-2-Clause (https://opensource.org/licenses/BSD-2-Clause)
 *   ********************************************************************************* */
// This module runs the actual tests.
module.exports = function valid(testToDo, testIdToTrace) {
  const thisFileName = 'run.js';

  /* get the setup data */
  const { utils, odataParser, odataTrace, odataGrammar, tests, map } = require('./setup')();
  let inputString;
  let inputCharacterCodes;
  const outputFile = './output/odata-trace.html';
  let startRule;
  let result;
  let successCount = 0;
  let failCount = 0;
  let totalCount = 0;

  /* initialize arrays (to undefined) to count the rules that are tested and touched */
  const rulesTested = [];
  const rulesTouched = [];
  rulesTested.length = odataGrammar.rules.length;
  rulesTouched.length = odataGrammar.rules.length;

  /* test all functions that are supposed to succeed */
  const validFunc = function validFunc() {
    tests.valid.forEach((test) => {
      inputString = test.input;
      inputCharacterCodes = utils.stringToChars(inputString);
      startRule = test.rule;
      rulesTested[test.ruleId] = true;
      result = odataParser.parse(odataGrammar, startRule, inputCharacterCodes, { map, rulesTouched, trace: false });
      if (result.success === false) {
        console.log(`valid input test ID ${test.ID} unexpectedly failed`);
        failCount += 1;
      } else {
        successCount += 1;
      }
      totalCount += 1;
    });
  };

  /* test all functions that are supposed to fail */
  const invalidFunc = function invalidFunc() {
    tests.invalid.forEach((test) => {
      inputString = test.input;
      inputCharacterCodes = utils.stringToChars(inputString);
      startRule = test.rule;
      rulesTested[test.ruleId] = true;
      result = odataParser.parse(odataGrammar, startRule, inputCharacterCodes, { map, rulesTouched, trace: false });
      if (result.success === false) {
        successCount += 1;
      } else {
        console.log(`invalid input test ID ${test.ID} unexpectedly succeeded`);
        failCount += 1;
      }
      totalCount += 1;
    });
  };

  /* display total hits, successes and failures */
  const totals = function totals() {
    console.log(`${totalCount} tests, ${successCount} successful, ${failCount} unsuccessful`);
    let covered = 0;
    rulesTested.forEach((rule) => {
      if (rule) covered += 1;
    });
    let touched = 0;
    rulesTouched.forEach((rule) => {
      if (rule) touched += 1;
    });
    const pctCovered = (covered / rulesTested.length) * 100;
    console.log(`rules total: ${rulesTested.length} rules tested: ${covered} (${pctCovered.toFixed(2)}%)`);
    const pctTouched = (touched / rulesTouched.length) * 100;
    console.log(`rules total: ${rulesTested.length} rules touched: ${touched} (${pctTouched.toFixed(2)}%)`);
  };
  if (testToDo === 'valid') {
    validFunc();
    totals();
  } else if (testToDo === 'invalid') {
    invalidFunc();
    totals();
  } else if (testToDo === 'all') {
    validFunc();
    invalidFunc();
    totals();
  } else if (testToDo === 'trace') {
    /* parse only a single test with tracing. */
    const all = tests.valid.concat(tests.invalid);
    for (let i = 0; i < all.length; i += 1) {
      const test = all[i];
      if (test.ID === testIdToTrace) {
        inputString = test.input;
        inputCharacterCodes = utils.stringToChars(inputString);
        startRule = test.rule;
        console.log(`TRACING test ID: ${test.ID}: ruleId: ${test.ruleId}: rule name: ${test.rule}`);
        if (typeof odataTrace === 'object' && odataTrace.traceObject === 'traceObject') {
          odataParser.trace = odataTrace;
        } else {
          throw new Error(`${thisFileName}valid trace object required`);
        }
        odataParser.parse(odataGrammar, startRule, inputCharacterCodes, { map, rulesTouched, trace: true });
        const html = odataTrace.toHtml('ascii', 'OData', 'OData');
        const fs = require('fs');
        fs.writeFileSync(outputFile, html);
        console.log(`TRACE OUTPUT: ${outputFile}`);
        break;
      }
    }
  }
};
