// copyright: Copyright (c) 2024 Lowell D. Thomas, all rights reserved<br>
//   license: BSD-2-Clause (https://opensource.org/licenses/BSD-2-Clause)<br>
//
// Generated by apg-js, Version 4.4.0 [apg-js](https://github.com/ldthomas/apg-js)
module.exports = function grammar(){
  // ```
  // SUMMARY
  //      rules = 9
  //       udts = 0
  //    opcodes = 35
  //        ---   ABNF original opcodes
  //        ALT = 3
  //        CAT = 5
  //        REP = 8
  //        RNM = 10
  //        TLS = 6
  //        TBS = 0
  //        TRG = 3
  //        ---   SABNF superset opcodes
  //        UDT = 0
  //        AND = 0
  //        NOT = 0
  //        BKA = 0
  //        BKN = 0
  //        BKR = 0
  //        ABG = 0
  //        AEN = 0
  // characters = [43 - 101]
  // ```
  /* OBJECT IDENTIFIER (for internal parser use) */
  this.grammarObject = 'grammarObject';

  /* RULES */
  this.rules = [];
  this.rules[0] = { name: 'float', lower: 'float', index: 0, isBkr: false };
  this.rules[1] = { name: 'sign', lower: 'sign', index: 1, isBkr: false };
  this.rules[2] = { name: 'decimal', lower: 'decimal', index: 2, isBkr: false };
  this.rules[3] = { name: 'integer', lower: 'integer', index: 3, isBkr: false };
  this.rules[4] = { name: 'dot', lower: 'dot', index: 4, isBkr: false };
  this.rules[5] = { name: 'fraction', lower: 'fraction', index: 5, isBkr: false };
  this.rules[6] = { name: 'exponent', lower: 'exponent', index: 6, isBkr: false };
  this.rules[7] = { name: 'esign', lower: 'esign', index: 7, isBkr: false };
  this.rules[8] = { name: 'exp', lower: 'exp', index: 8, isBkr: false };

  /* UDTS */
  this.udts = [];

  /* OPCODES */
  /* float */
  this.rules[0].opcodes = [];
  this.rules[0].opcodes[0] = { type: 2, children: [1,3,4] };// CAT
  this.rules[0].opcodes[1] = { type: 3, min: 0, max: 1 };// REP
  this.rules[0].opcodes[2] = { type: 4, index: 1 };// RNM(sign)
  this.rules[0].opcodes[3] = { type: 4, index: 2 };// RNM(decimal)
  this.rules[0].opcodes[4] = { type: 3, min: 0, max: 1 };// REP
  this.rules[0].opcodes[5] = { type: 4, index: 6 };// RNM(exponent)

  /* sign */
  this.rules[1].opcodes = [];
  this.rules[1].opcodes[0] = { type: 1, children: [1,2] };// ALT
  this.rules[1].opcodes[1] = { type: 7, string: [43] };// TLS
  this.rules[1].opcodes[2] = { type: 7, string: [45] };// TLS

  /* decimal */
  this.rules[2].opcodes = [];
  this.rules[2].opcodes[0] = { type: 1, children: [1,8] };// ALT
  this.rules[2].opcodes[1] = { type: 2, children: [2,3] };// CAT
  this.rules[2].opcodes[2] = { type: 4, index: 3 };// RNM(integer)
  this.rules[2].opcodes[3] = { type: 3, min: 0, max: 1 };// REP
  this.rules[2].opcodes[4] = { type: 2, children: [5,6] };// CAT
  this.rules[2].opcodes[5] = { type: 4, index: 4 };// RNM(dot)
  this.rules[2].opcodes[6] = { type: 3, min: 0, max: 1 };// REP
  this.rules[2].opcodes[7] = { type: 4, index: 5 };// RNM(fraction)
  this.rules[2].opcodes[8] = { type: 2, children: [9,10] };// CAT
  this.rules[2].opcodes[9] = { type: 4, index: 4 };// RNM(dot)
  this.rules[2].opcodes[10] = { type: 4, index: 5 };// RNM(fraction)

  /* integer */
  this.rules[3].opcodes = [];
  this.rules[3].opcodes[0] = { type: 3, min: 1, max: Infinity };// REP
  this.rules[3].opcodes[1] = { type: 5, min: 48, max: 57 };// TRG

  /* dot */
  this.rules[4].opcodes = [];
  this.rules[4].opcodes[0] = { type: 7, string: [46] };// TLS

  /* fraction */
  this.rules[5].opcodes = [];
  this.rules[5].opcodes[0] = { type: 3, min: 1, max: Infinity };// REP
  this.rules[5].opcodes[1] = { type: 5, min: 48, max: 57 };// TRG

  /* exponent */
  this.rules[6].opcodes = [];
  this.rules[6].opcodes[0] = { type: 2, children: [1,2,4] };// CAT
  this.rules[6].opcodes[1] = { type: 7, string: [101] };// TLS
  this.rules[6].opcodes[2] = { type: 3, min: 0, max: 1 };// REP
  this.rules[6].opcodes[3] = { type: 4, index: 7 };// RNM(esign)
  this.rules[6].opcodes[4] = { type: 4, index: 8 };// RNM(exp)

  /* esign */
  this.rules[7].opcodes = [];
  this.rules[7].opcodes[0] = { type: 1, children: [1,2] };// ALT
  this.rules[7].opcodes[1] = { type: 7, string: [43] };// TLS
  this.rules[7].opcodes[2] = { type: 7, string: [45] };// TLS

  /* exp */
  this.rules[8].opcodes = [];
  this.rules[8].opcodes[0] = { type: 3, min: 1, max: Infinity };// REP
  this.rules[8].opcodes[1] = { type: 5, min: 48, max: 57 };// TRG

  // The `toString()` function will display the original grammar file(s) that produced these opcodes.
  this.toString = function toString(){
    let str = "";
    str += "float    = [sign] decimal [exponent]\n";
    str += "sign     = \"+\" / \"-\"\n";
    str += "decimal  = integer [dot [fraction]]\n";
    str += "           / dot fraction\n";
    str += "integer  = 1*%d48-57\n";
    str += "dot      = \".\"\n";
    str += "fraction = 1*%d48-57 \n";
    str += "exponent = \"e\" [esign] exp\n";
    str += "esign    = \"+\" / \"-\"\n";
    str += "exp      = 1*%d48-57\n";
    return str;
  }
}
