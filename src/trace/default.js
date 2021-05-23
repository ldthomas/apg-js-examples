/*  *************************************************************************************
 *   copyright: Copyright (c) 2021 Lowell D. Thomas, all rights reserved
 *     license: BSD-2-Clause (https://opensource.org/licenses/BSD-2-Clause)
 *   ********************************************************************************* */
// This is the default trace filtering. It includes all rule and `UDT` names and excludes all other operator nodes.
(function defaultFunc() {
  const setup = require('./setup');
  const { apgLib } = require('apg-js');
  // eslint-disable-next-line new-cap
  const trace = new apgLib.trace();
  const number = '(555)888-9999\n';
  setup(trace, number, 'default');
})();
