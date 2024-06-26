// copyright: Copyright (c) 2024 Lowell D. Thomas, all rights reserved<br>
//   license: BSD-2-Clause (https://opensource.org/licenses/BSD-2-Clause)<br>
//
// Generated by apg-js, Version 4.4.0 [apg-js](https://github.com/ldthomas/apg-js)
module.exports = function grammar(){
  // ```
  // SUMMARY
  //      rules = 15
  //       udts = 1
  //    opcodes = 57
  //        ---   ABNF original opcodes
  //        ALT = 3
  //        CAT = 8
  //        REP = 5
  //        RNM = 20
  //        TLS = 4
  //        TBS = 10
  //        TRG = 4
  //        ---   SABNF superset opcodes
  //        UDT = 3
  //        AND = 0
  //        NOT = 0
  //        BKA = 0
  //        BKN = 0
  //        BKR = 0
  //        ABG = 0
  //        AEN = 0
  // characters = [9 - 10091] + user defined
  // ```
  /* OBJECT IDENTIFIER (for internal parser use) */
  this.grammarObject = 'grammarObject';

  /* RULES */
  this.rules = [];
  this.rules[0] = { name: 'phone-number', lower: 'phone-number', index: 0, isBkr: false };
  this.rules[1] = { name: 'prefix', lower: 'prefix', index: 1, isBkr: false };
  this.rules[2] = { name: 'blank-line', lower: 'blank-line', index: 2, isBkr: false };
  this.rules[3] = { name: 'comment', lower: 'comment', index: 3, isBkr: false };
  this.rules[4] = { name: 'any', lower: 'any', index: 4, isBkr: false };
  this.rules[5] = { name: 'phone-line', lower: 'phone-line', index: 5, isBkr: false };
  this.rules[6] = { name: 'regular-number', lower: 'regular-number', index: 6, isBkr: false };
  this.rules[7] = { name: 'ornament-number', lower: 'ornament-number', index: 7, isBkr: false };
  this.rules[8] = { name: 'heavy-number', lower: 'heavy-number', index: 8, isBkr: false };
  this.rules[9] = { name: 'area', lower: 'area', index: 9, isBkr: false };
  this.rules[10] = { name: 'subscriber', lower: 'subscriber', index: 10, isBkr: false };
  this.rules[11] = { name: 'gt-2', lower: 'gt-2', index: 11, isBkr: false };
  this.rules[12] = { name: 'not-9', lower: 'not-9', index: 12, isBkr: false };
  this.rules[13] = { name: 'digit', lower: 'digit', index: 13, isBkr: false };
  this.rules[14] = { name: 'line-end', lower: 'line-end', index: 14, isBkr: false };

  /* UDTS */
  this.udts = [];
  this.udts[0] = { name: 'u_office', lower: 'u_office', index: 0, empty: false, isBkr: false };

  /* OPCODES */
  /* phone-number */
  this.rules[0].opcodes = [];
  this.rules[0].opcodes[0] = { type: 2, children: [1,2] };// CAT
  this.rules[0].opcodes[1] = { type: 4, index: 1 };// RNM(prefix)
  this.rules[0].opcodes[2] = { type: 4, index: 5 };// RNM(phone-line)

  /* prefix */
  this.rules[1].opcodes = [];
  this.rules[1].opcodes[0] = { type: 3, min: 0, max: Infinity };// REP
  this.rules[1].opcodes[1] = { type: 4, index: 2 };// RNM(blank-line)

  /* blank-line */
  this.rules[2].opcodes = [];
  this.rules[2].opcodes[0] = { type: 2, children: [1,5,7] };// CAT
  this.rules[2].opcodes[1] = { type: 3, min: 0, max: Infinity };// REP
  this.rules[2].opcodes[2] = { type: 1, children: [3,4] };// ALT
  this.rules[2].opcodes[3] = { type: 6, string: [32] };// TBS
  this.rules[2].opcodes[4] = { type: 6, string: [9] };// TBS
  this.rules[2].opcodes[5] = { type: 3, min: 0, max: 1 };// REP
  this.rules[2].opcodes[6] = { type: 4, index: 3 };// RNM(comment)
  this.rules[2].opcodes[7] = { type: 4, index: 14 };// RNM(line-end)

  /* comment */
  this.rules[3].opcodes = [];
  this.rules[3].opcodes[0] = { type: 2, children: [1,2] };// CAT
  this.rules[3].opcodes[1] = { type: 7, string: [59] };// TLS
  this.rules[3].opcodes[2] = { type: 3, min: 0, max: Infinity };// REP
  this.rules[3].opcodes[3] = { type: 4, index: 4 };// RNM(any)

  /* any */
  this.rules[4].opcodes = [];
  this.rules[4].opcodes[0] = { type: 1, children: [1,2] };// ALT
  this.rules[4].opcodes[1] = { type: 5, min: 32, max: 126 };// TRG
  this.rules[4].opcodes[2] = { type: 6, string: [9] };// TBS

  /* phone-line */
  this.rules[5].opcodes = [];
  this.rules[5].opcodes[0] = { type: 2, children: [1,5] };// CAT
  this.rules[5].opcodes[1] = { type: 1, children: [2,3,4] };// ALT
  this.rules[5].opcodes[2] = { type: 4, index: 6 };// RNM(regular-number)
  this.rules[5].opcodes[3] = { type: 4, index: 7 };// RNM(ornament-number)
  this.rules[5].opcodes[4] = { type: 4, index: 8 };// RNM(heavy-number)
  this.rules[5].opcodes[5] = { type: 4, index: 14 };// RNM(line-end)

  /* regular-number */
  this.rules[6].opcodes = [];
  this.rules[6].opcodes[0] = { type: 2, children: [1,2,3,4,5,6] };// CAT
  this.rules[6].opcodes[1] = { type: 7, string: [40] };// TLS
  this.rules[6].opcodes[2] = { type: 4, index: 9 };// RNM(area)
  this.rules[6].opcodes[3] = { type: 7, string: [41] };// TLS
  this.rules[6].opcodes[4] = { type: 11, empty: false, index: 0 };// UDT(u_office)
  this.rules[6].opcodes[5] = { type: 7, string: [45] };// TLS
  this.rules[6].opcodes[6] = { type: 4, index: 10 };// RNM(subscriber)

  /* ornament-number */
  this.rules[7].opcodes = [];
  this.rules[7].opcodes[0] = { type: 2, children: [1,2,3,4,5,6] };// CAT
  this.rules[7].opcodes[1] = { type: 6, string: [10088] };// TBS
  this.rules[7].opcodes[2] = { type: 4, index: 9 };// RNM(area)
  this.rules[7].opcodes[3] = { type: 6, string: [10089] };// TBS
  this.rules[7].opcodes[4] = { type: 11, empty: false, index: 0 };// UDT(u_office)
  this.rules[7].opcodes[5] = { type: 6, string: [8210] };// TBS
  this.rules[7].opcodes[6] = { type: 4, index: 10 };// RNM(subscriber)

  /* heavy-number */
  this.rules[8].opcodes = [];
  this.rules[8].opcodes[0] = { type: 2, children: [1,2,3,4,5,6] };// CAT
  this.rules[8].opcodes[1] = { type: 6, string: [10090] };// TBS
  this.rules[8].opcodes[2] = { type: 4, index: 9 };// RNM(area)
  this.rules[8].opcodes[3] = { type: 6, string: [10091] };// TBS
  this.rules[8].opcodes[4] = { type: 11, empty: false, index: 0 };// UDT(u_office)
  this.rules[8].opcodes[5] = { type: 6, string: [9549] };// TBS
  this.rules[8].opcodes[6] = { type: 4, index: 10 };// RNM(subscriber)

  /* area */
  this.rules[9].opcodes = [];
  this.rules[9].opcodes[0] = { type: 2, children: [1,2,3] };// CAT
  this.rules[9].opcodes[1] = { type: 4, index: 11 };// RNM(gt-2)
  this.rules[9].opcodes[2] = { type: 4, index: 12 };// RNM(not-9)
  this.rules[9].opcodes[3] = { type: 4, index: 13 };// RNM(digit)

  /* subscriber */
  this.rules[10].opcodes = [];
  this.rules[10].opcodes[0] = { type: 3, min: 4, max: 4 };// REP
  this.rules[10].opcodes[1] = { type: 4, index: 13 };// RNM(digit)

  /* gt-2 */
  this.rules[11].opcodes = [];
  this.rules[11].opcodes[0] = { type: 5, min: 50, max: 57 };// TRG

  /* not-9 */
  this.rules[12].opcodes = [];
  this.rules[12].opcodes[0] = { type: 5, min: 48, max: 56 };// TRG

  /* digit */
  this.rules[13].opcodes = [];
  this.rules[13].opcodes[0] = { type: 5, min: 48, max: 57 };// TRG

  /* line-end */
  this.rules[14].opcodes = [];
  this.rules[14].opcodes[0] = { type: 6, string: [10] };// TBS

  // The `toString()` function will display the original grammar file(s) that produced these opcodes.
  this.toString = function toString(){
    let str = "";
    str += ";\n";
    str += "; Ref: Wikipedia, North American Numbering Plan\n";
    str += ";\n";
    str += "; specifications for demonstration purposes:\n";
    str += ";   1. MATCHED phrases\n";
    str += ";   2. EMPTY phrases\n";
    str += ";   3. NOMATCH phrases - backtracking\n";
    str += ";   4. operators, RNM, UDT, TLS, TBS, TRG\n";
    str += ";   5; non-ascii characters\n";
    str += ";\n";
    str += "phone-number = prefix phone-line\n";
    str += "prefix = *blank-line\n";
    str += "blank-line = *(%d32/%d9) [comment] line-end\n";
    str += "comment = \";\" *any\n";
    str += "any = %d32-126/%d9\n";
    str += "phone-line = (regular-number / ornament-number / heavy-number) line-end\n";
    str += "regular-number = \"(\" area \")\" u_office \"-\" subscriber\n";
    str += "ornament-number = %d10088 area %d10089 u_office %d8210 subscriber \n";
    str += "heavy-number = %d10090 area %d10091 u_office %d9549 subscriber \n";
    str += "\n";
    str += "area = gt-2 not-9 digit\n";
    str += "subscriber = 4digit\n";
    str += "\n";
    str += "gt-2 = %d50-57\n";
    str += "not-9 = %d48-56\n";
    str += "digit = %d48-57\n";
    str += "line-end = %d10\n";
    return str;
  }
}
