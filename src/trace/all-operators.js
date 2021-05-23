/*  *************************************************************************************
 *   copyright: Copyright (c) 2021 Lowell D. Thomas, all rights reserved
 *     license: BSD-2-Clause (https://opensource.org/licenses/BSD-2-Clause)
 *   ********************************************************************************* */
// This demonstrates how to trace *all* parse tree nodes.
// It is usually more information than you need to find a problem.
(function allOperators() {
  const setup = require('./setup');
  const { apgLib } = require('apg-js');
  // eslint-disable-next-line new-cap
  const trace = new apgLib.trace();

  let number;
  trace.filter.operators['<ALL>'] = true;
  number = ';ornament number\n';
  number += '\u2768555\u2769888\u20129999\n';
  setup(trace, number, 'all-operators');
})();
