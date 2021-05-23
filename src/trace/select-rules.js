/*  *************************************************************************************
 *   copyright: Copyright (c) 2021 Lowell D. Thomas, all rights reserved
 *     license: BSD-2-Clause (https://opensource.org/licenses/BSD-2-Clause)
 *   ********************************************************************************* */
// Here is how to selectively limit the view to some, but not all rule name operators.
// When any one is named specifically, as here, all of those not named default to `false`.
(function selectRules() {
  const setup = require('./setup');
  const { apgLib } = require('apg-js');
  // eslint-disable-next-line new-cap
  const trace = new apgLib.trace();
  trace.filter.rules['phone-number'] = true;
  trace.filter.rules.prefix = true;
  trace.filter.rules.area = true;
  trace.filter.rules.u_office = true;
  trace.filter.rules.subscriber = true;
  const number = ';select rules\n;ornament number\n\u2768555\u2769888\u20129999\n';
  setup(trace, number, 'select-rules');
})();
